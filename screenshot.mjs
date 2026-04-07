import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('file://' + path.join(__dirname, 'book_sip_detail.html'), { waitUntil: 'networkidle2', timeout: 30000 });

const sections = [
  { selector: '#hero',       file: '0.png' },
  { selector: '#philosophy', file: '1.png' },
  { selector: '#target',     file: '2.png' },
  { selector: '#overview',   file: '3.png' },
  { selector: '#timeline',   file: '4.png' },
  { selector: '#drinks',     file: '5.png' },
  { selector: '#faq',        file: '6.png' },
  { selector: '#closing',    file: '7.png' },
];

for (const { selector, file } of sections) {
  const el = await page.$(selector);
  if (!el) { console.log(`${selector} 없음`); continue; }
  await el.screenshot({ path: path.join(__dirname, 'image', file) });
  console.log(`저장: image/${file}`);
}

await browser.close();
