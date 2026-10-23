# AGENTS.md — ops-console-landing

供 AI coding agents（Claude Code / Codex / Cursor / Copilot 等）在本仓库工作时自动读取。

## 项目概览
ops-console-landing 是 Tier 0 产品族内部运营控制台（ops-console）的**公开门面页**：
纯静态 Astro 站点，中英双语，工业运营控制台视觉（沿用家族 *-landing 设计系统）。
它只是一个介绍页——工作台本身（登录后应用）在独立仓库
https://github.com/bayernjf/ops-console，本仓库不包含、也不镜像工作台代码。

## 技术栈
| 类别 | 方案 |
|------|------|
| 框架 | Astro 7（SSG，`output: 'static'`） |
| 样式 | 原生 CSS，design token 集中在 `src/styles/global.css` 的 `@layer tokens` |
| i18n | Astro i18n：`/` 英文（默认无前缀）、`/zh/` 中文 |
| 共享包 | `@bay/landing-ui` v1.5.0（品牌返链、GitHub Star） |
| Node / 包管理 | >= 22.12 / npm（本机 v22.23.2 / npm 10.9.8） |

## 常用命令
```bash
npm install
npm run dev       # 开发服务器（端口 3024）
npm run build     # astro build && node scripts/shot.mjs（产出 dist/preview-{en,zh}.png）
npm run preview
npm run check     # astro check——要求 0 错误
node scripts/audit-shots.mjs   # 桌面+390px 截图与验收清单，输出 shots/
```

## 约定
- 所有**面向人的文案**走 `src/i18n/ui.ts`，新增字符串必须同时提供中英两版。
- 机器读数（owner/operator、D1–D3、HTTP 423、20s 轮询、测试数 40/40、M8/GATE-M8）
  可在组件中以字面量出现，两种语言保持一致。
- 文案事实必须如实：M8 本地全绿，但 **GATE-M8 未过**；不宣称已上线、不宣称已接
  真实店铺；规划域名 `https://ops-console.bayjf.com` 仅为占位。
- 状态待办清单固定为四项：连续 7 天 live、真实 webhook 地址（飞书/微信/邮件）、
  生产鉴权（Cloudflare Access / GitHub OIDC）、现网部署（依赖 M6）。
- 改域名要同步 `src/consts.ts` 的 `SITE_URL` 与 `public/robots.txt` 的 Sitemap 地址。
- `scripts/shot.mjs` 用静态端口 5189（5187=commerce-os、5188=tier0 已占用）。

## 不要做的事
- 不要直接改构建产物 `dist/`。
- 不要把面向人的文案硬编码进组件（一律走 i18n 字典）。
- 不要加 waitlist / 联系邮箱 / 表单——这是内部工具门面，返链只有工作台 GitHub
  仓库与产品族总览 https://tier0.bayjf.com。
- 不要写定价、注册、上线日期、客户案例；不要承诺多租户、计费、支付。
- 不要暴露内部内核缺口或放运营数据；不要提交 `.env`、密钥、`data/`、`*.db`、
  `*.jsonl`、`node_modules`、`dist`。
- 不要在本仓库做 Cloudflare 部署或 CNAME——只在 README 记录部署步骤。
