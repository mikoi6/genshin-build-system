#!/usr/bin/env node
/**
 * 长图分片裁切工具（读攻略长图用）
 *
 * 用无头 Chrome 把一张超长图切成若干片，方便逐片看清文字。
 * 原理：把整图塞进一个固定尺寸的 div，用负 top 把目标段推到视口里，
 *     再按视口尺寸截图 —— 等于免费获得一个「浏览器裁图器」，不依赖 PIL / ImageMagick。
 *
 * 用法：
 *   node slice-long-image.js <图片路径>                    # 全图按 900px 切片，输出到 ./slices/
 *   node slice-long-image.js <图片路径> 1800              # 只切 Y=1800 起的一片
 *   node slice-long-image.js <图片路径> 1800 900          # 指定起始 Y 与片高
 *   node slice-long-image.js <图片路径> 1800 900 out.png  # 指定输出文件名
 *   node slice-long-image.js <图片路径> 0 900 out.png 1.5 # 第 6 参数为缩放（>1 更清晰，也更占内存）
 *
 * 注意：
 * - 输出路径必须给绝对路径，否则 headless Chrome 可能写不出文件（Windows）。
 * - 片高建议 900，再大 ViewImage 会二次缩放导致小字变糊。
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];
const CHROME = CHROME_CANDIDATES.find(p => fs.existsSync(p));
if (!CHROME) {
  console.error('找不到 Chrome / Edge，无法裁图');
  process.exit(1);
}

function readSize(buf) {
  if (buf.slice(1, 4).toString() === 'PNG') {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  // JPEG：扫 SOF 段
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const m = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return { w: 0, h: 0 };
}

function sliceOnce(img, startY, sliceH, outPath, scale) {
  const { w, h } = readSize(fs.readFileSync(img));
  const vw = Math.round(w * scale);
  const vh = Math.round(Math.min(sliceH, h - startY) * scale);

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;padding:0;background:#fff;overflow:hidden}
  #v{position:relative;width:${vw}px;height:${vh}px;overflow:hidden}
  img{position:absolute;left:0;top:${-Math.round(startY * scale)}px;width:${vw}px;display:block}
</style></head><body><div id="v"><img src="file:///${img.replace(/\\/g, '/')}"></div></body></html>`;

  const tmpHtml = outPath.replace(/\.png$/i, '') + '._s.html';
  fs.writeFileSync(tmpHtml, html, 'utf8');
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--allow-file-access-from-files',
    '--hide-scrollbars', '--force-device-scale-factor=1',
    '--virtual-time-budget=4000',
    `--window-size=${vw},${vh}`,
    `--screenshot=${outPath}`,
    tmpHtml,
  ], { stdio: 'ignore' });
  fs.unlinkSync(tmpHtml);
  return { w, h, vw, vh };
}

const img = path.resolve(process.argv[2] || '');
if (!img || !fs.existsSync(img)) {
  console.error('用法: node slice-long-image.js <图片路径> [起始Y] [片高] [输出文件名] [缩放]');
  process.exit(1);
}

const startArg = process.argv[3];
const sliceH = parseInt(process.argv[4] || '900', 10);
const outArg = process.argv[5];
const scale = parseFloat(process.argv[6] || '1');
const dir = path.dirname(img);
const base = path.basename(img).replace(/\.[^.]+$/, '');

if (startArg === undefined) {
  // 全图切片
  const { h } = readSize(fs.readFileSync(img));
  const outDir = path.join(dir, 'slices');
  fs.mkdirSync(outDir, { recursive: true });
  const total = Math.ceil(h / sliceH);
  for (let i = 0; i < total; i++) {
    const y = i * sliceH;
    const out = path.join(outDir, `${base}_${String(i).padStart(2, '0')}_y${y}.png`);
    const r = sliceOnce(img, y, sliceH, out, scale);
    console.log(`${out}  (${r.vw}x${r.vh})`);
  }
  console.log(`\n共 ${total} 片，目录：${outDir}`);
} else {
  const y = parseInt(startArg, 10);
  const out = outArg
    ? path.resolve(outArg)
    : path.join(dir, `${base}_y${y}.png`);
  const r = sliceOnce(img, y, sliceH, out, scale);
  console.log(`图 ${r.w}x${r.h} → 片 Y=${y}..${Math.min(y + sliceH, r.h)} 输出 ${out}`);
  console.log(`整图共需 ${Math.ceil(r.h / sliceH)} 片`);
}
