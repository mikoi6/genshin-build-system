#!/usr/bin/env node
/**
 * 生成 images/download-images.sh
 * 映射来源：data.js 中每个角色的 icon 字段（来自 genshin-db 官方图标文件名）
 * 这样新增角色时只要 data.js 里有 icon，就不会漏掉图片
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
global.window = {};
eval(fs.readFileSync(path.join(root, 'data.js'), 'utf8'));
const D = window.GENSHIN_DATA;

const chars = D.CHARACTERS.filter(c => c.icon);
if (chars.length !== D.CHARACTERS.length) {
  console.warn(`警告：${D.CHARACTERS.length - chars.length} 个角色缺少 icon 字段`);
}

// 按元素 → 星级 → 名字 排序，便于阅读
const order = ['火', '水', '风', '雷', '冰', '岩', '草', '无'];
chars.sort((a, b) => {
  const ea = order.indexOf(a.element), eb = order.indexOf(b.element);
  if (ea !== eb) return ea - eb;
  if (a.rarity !== b.rarity) return b.rarity - a.rarity;
  return a.name.localeCompare(b.name, 'zh');
});

const mapLines = chars
  .map(c => `  ${c.id}:${c.icon.replace(/^UI_AvatarIcon_/, '')}   # ${c.name}`)
  .join('\n');

const script = `#!/usr/bin/env bash
# ============================================================
# 批量下载角色头像（共 ${chars.length} 个角色）
# 用法：在项目根目录执行
#   bash images/download-images.sh
#
# 特性：
#   - 并发下载（默认 6 路），比逐个下载快得多
#   - 自动重试（网络波动不会整批失败）
#   - 校验下载内容确实是 PNG（防止把错误页当成图片存下来）
#   - 已存在的文件自动跳过，可重复执行
#   - 最后汇总失败列表
#
# 图片版权归米哈游所有。.gitignore 默认排除 images/*.png。
# ============================================================
set -u
cd "$(dirname "$0")" || exit 1

BASE="https://enka.network/ui/UI_AvatarIcon_"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"

# 并发数：网络不好时调小（如 3），带宽充足时调大
JOBS="\${JOBS:-6}"

# 格式：本地文件名(角色id):Enka图标名（后者去掉 UI_AvatarIcon_ 前缀）
MAP=$(cat <<'MAPEOF'
${mapLines}
MAPEOF
)

# 判断文件是否为有效 PNG（前 8 字节魔数）
is_png() {
  [ -f "$1" ] && [ "$(head -c 8 "$1" | od -An -tx1 | tr -d ' \\n')" = "89504e470d0a1a0a" ]
}

# 处理单个角色（供并发调用）
fetch_one() {
  local id="$1" icon="$2"
  local out="$id.png"

  if is_png "$out"; then
    echo "SKIP $id"
    return
  fi

  local attempt size
  for attempt in 1 2 3; do
    if curl -sL -f --connect-timeout 10 --max-time 90 \\
        --retry 2 --retry-delay 1 \\
        -H "User-Agent: $UA" \\
        -o "$out" "\${BASE}\${icon}.png" 2>/dev/null && is_png "$out"; then
      size=$(wc -c < "$out" | tr -d ' ')
      echo "OK $id $size"
      return
    fi
    [ "$attempt" -lt 3 ] && sleep 2
  done

  rm -f "$out"
  echo "FAIL $id $icon"
}

export -f fetch_one is_png
export BASE UA

echo "开始下载角色头像（共 ${chars.length} 个，并发 $JOBS）…"
echo ""

# 生成任务列表（去掉注释与首尾空白，每行形如 id:IconName）
TASKS=$(printf '%s\\n' "$MAP" | sed 's/#.*//' | sed 's/^[[:space:]]*//; s/[[:space:]]*$//' | grep -v '^$')

RESULT_FILE=".dl-result.$$"
: > "$RESULT_FILE"
trap 'rm -f "$RESULT_FILE"' EXIT

# 分批并发：每批最多 JOBS 个后台任务，一批结束再开下一批
# （不用 xargs 是为了避免不同 xargs 实现对 -L/-P 行为不一致）
BATCH=""; CNT=0
flush_batch() {
  local item
  for item in $BATCH; do
    fetch_one "\${item%%:*}" "\${item#*:}" >> "$RESULT_FILE" 2>&1 &
  done
  wait
  BATCH=""; CNT=0
}

while IFS= read -r line; do
  [ -z "$line" ] && continue
  BATCH="$BATCH $line"
  CNT=$((CNT+1))
  [ "$CNT" -ge "$JOBS" ] && flush_batch
done <<< "$TASKS"
[ "$CNT" -gt 0 ] && flush_batch

OK=0; SKIP=0; FAIL=0
FAILED_LIST=""
while read -r status id extra; do
  case "$status" in
    OK)   OK=$((OK+1));   echo "  ✓  $id.png (\${extra} bytes)" ;;
    SKIP) SKIP=$((SKIP+1)) ;;
    FAIL) FAIL=$((FAIL+1)); FAILED_LIST="$FAILED_LIST $id"; echo "  ✗  $id.png 下载失败" ;;
  esac
done < "$RESULT_FILE"
rm -f "$RESULT_FILE"

echo ""
echo "————————————————————————————"
echo "成功 $OK 张 / 已存在跳过 $SKIP 张 / 失败 $FAIL 张"

TOTAL=$(ls [a-z]*.png 2>/dev/null | wc -l | tr -d ' ')
echo "当前 images/ 下共有 $TOTAL 张头像"

if [ "$FAIL" -gt 0 ]; then
  echo ""
  echo "以下角色下载失败，可稍后重新执行本脚本（会自动只补缺失的）："
  for f in $FAILED_LIST; do echo "    - $f"; done
  echo ""
  echo "排查建议："
  echo "  1. 浏览器直接打开 https://enka.network/ui/UI_AvatarIcon_Hutao.png 看能否访问"
  echo "  2. 若开了代理/VPN，试试开关一次"
  echo "  3. 降低并发：JOBS=3 bash images/download-images.sh"
  exit 1
fi

echo "全部完成。刷新浏览器即可看到角色头像。"
`;

fs.writeFileSync(path.join(root, 'images', 'download-images.sh'), script, { mode: 0o755 });
console.log(`已生成 images/download-images.sh，含 ${chars.length} 个角色`);
