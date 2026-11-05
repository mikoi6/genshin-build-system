#!/usr/bin/env bash
# ============================================================
# 批量下载角色头像（共 126 个角色）
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
JOBS="${JOBS:-6}"

# 格式：本地文件名(角色id):Enka图标名（后者去掉 UI_AvatarIcon_ 前缀）
MAP=$(cat <<'MAPEOF'
  arlecchino:Arlecchino   # 阿蕾奇诺
  diluc:Diluc   # 迪卢克
  dehya:Dehya   # 迪希雅
  durin:Durin   # 杜林
  hutao:Hutao   # 胡桃
  klee:Klee   # 可莉
  lyney:Liney   # 林尼
  mavuika:Mavuika   # 玛薇卡
  nicole:Nicole   # 尼可
  yoimiya:Yoimiya   # 宵宫
  amber:Ambor   # 安柏
  bennett:Bennett   # 班尼特
  gaming:Gaming   # 嘉明
  thoma:Tohma   # 托马
  chevreuse:Chevreuse   # 夏沃蕾
  xiangling:Xiangling   # 香菱
  xinyan:Xinyan   # 辛焱
  yanfei:Feiyan   # 烟绯
  tartaglia:Tartaglia   # 达达利亚
  furina:Furina   # 芙宁娜
  columbina:Columbina   # 哥伦比娅
  mualani:Mualani   # 玛拉妮
  mona:Mona   # 莫娜
  neuvillette:Neuvillette   # 那维莱特
  nilou:Nilou   # 妮露
  kokomi:Kokomi   # 珊瑚宫心海
  kamisatoayato:Ayato   # 神里绫人
  vodyanitsa:Vodyanitsa   # 沃雅妮莎
  sigewinne:Sigewinne   # 希格雯
  yelan:Yelan   # 夜兰
  aino:Aino   # 爱诺
  barbara:Barbara   # 芭芭拉
  candace:Candace   # 坎蒂丝
  dahlia:Dahlia   # 塔利雅
  xingqiu:Xingqiu   # 行秋
  varka:Varka   # 法尔伽
  kazuha:Kazuha   # 枫原万叶
  wanderer:Wanderer   # 流浪者
  yumemizukimizuki:Mizuki   # 梦见月瑞希
  chasca:Chasca   # 恰斯卡
  jean:Qin   # 琴
  vesna:Vesna   # 薇斯纳
  venti:Venti   # 温迪
  xianyun:Liuyun   # 闲云
  xiao:Xiao   # 魈
  prune:Prune   # 布伦妮
  faruzan:Faruzan   # 珐露珊
  lanyan:Lanyan   # 蓝砚
  lynette:Linette   # 琳妮特
  shikanoinheizou:Heizo   # 鹿野院平藏
  sucrose:Sucrose   # 砂糖
  jahoda:Jahoda   # 雅珂达
  ifa:Ifa   # 伊法
  sayu:Sayu   # 早柚
  yaemiko:Yae   # 八重神子
  flins:Flins   # 菲林斯
  clorinde:Clorinde   # 克洛琳德
  keqing:Keqing   # 刻晴
  raiden:Shougun   # 雷电将军
  mitya:Mitya   # 米提亚
  cyno:Cyno   # 赛诺
  varesa:Varesa   # 瓦雷莎
  ineffa:Ineffa   # 伊涅芙
  alyosha:Alyosha   # 阿罗夏
  beidou:Beidou   # 北斗
  dori:Dori   # 多莉
  fischl:Fischl   # 菲谢尔
  kujousara:Sara   # 九条裟罗
  kukishinobu:Shinobu   # 久岐忍
  razor:Razor   # 雷泽
  lisa:Lisa   # 丽莎
  ororon:Olorun   # 欧洛伦
  sethos:Sethos   # 赛索斯
  valeriy:Valeriy   # 瓦列里
  iansan:Iansan   # 伊安珊
  aloy:Aloy   # 埃洛伊
  escoffier:Escoffier   # 爱可菲
  odette:Odette   # 奥黛塔
  ganyu:Ganyu   # 甘雨
  wriothesley:Wriothesley   # 莱欧斯利
  lohen:Lohen   # 洛恩
  qiqi:Qiqi   # 七七
  citlali:Citlali   # 茜特菈莉
  sandrone:MarionetteNew   # 桑多涅
  shenhe:Shenhe   # 申鹤
  ayaka:Ayaka   # 神里绫华
  skirk:SkirkNew   # 丝柯克
  eula:Eula   # 优菈
  diona:Diona   # 迪奥娜
  freminet:Freminet   # 菲米尼
  kaeya:Kaeya   # 凯亚
  layla:Layla   # 莱依拉
  rosaria:Rosaria   # 罗莎莉亚
  mika:Mika   # 米卡
  charlotte:Charlotte   # 夏洛蒂
  chongyun:Chongyun   # 重云
  albedo:Albedo   # 阿贝多
  itto:Itto   # 荒泷一斗
  linnea:Linnea   # 莉奈娅
  navia:Navia   # 娜维娅
  chiori:Chiori   # 千织
  xilonen:Xilonen   # 希诺宁
  zhongli:Zhongli   # 钟离
  zibai:Zibai   # 兹白
  kachina:Kachina   # 卡齐娜
  ningguang:Ningguang   # 凝光
  noelle:Noel   # 诺艾尔
  gorou:Gorou   # 五郎
  illuga:Illuga   # 叶洛亚
  yunjin:Yunjin   # 云堇
  alhaitham:Alhatham   # 艾尔海森
  emilie:Emilie   # 艾梅莉埃
  baizhu:Baizhuer   # 白术
  kinich:Kinich   # 基尼奇
  lauma:Lauma   # 菈乌玛
  nahida:Nahida   # 纳西妲
  nefer:Nefer   # 奈芙尔
  tighnari:Tighnari   # 提纳里
  kaveh:Kaveh   # 卡维
  collei:Collei   # 柯莱
  kirara:Momoka   # 绮良良
  yaoyao:Yaoyao   # 瑶瑶
  aether:PlayerBoy   # 空
  manekin:MannequinBoy   # 奇偶·男性
  manekina:MannequinGirl   # 奇偶·女性
  lumine:PlayerGirl   # 荧
MAPEOF
)

# 判断文件是否为有效 PNG（前 8 字节魔数）
is_png() {
  [ -f "$1" ] && [ "$(head -c 8 "$1" | od -An -tx1 | tr -d ' \n')" = "89504e470d0a1a0a" ]
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
    if curl -sL -f --connect-timeout 10 --max-time 90 \
        --retry 2 --retry-delay 1 \
        -H "User-Agent: $UA" \
        -o "$out" "${BASE}${icon}.png" 2>/dev/null && is_png "$out"; then
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

echo "开始下载角色头像（共 126 个，并发 $JOBS）…"
echo ""

# 生成任务列表（去掉注释与首尾空白，每行形如 id:IconName）
TASKS=$(printf '%s\n' "$MAP" | sed 's/#.*//' | sed 's/^[[:space:]]*//; s/[[:space:]]*$//' | grep -v '^$')

RESULT_FILE=".dl-result.$$"
: > "$RESULT_FILE"
trap 'rm -f "$RESULT_FILE"' EXIT

# 分批并发：每批最多 JOBS 个后台任务，一批结束再开下一批
# （不用 xargs 是为了避免不同 xargs 实现对 -L/-P 行为不一致）
BATCH=""; CNT=0
flush_batch() {
  local item
  for item in $BATCH; do
    fetch_one "${item%%:*}" "${item#*:}" >> "$RESULT_FILE" 2>&1 &
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
    OK)   OK=$((OK+1));   echo "  ✓  $id.png (${extra} bytes)" ;;
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
