// Audit screenshots + checklist. Serves dist/ on 5189 (same port as shot.mjs),
// then captures the English and Chinese hero plus key sections at desktop
// (1280px) and mobile (390px) widths, and runs the verification checklist:
//   1. no horizontal overflow at 390px;
//   2. no broken internal links;
//   3. no emoji in body copy (brand assets excepted);
//   4. no zombie buttons (<button> without an action — the build uses only
//      <a> controls, so this is asserted).
// Output goes to shots/ at the repo root.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const DIST = "dist";
const OUT = "shots";
const PORT = 5189;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

async function resolveFile(pathname) {
  const clean = pathname.split("?")[0];
  const rel = normalize(decodeURIComponent(clean)).replace(/^(\.\.[/\\])+/, "");
  for (const candidate of [rel, join(rel, "index.html"), `${rel}.html`]) {
    const file = join(DIST, candidate);
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {}
  }
  return null;
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  const file = await resolveFile(pathname);
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(await readFile(file));
});

await new Promise((resolve) => server.listen(PORT, resolve));
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const results = { checks: {}, shots: [] };

// ---------- checklist ----------
const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await desktop.goto(`http://localhost:${PORT}/`, { waitUntil: "load" });
await desktop.waitForTimeout(2500);

// 2. broken internal links
const hrefs = await desktop.evaluate(() =>
  [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"))
);
const internal = [...new Set(hrefs.filter((h) => h && h.startsWith("/")))];
const broken = [];
for (const h of internal) {
  const pagePath = h.split("#")[0] || "/";
  const res = await fetch(`http://localhost:${PORT}${pagePath}`);
  if (res.status >= 400) broken.push(`${h} -> ${res.status}`);
}
results.checks.brokenLinks = broken.length === 0 ? "PASS" : `FAIL: ${broken.join(", ")}`;

// 3. emoji scan across both locales
const emojiRe = /\p{Extended_Pictographic}/u;
const emojiHits = [];
for (const url of [`http://localhost:${PORT}/`, `http://localhost:${PORT}/zh/`]) {
  const p = await browser.newPage();
  await p.goto(url, { waitUntil: "load" });
  await p.waitForTimeout(1500);
  const hit = await p.evaluate(
    (re) => {
      const re2 = new RegExp(re, "u");
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = w.nextNode())) {
        // ©/® are standard typography, not emoji (the footer copyright line)
        const text = n.nodeValue.replace(/[©®℠]/g, "");
        if (re2.test(text)) return n.nodeValue.trim().slice(0, 60);
      }
      return null;
    },
    emojiRe.source
  );
  if (hit) emojiHits.push(`${url}: ${hit}`);
  await p.close();
}
results.checks.noEmoji = emojiHits.length === 0 ? "PASS" : `FAIL: ${emojiHits.join(" | ")}`;

// 4. zombie buttons
const buttons = await desktop.evaluate(
  () => document.querySelectorAll("button").length
);
results.checks.noZombieButtons = buttons === 0
  ? "PASS (no <button> elements; all controls are real links)"
  : `FAIL: ${buttons} <button> elements found`;

// ---------- 1. horizontal overflow at 390px ----------
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
const overflows = [];
for (const [name, url] of [["en", "/"], ["zh", "/zh/"]]) {
  await mobile.goto(`http://localhost:${PORT}${url}`, { waitUntil: "load" });
  await mobile.waitForTimeout(2500);
  const wide = await mobile.evaluate(() => {
    // body { overflow-x: hidden } masks scrollWidth, so scan every element's
    // right edge. Elements overflowing only inside an ancestor that
    // self-scrolls or self-clips (e.g. the HUD strip, overflow-x:auto) are
    // contained and must not be reported as page overflow.
    const contained = (el) => {
      let n = el.parentElement;
      while (n && n !== document.body) {
        const ox = getComputedStyle(n).overflowX;
        if (ox === "auto" || ox === "scroll" || ox === "hidden") return true;
        n = n.parentElement;
      }
      return false;
    };
    const bad = [...document.querySelectorAll("*")]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1 && !contained(el))
      .map((el) => `${el.tagName}.${(el.getAttribute("class") || "").split(" ")[0]} right=${Math.round(el.getBoundingClientRect().right)}`);
    return { scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth, bad: bad.slice(0, 6), count: bad.length };
  });
  if (wide.count > 0) overflows.push(`${name}: innerW=${wide.innerW} scrollW=${wide.scrollW} (${wide.count} elements) ${wide.bad.join("; ")}`);
}
results.checks.noMobileOverflow = overflows.length === 0 ? "PASS" : `FAIL: ${overflows.join(" | ")}`;

// ---------- screenshots ----------
async function shoot(page, name, url, selector) {
  await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: "load" });
  await page.waitForTimeout(2500);
  if (selector) {
    await page.evaluate((s) => document.querySelector(s)?.scrollIntoView(), selector);
    await page.waitForTimeout(900);
  }
  const file = join(OUT, name);
  await page.screenshot({ path: file, fullPage: false, animations: "disabled", caret: "hide" });
  results.shots.push(file);
  console.log(`[audit] ${file}`);
}

await shoot(desktop, "en-hero-desktop.png", "/");
await shoot(desktop, "en-capabilities-desktop.png", "/", "#capabilities");
await shoot(desktop, "en-principles-desktop.png", "/", "#principles");
await shoot(desktop, "en-status-desktop.png", "/", "#status");
await shoot(desktop, "zh-hero-desktop.png", "/zh/");
await shoot(desktop, "zh-status-desktop.png", "/zh/", "#status");
await shoot(mobile, "en-hero-mobile-390.png", "/");
await shoot(mobile, "zh-hero-mobile-390.png", "/zh/");

await browser.close();
server.close();

console.log("\n[checklist]");
for (const [k, v] of Object.entries(results.checks)) console.log(`  ${k}: ${v}`);
const failed = Object.values(results.checks).filter((v) => v.startsWith("FAIL"));
process.exitCode = failed.length ? 1 : 0;
