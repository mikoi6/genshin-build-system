# 角色头像图片目录

把角色头像图片放在这个文件夹里，角色库和详情页就会自动显示图片。
**找不到图片的角色会自动回退成元素图标，不会报错。**

## 命名规范

文件名 = `data.js` 里该角色的 `id` + `.png`

```
images/
├── hutao.png        → 胡桃
├── xingqiu.png      → 行秋
├── raiden.png       → 雷电将军
└── ...
```

## 图片规格建议

| 项 | 建议 |
|----|------|
| 格式 | PNG（透明背景最好看）或 JPG |
| 尺寸 | 256×256 或 512×512 |
| 比例 | 正方形，半身像效果最佳（代码里用了 `object-position: top`，会从顶部开始裁切） |
| 体积 | 单张控制在 100KB 以内，避免加载卡顿 |

---

## 一键下载（推荐）

已经配好了脚本，在**项目根目录**执行：

```bash
bash images/download-images.sh
```

脚本会把 **全部 126 个角色**的图标并发下载到 `images/`，已存在的文件自动跳过。

```bash
JOBS=3 bash images/download-images.sh   # 网络不好时降低并发
```

实测 126 张全部成功约需 1 分 13 秒，合计约 9.3MB；重复执行会全部跳过。

### 映射表从哪来

脚本里的 `角色id:图标名` 映射**由 `data.js` 的 `icon` 字段自动生成**，不是手写的。以后新增角色，只要 `data.js` 里填了 `icon`（官方图标文件名），重新生成脚本即可覆盖到：

```bash
node images/build-download-script.js   # 重新生成 download-images.sh
```

> 历史坑：雷电将军的图标名是 `Shougun` 而不是 `Raiden`，艾尔海森是 `Alhatham`（少一个 a）。这些人肉容易写错的地方，现在由数据集直接提供，不会再错。

## 图片来源

按推荐程度排序：

1. **Enka Network 的 UI 资源 CDN**（脚本用的就是它）
   `https://enka.network/ui/UI_AvatarIcon_{英文名}.png`
   优点：命名规范、可直接 curl 批量下、图片规格统一。缺点：非官方镜像。

2. **ambr.top**（原神数据库）
   https://ambr.top/chs/archive/avatar
   优点：分类清晰、有立绘和头像两种。缺点：需要手动逐张保存。

3. **Genshin Impact Wiki (Fandom)**
   https://genshin-impact.fandom.com/wiki/Character
   每个角色页有完整图标集（头像/立绘/命座图标）。

4. **Paimon.moe**
   https://paimon.moe/characters
   优点：UI 干净，图片尺寸统一。

5. **Honey Impact**
   https://genshin.honeyhunterworld.com/
   数据最全，但页面较杂、广告多。

6. **官方渠道**
   米游社 / HoYoLAB 的角色图鉴、官方发布的立绘素材。
   最正规，但需要自己裁切。

---

## 映射表（本地文件名 ← Enka 图标名）

注意几个**特殊命名**，不是简单拼音：

| 角色 | 本地文件名 | Enka 图标名 | 备注 |
|------|-----------|------------|------|
| 胡桃 | `hutao.png` | Hutao | |
| 香菱 | `xiangling.png` | Xiangling | |
| 班尼特 | `bennett.png` | Bennett | |
| 迪卢克 | `diluc.png` | Diluc | |
| 宵宫 | `yoimiya.png` | Yoimiya | |
| 行秋 | `xingqiu.png` | Xingqiu | |
| 夜兰 | `yelan.png` | Yelan | |
| 珊瑚宫心海 | `kokomi.png` | Kokomi | |
| 枫原万叶 | `kazuha.png` | Kazuha | |
| 温迪 | `venti.png` | Venti | |
| 砂糖 | `sucrose.png` | Sucrose | |
| 雷电将军 | `raiden.png` | **Shougun** | ⚠️ 内部代号「将軍」 |
| 菲谢尔 | `fischl.png` | Fischl | |
| 刻晴 | `keqing.png` | Keqing | |
| 神里绫华 | `ayaka.png` | Ayaka | |
| 甘雨 | `ganyu.png` | Ganyu | |
| 申鹤 | `shenhe.png` | Shenhe | |
| 钟离 | `zhongli.png` | Zhongli | |
| 阿贝多 | `albedo.png` | Albedo | |
| 荒泷一斗 | `itto.png` | Itto | |
| 纳西妲 | `nahida.png` | Nahida | |
| 艾尔海森 | `alhaitham.png` | **Alhatham** | ⚠️ 拼写少一个 a |

以后新增角色时，也照这个规则加一行到 `download-images.sh` 的 `MAP` 变量里即可。

---

## 手动下载单张

浏览器直接打开下面地址就会开始下载（把 `Hutao` 换成对应英文名）：

```
https://enka.network/ui/UI_AvatarIcon_Hutao.png
```

下载后**重命名**成 `hutao.png` 放进 `images/` 目录即可。

---

## ⚠️ 版权说明

角色图片版权归**米哈游**所有。

- **自己本地用**：没问题
- **传到公开 GitHub 仓库**：存在侵权风险，建议不要把图片提交到仓库
  （`.gitignore` 里已经默认忽略 `images/*.png`，只保留说明文件）

如果你要用 GitHub Pages 在线展示图片，需要把图片一起提交上去，这个风险请自行权衡。

---

# 圣遗物图标目录 `images/artifacts/`

「我的背包」用图标网格陈列圣遗物，图标放在 `images/artifacts/` 下（子目录）。
**本地缺图会自动回落到 Enka 的图标 CDN，再失败则显示部位 emoji，不会出现裂图。**

## 命名规范

```
images/artifacts/{套装ID}_{部位序号}.png
```

| 部位序号 | 部位 |
|---|---|
| 1 | 空之杯 |
| 2 | 死之羽 |
| 3 | 理之冠 |
| 4 | 生之花 |
| 5 | 时之沙 |

> ⚠️ 官方资源里这个序号的顺序**不是**部位的自然顺序（既不是 花羽沙杯冠，也不是 花羽沙冠杯）。
> 上面这张表是用 `10001`（角斗士的终幕礼）五张图逐张目视核对出来的，改名前务必重新核对，
> 写错就会表现为「生之花配上了空之杯的图」这类错位。

套装 ID 就是 `data.js` 里 `ARTIFACT_SETS` 的 `id` 字段，例如：

```
images/artifacts/15001_4.png   → 角斗士的终幕礼 · 生之花
images/artifacts/15009_3.png   → 祭火之人 · 理之冠（单件套）
```

## 一键下载

```bash
bash images/download-artifact-icons.sh
JOBS=4 bash images/download-artifact-icons.sh   # 网络不好时降并发
```

63 个套装 × 5 个部位 = 315 个任务，实际只有 **299 张**有图标：
「祭火之人 / 祭水之人 / 祭雷之人 / 祭冰之人」是只有**理之冠**的单件套，
其余四个部位在官方资源里本来就不存在，脚本会记为跳过，属正常现象。

脚本同样由 `data.js` 生成映射，套装修正后重新生成即可：

```bash
node images/build-download-script.js
```

来源同为 `https://enka.network/ui/UI_RelicIcon_{套装ID}_{部位序号}.png`。
版权归米哈游所有，`.gitignore` 已忽略 `images/artifacts/*.png`。

---

# 读攻略长图：`images/slice-long-image.js`

米游社的「一图流」帖正文往往只有几百字目录，真正的配装与配队全在
一张 1772×6318 的竖长图里。整张丢给多模态模型读，小字必然糊掉、
形近字必然认错（曾把「烈阳之嗣」读成「烈阳之翎」、「乌髓孑灯」读成「乌鹞子灯」）。

这个脚本把长图按 900px 切片输出，逐片读就没有清晰度问题：

```bash
# 全图切片，输出到 <图片目录>/slices/
node images/slice-long-image.js long.png

# 只切某一段（起始 Y、片高），用于重读看不清的局部
node images/slice-long-image.js long.png 2700 900

# 放大 1.5 倍再切，适合字特别小的图
node images/slice-long-image.js long.png 2700 900 out.png 1.5
```

原理：把整图塞进一个固定尺寸的 `div`，用负 `top` 把目标段顶进视口，
再让 headless Chrome 按视口尺寸截图——等于用浏览器当裁图器，
不依赖 PIL / ImageMagick（这两者在本机都装不上）。

## 青枫（HoYo青枫）一图流的固定版式

同一作者的「一图流」都是 **1772×6318** 的同款模板，分段位置固定：

| 起始 Y | 内容 |
|---|---|
| 0 | 角色信息、突破素材 |
| ~900 | 天赋加点优先级、天赋耗材 |
| ~1800 | 武器推荐（5 把，含星级/白值/TAG） |
| ~2700 | 圣遗物套装、主词条、副词条、毕业面板 |
| ~3600 | 关键命座 |
| ~4300～5400 | 配队推荐（3 套，**只有头像和定位，没有角色名**） |

**⚠️ 最后一段是读图的硬伤**：配队只画头像 + 「风伤输出 / 后台协同」这类定位，
不写角色名。靠认立绘填名字风险极高，配队请另找正文把人员写全的帖子，
或用 `data.js` 的角色名做存在性校验后再落库。

长图能可靠提供的是**文字类信息**：武器名、套装名、主副词条、天赋加点、命座描述。
这些不涉及「认人」，读图准确率高，正好补文字帖缺的部分。
