# ops-console — Landing

Tier 0 产品族内部运营控制台（ops-console）的公开门面页：一个纯静态、中英双语的
Astro 站点。它只介绍这个登录后工作台——人在决策回路里签核 Agent 持住的事项——
不包含工作台本身、没有登录鉴权、没有任何动态功能。

- 线上（规划，占位）：https://ops-console.bayjf.com （English）·
  https://ops-console.bayjf.com/zh/ （简体中文）
- 工作台源码（真正的登录后应用）：https://github.com/bayernjf/ops-console
- 产品族总览：https://tier0.bayjf.com

## 技术栈

- [Astro 7](https://astro.build) 静态站点，`output: 'static'`
- `@astrojs/react` 5 + React 19（工作台本身是 Astro 7 SSR；门面页复用同一设计系统）
- 原生 CSS，design token 集中在 `src/styles/global.css` 的 `@layer tokens`
- `@bay/landing-ui`（v1.5.0）提供品牌链接与 GitHub Star 组件
- 双语路由由 Astro i18n 提供：`/` 英文（默认，无前缀）、`/zh/` 中文
- `@astrojs/sitemap` 生成带 hreflang 互指的 sitemap

## 本地开发

需要 Node 22.12+（`node -v` 确认；Astro 7 会拒绝 20.x）。本机实测 Node v22.23.2 /
npm 10.9.8。

```bash
npm install
npm run dev
```

开发服务器端口固定 **3024**（见 `.claude/launch.json`）。

## 构建

```bash
npm run build
```

`astro build` 之后自动跑 `scripts/shot.mjs`：在 `dist/` 上起静态服务（端口 5189），
用 Playwright 截取两种语言的首屏，产出 `dist/preview-en.png` 与
`dist/preview-zh.png` 作为 og:image。预览图不入库，每次构建现生成。首次构建前装一次
浏览器内核：

```bash
npx playwright install chromium
```

其他脚本：

```bash
npm run preview   # 预览 dist
npm run check     # astro check 类型检查（要求 0 错误）
npm run shot      # 只重截 OG 图（需要 dist 已存在）
node scripts/audit-shots.mjs   # 桌面+390px 截图与验收清单，输出到 shots/
```

## 页面结构

```
Hero（id=top）        定位 + 审批流转图（FlowDiagram）
Features（id=capabilities）  五项工作台能力卡片
Principles（id=principles）  三条设计原则
Status（id=status）   M8 本地全绿 / GATE-M8 未过 + 验收板
Footer                仅 GitHub 仓库与产品族总览两个返链
```

另有 404（两种语言同页）、privacy、terms（两种语言各一份）。

## 事实口径（必须如实）

- M8 本地开发完成且本地验证全绿：Vitest 40/40、astro check 0 错误、
  verify-batch1 29/0、notify 通路 OK、verify-batch2 21/0。
- **GATE-M8 未过**。外部验收待办：连续 7 天 live 运营、真实 webhook 地址
  （飞书 / 微信 / 邮件）、生产鉴权（Cloudflare Access / GitHub OIDC）、
  现网部署 / 域名 / TLS / 真实店铺连接（依赖 M6）。
- 绝不宣称已上线、不宣称已接真实店铺；规划域名仅为占位。
- 不暴露内部内核缺口，不写运营数据，不承诺多租户、计费或支付。

## 部署到 Cloudflare Pages（Git 集成）

本仓库不做任何 Cloudflare 配置；上线时按以下步骤操作：

- Production branch：`main`
- Build command：`npx playwright install chromium && npm run build`
- Build output directory：`dist`
- Environment variables：`NODE_VERSION = 22`、`PLAYWRIGHT_BROWSERS_PATH = 0`

域名：`ops-console-landing.pages.dev` + 自定义域名
`ops-console.bayjf.com`（DNS 里一条 `CNAME ops-console →
ops-console-landing.pages.dev`，Proxied）。换域名时同步改 `src/consts.ts` 的
`SITE_URL` 和 `public/robots.txt` 里的 Sitemap 地址。

## SEO / GEO

- 每种语言独立的 title / description，取自 `src/i18n/ui.ts` 的 `meta.*`
- canonical + 三条 hreflang（自身、另一语言、x-default）
- Open Graph + Twitter `summary_large_image`，og:image 用构建时截图
- JSON-LD `@graph`：Organization / WebSite / SoftwareApplication
- `public/robots.txt` 显式放行 GPTBot、ClaudeBot、PerplexityBot、CCBot 等 AI 爬虫
- `public/llms.txt`（中文）与 `public/llms-en.txt`（英文）供答案引擎直接引用
