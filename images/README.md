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

脚本会把下面映射表里的角色图标批量下载到 `images/`，已存在的文件自动跳过。

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
