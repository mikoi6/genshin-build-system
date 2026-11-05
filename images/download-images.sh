#!/usr/bin/env bash
# ============================================================
# 批量下载角色头像
# 用法：在项目根目录执行
#   bash images/download-images.sh
#
# 特性：
#   - 自动重试（网络波动不会整批失败）
#   - 校验下载内容确实是 PNG（防止把错误页当成图片存下来）
#   - 已存在的文件自动跳过，可重复执行
#   - 最后汇总失败列表
# ============================================================
set -u
cd "$(dirname "$0")" || exit 1

BASE="https://enka.network/ui/UI_AvatarIcon_"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"

# 统计
OK=0; SKIP=0; FAIL=0
FAILED_LIST=""

# 格式：本地文件名(角色id):Enka图标名
MAP="
hutao:Hutao
xiangling:Xiangling
bennett:Bennett
diluc:Diluc
yoimiya:Yoimiya
xingqiu:Xingqiu
yelan:Yelan
kokomi:Kokomi
kazuha:Kazuha
venti:Venti
sucrose:Sucrose
raiden:Shougun
fischl:Fischl
keqing:Keqing
ayaka:Ayaka
ganyu:Ganyu
shenhe:Shenhe
zhongli:Zhongli
albedo:Albedo
itto:Itto
nahida:Nahida
alhaitham:Alhatham
"

echo "开始下载角色头像…"
echo ""

# 判断文件是否为有效 PNG（前 8 字节魔数）
is_png() {
  [ -f "$1" ] && [ "$(head -c 8 "$1" | od -An -tx1 | tr -d ' \n')" = "89504e470d0a1a0a" ]
}

# 用 while + 重定向（不是管道）读取，这样统计变量不会被丢到子 shell 里
while IFS=: read -r id icon; do
  [ -z "${id:-}" ] && continue

  if is_png "$id.png"; then
    SKIP=$((SKIP+1))
    echo "  ·  $id.png 已存在，跳过"
    continue
  fi

  success=0
  for attempt in 1 2 3; do
    if curl -sL -f \
        --connect-timeout 10 --max-time 60 \
        --retry 2 --retry-delay 1 \
        -H "User-Agent: $UA" \
        -o "$id.png" "${BASE}${icon}.png" 2>/dev/null; then
      if is_png "$id.png"; then
        success=1
        break
      fi
    fi
    [ "$attempt" -lt 3 ] && { echo "  …  $id 第 $attempt 次失败，重试中"; sleep 2; }
  done

  if [ "$success" = "1" ]; then
    size=$(wc -c < "$id.png" | tr -d ' ')
    OK=$((OK+1))
    echo "  ✓  $id.png (${size} bytes)"
  else
    rm -f "$id.png"
    FAIL=$((FAIL+1))
    FAILED_LIST="$FAILED_LIST $id"
    echo "  ✗  $id.png 下载失败（图标名 ${icon}）"
  fi

  sleep 0.2
done <<< "$MAP"

echo ""
echo "————————————————————————————"
echo "成功 $OK 张 / 跳过 $SKIP 张 / 失败 $FAIL 张"

if [ "$FAIL" -gt 0 ]; then
  echo ""
  echo "以下角色下载失败，可稍后重新执行本脚本（会自动只补缺失的）："
  for f in $FAILED_LIST; do echo "    - $f"; done
  echo ""
  echo "排查建议："
  echo "  1. 浏览器直接打开 https://enka.network/ui/UI_AvatarIcon_Hutao.png 看能否访问"
  echo "  2. 若开了代理/VPN，试试开关一次"
  echo "  3. 网络不稳时多跑几次即可，脚本会跳过已成功的"
  exit 1
fi

echo "全部完成。刷新浏览器即可看到角色立绘。"
