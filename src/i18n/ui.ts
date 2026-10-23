export const defaultLang = "en" as const;
export type Lang = "en" | "zh";

// Flat dot-keyed dictionary. Human-facing copy lives here only; machine
// readouts (owner/operator, D1–D3 grades, HTTP codes, 20s poll, test counts,
// M-codes) stay literal in the components, identical in both locales.
export const ui = {
  en: {
    "meta.title":
      "ops-console — the Tier 0 family's internal operations workbench: agents run, humans sign off",
    "meta.description":
      "The post-login internal operations console of the Tier 0 product family. Single environment password plus an HMAC-signed cookie, owner/operator RBAC with no user table, a D1–D3 approval workbench wired to the zeus /approval endpoint on a 20s poll, a read-only commerce dashboard, and webhook card notifications with approval deep links. M8 local development is green (Vitest 40/40, astro check 0 errors, verify-batch1 29/0, notify OK, verify-batch2 21/0), but GATE-M8 has not passed: live operation days, real webhook URLs, production authentication and real-shop deployment remain pending. Not merchant-facing; no registration, no SaaS.",

    // ---------- HUD ----------
    "hud.status": "M8 LOCAL GREEN · GATE-M8 OPEN",
    "hud.session": "SESSION",
    "hud.roles": "ROLES",
    "hud.poll": "POLL",

    // ---------- top nav ----------
    "nav.home": "Console",
    "nav.capabilities": "Capabilities",
    "nav.principles": "Principles",
    "nav.status": "Status",
    "nav.langSwitch": "中文",

    // ---------- Hero ----------
    "hero.badge": "M8 LOCAL BUILD COMPLETE · GATE-M8 NOT PASSED",
    "hero.title.line1": "The internal operations console",
    "hero.title.pre": "for the Tier 0 family — ",
    "hero.title.accent": "humans sign off",
    "hero.title.post": " on what agents hold",
    "hero.sub":
      "ops-console is the post-login workbench where the Tier 0 family's internal operations run. Agents execute orders, refunds, content and listings upstream; the console is where a human sees the holds, approves or rejects them, and reads the business. One environment password and an HMAC-signed cookie, two roles, no user table, no registration, zero keys in the browser. It is not merchant-facing, not a SaaS, and not open to sign-up.",
    "hero.ctaPrimary": "Workbench source",
    "hero.ctaSecondary": "See capabilities",
    "hero.meta.caps": "capabilities",
    "hero.meta.roles": "roles",
    "hero.meta.poll": "approval refresh",
    "hero.map.bar": "APPROVAL FLOW",
    "hero.map.status": "WEBHOOK → HUMAN → EXECUTE",
    "hero.map.legend.notify": "IM notification",
    "hero.map.legend.link": "approval deep link",
    "hero.map.legend.human": "human decision",
    "hero.map.legend.upstream": "upstream execute",
    "hero.map.note": "static flow diagram — not a live status feed",

    // ---------- approval flow diagram ----------
    "flow.s1.tag": "STEP 1",
    "flow.s1.name": "Webhook card in IM",
    "flow.s1.sub": "Feishu / WeChat / email notify",
    "flow.s2.tag": "STEP 2",
    "flow.s2.name": "Approval deep link",
    "flow.s2.sub": "opens the held item",
    "flow.s3.tag": "STEP 3",
    "flow.s3.name": "Workbench decision",
    "flow.s3.sub": "approve / reject",
    "flow.s4.tag": "STEP 4",
    "flow.s4.name": "Upstream execution",
    "flow.s4.sub": "via zeus and commerce APIs",
    "flow.rail.approval": "ZEUS /APPROVAL ENDPOINT",
    "flow.rail.approvalSub": "the same channel agents wait on",
    "flow.rail.ui": "CONSOLE FAILURE BOUNDARY",
    "flow.rail.uiSub": "UI down = upstream keeps running",

    // ---------- Capabilities ----------
    "features.stencil": "capabilities",
    "features.title": "Five things the workbench does",
    "features.sub":
      "Everything the console writes goes through the upstream services; everything it reads is reused from existing dashboards. The workbench is a lens and a decision seat, never a second copy of business state.",
    "features.c1.tag": "SESSION & RBAC",
    "features.c1.name": "Minimal session, no user table",
    "features.c1.body":
      "One environment password plus an HMAC-signed cookie. Two roles — owner and operator. There is no account table, no registration, no password-reset flow, and no upstream key ever reaches the browser.",
    "features.c2.tag": "D1–D3 QUEUE",
    "features.c2.name": "Approval workbench",
    "features.c2.body":
      "D1–D3 holds queue as cards: approve or reject. Results flow back consistently through the zeus /approval endpoint — the same channel agents wait on — and the workbench refreshes on a 20s poll while the queue is open.",
    "features.c3.tag": "READ-ONLY",
    "features.c3.name": "Business dashboard",
    "features.c3.body":
      "A read-only view reusing the commerce dashboard: orders, refunds, content and net amount. It shows no cost data — the console reads; upstream services decide and write.",
    "features.c4.tag": "WEBHOOK CARDS",
    "features.c4.name": "Notifications with deep links",
    "features.c4.body":
      "Every hold arrives as a webhook card in the IM client carrying an approval deep link. The IM client only notifies — approve and reject never happen inside IM; the link opens the workbench on the held item.",
    "features.c5.tag": "CONTROLLED WRITES",
    "features.c5.name": "Role-gated writes",
    "features.c5.body":
      "D3 listing changes are owner-only; D2 refunds are open to both roles; manual stock adjustments are available where the flow allows. Every write executes through commerce endpoints — the console never mutates storage directly.",
    "features.footnote":
      "Machine readouts are fixed identifiers: owner / operator roles, D1–D3 grades, the zeus /approval endpoint, the 20s poll interval. The console itself stores no business records; all state lives in zeus and commerce.",

    // ---------- Principles ----------
    "principles.stencil": "design principles",
    "principles.title": "Small by construction; safe to switch off",
    "principles.1.title": "ONE PROCESS = ONE DEPLOYMENT",
    "principles.1.body":
      "A single-process Astro 7 SSR (node standalone) with React 19 interactive islands. One process is one deployment unit: one config, one restart, one thing to reason about.",
    "principles.2.title": "TOKENS STAY SERVER-SIDE",
    "principles.2.body":
      "Upstream bearer tokens live on the server only. The browser holds nothing but an HMAC cookie; there is no path for the client to call zeus or commerce directly.",
    "principles.3.title": "BLAST RADIUS IS THE UI",
    "principles.3.body":
      "Shutting the console down does not affect the underlying zeus and commerce APIs. The workbench is a lens on upstream services, not a dependency of them.",
    "principles.close":
      "The console exists to put a human in the loop — never to become another system the loop depends on.",

    // ---------- Status / roadmap ----------
    "status.stencil": "build in public",
    "status.title": "M8 is green locally; GATE-M8 is not passed",
    "status.sub":
      "The workbench is feature-complete and fully verified on the local build. What remains is external acceptance — days of live operation, real notification endpoints, production authentication and a real deployment. No gate is claimed early.",
    "status.m8.name": "M8 ops console & notifications",
    "status.m8.desc":
      "Local development complete. Every local verification is green: Vitest 40/40, astro check 0 errors, verify-batch1 29/0, the notify path OK, verify-batch2 21/0. The workbench runs end to end locally.",
    "status.gate.name": "GATE-M8 live acceptance",
    "status.gate.desc":
      "Not passed. The items below are external — they cannot be settled inside this repository, and none of them is claimed as done.",
    "status.done": "LOCAL GREEN",
    "status.open": "GATE OPEN",
    "status.board.title": "ACCEPTANCE BOARD",
    "status.board.local": "local verification",
    "status.board.localV": "GREEN · 40/40 · CHECK 0 · 29/0 · NOTIFY · 21/0",
    "status.board.live": "live operations",
    "status.board.liveV": "7 CONSECUTIVE DAYS PENDING",
    "status.board.webhook": "webhook URLs",
    "status.board.webhookV": "FEISHU / WECHAT / EMAIL PENDING",
    "status.board.auth": "production auth",
    "status.board.authV": "CLOUDFLARE ACCESS / GITHUB OIDC PENDING",
    "status.board.deploy": "live deployment",
    "status.board.deployV": "DOMAIN · TLS · REAL SHOP — DEPENDS ON M6",
    "status.note":
      "Never claimed as live: no real shop connection, no production webhooks, no production authentication. The planned URL https://ops-console.bayjf.com is a placeholder until GATE-M8 passes.",

    // ---------- Footer ----------
    "foot.tag":
      "The internal operations console: agents execute upstream, humans sign off on the holds.",
    "foot.nav.capabilities": "Capabilities",
    "foot.nav.principles": "Principles",
    "foot.nav.status": "Status",
    "foot.nav.privacy": "Privacy",
    "foot.nav.terms": "Terms",
    "foot.nav.family": "Family overview",
    "foot.meta": "M8 local green · GATE-M8 open",
  },

  zh: {
    "meta.title":
      "ops-console — Tier 0 产品族的内部运营控制台：Agent 执行，人签核",
    "meta.description":
      "Tier 0 产品族的登录后内部运营工作台。单环境密码 + HMAC 签名 Cookie、owner/operator 双角色、无用户表；D1–D3 审批工作台接 zeus /approval 端点、20 秒轮询；只读电商看板；带审批深链的 webhook 卡片通知。M8 本地开发全绿（Vitest 40/40、astro check 0 错误、verify-batch1 29/0、notify OK、verify-batch2 21/0），但 GATE-M8 尚未过门：连续 live 天数、真实 webhook 地址、生产鉴权与真实店铺部署仍为待办。不面向商家、不开放注册、不是 SaaS。",

    // ---------- HUD ----------
    "hud.status": "M8 本地全绿 · GATE-M8 未过",
    "hud.session": "会话",
    "hud.roles": "角色",
    "hud.poll": "轮询",

    // ---------- top nav ----------
    "nav.home": "控制台",
    "nav.capabilities": "能力",
    "nav.principles": "原则",
    "nav.status": "状态",
    "nav.langSwitch": "EN",

    // ---------- Hero ----------
    "hero.badge": "M8 本地构建完成 · GATE-M8 未过",
    "hero.title.line1": "Tier 0 产品族的",
    "hero.title.pre": "内部运营控制台——",
    "hero.title.accent": "人签核",
    "hero.title.post": "Agent 持住的事",
    "hero.sub":
      "ops-console 是 Tier 0 产品族登录后使用的内部运营工作台。订单、退款、内容与上架由 Agent 在上游执行；控制台是人看到这些持住事项、批准或拒绝、并读业务数字的地方。单环境密码 + HMAC 签名 Cookie，两个角色，没有用户表、没有注册流程，浏览器里没有任何密钥。它不面向商家、不是 SaaS、也不开放注册。",
    "hero.ctaPrimary": "工作台源码",
    "hero.ctaSecondary": "查看能力",
    "hero.meta.caps": "项能力",
    "hero.meta.roles": "个角色",
    "hero.meta.poll": "审批刷新",
    "hero.map.bar": "审批流转",
    "hero.map.status": "WEBHOOK → 人 → 执行",
    "hero.map.legend.notify": "IM 通知",
    "hero.map.legend.link": "审批深链",
    "hero.map.legend.human": "人做决策",
    "hero.map.legend.upstream": "上游执行",
    "hero.map.note": "静态流程图，非实时状态",

    // ---------- approval flow diagram ----------
    "flow.s1.tag": "第 1 步",
    "flow.s1.name": "IM 中的 webhook 卡片",
    "flow.s1.sub": "飞书 / 微信 / 邮件通知",
    "flow.s2.tag": "第 2 步",
    "flow.s2.name": "审批深链",
    "flow.s2.sub": "打开被持住的事项",
    "flow.s3.tag": "第 3 步",
    "flow.s3.name": "工作台决策",
    "flow.s3.sub": "批准 / 拒绝",
    "flow.s4.tag": "第 4 步",
    "flow.s4.name": "上游执行",
    "flow.s4.sub": "经 zeus 与 commerce API",
    "flow.rail.approval": "ZEUS /APPROVAL 端点",
    "flow.rail.approvalSub": "与 Agent 等待的同一条通道",
    "flow.rail.ui": "控制台失效边界",
    "flow.rail.uiSub": "界面宕了，上游照常运行",

    // ---------- Capabilities ----------
    "features.stencil": "能力",
    "features.title": "工作台做五件事",
    "features.sub":
      "控制台写的每一项都走上游服务；读的每一块都复用现有看板。工作台是透镜和决策席，不是业务状态的第二份拷贝。",
    "features.c1.tag": "会话与 RBAC",
    "features.c1.name": "极简会话，没有用户表",
    "features.c1.body":
      "一个环境密码 + HMAC 签名 Cookie。两个角色——owner 与 operator。没有账号表、没有注册、没有重置密码流程，上游密钥永远不进浏览器。",
    "features.c2.tag": "D1–D3 队列",
    "features.c2.name": "审批工作台",
    "features.c2.body":
      "D1–D3 的持住事项排成卡片：批准或拒绝。结果一致地经 zeus /approval 端点回传——与 Agent 等待的是同一条通道——队列开启时工作台按 20 秒轮询刷新。",
    "features.c3.tag": "只读",
    "features.c3.name": "业务看板",
    "features.c3.body":
      "复用电商看板的只读视图：订单、退款、内容与净额。不含成本数据——控制台只读，上游服务负责决策与写入。",
    "features.c4.tag": "WEBHOOK 卡片",
    "features.c4.name": "带深链的通知",
    "features.c4.body":
      "每一条持住事项都以 webhook 卡片出现在 IM 客户端里，带审批深链。IM 只通知——批准与拒绝永远不在 IM 里发生；深链把人带到工作台对应的事项上。",
    "features.c5.tag": "受控写入",
    "features.c5.name": "按角色授权的写入",
    "features.c5.body":
      "D3 上架变更仅 owner 可操作；D2 退款两个角色都可操作；流程允许的环节支持手工库存调整。每一次写入都经 commerce 端点执行——控制台绝不直接改存储。",
    "features.footnote":
      "机器读数为固定标识：owner / operator 角色、D1–D3 分级、zeus /approval 端点、20 秒轮询间隔。控制台本身不存业务记录，所有状态都在 zeus 与 commerce 里。",

    // ---------- Principles ----------
    "principles.stencil": "设计原则",
    "principles.title": "刻意做小，随时能关掉",
    "principles.1.title": "单进程 = 单部署单元",
    "principles.1.body":
      "单进程 Astro 7 SSR（node standalone）+ React 19 交互岛。一个进程就是一个部署单元：一份配置、一次重启、一个要操心的东西。",
    "principles.2.title": "令牌只在服务端",
    "principles.2.body":
      "上游 bearer 令牌只存在于服务端。浏览器里除了 HMAC Cookie 什么都没有；客户端没有任何路径可以直接调用 zeus 或 commerce。",
    "principles.3.title": "爆炸半径就是界面",
    "principles.3.body":
      "关掉控制台不影响底层 zeus 与 commerce API。工作台是上游服务的透镜，不是它们的依赖。",
    "principles.close":
      "控制台的存在是为了把人放进回路——永远不要变成回路所依赖的另一个系统。",

    // ---------- Status / roadmap ----------
    "status.stencil": "公开进度",
    "status.title": "M8 本地全绿；GATE-M8 尚未过门",
    "status.sub":
      "工作台功能完整、本地验证全绿。剩下的都是外部验收——连续 live 天数、真实通知端点、生产鉴权与真实部署。不提前宣称过门。",
    "status.m8.name": "M8 运营控制台与通知",
    "status.m8.desc":
      "本地开发完成。所有本地验证全绿：Vitest 40/40、astro check 0 错误、verify-batch1 29/0、notify 通路 OK、verify-batch2 21/0。工作台在本地端到端可运行。",
    "status.gate.name": "GATE-M8 线上验收",
    "status.gate.desc":
      "未过。下面这些事项都是外部的——在这个仓库里无法了结，也绝不宣称已完成。",
    "status.done": "本地全绿",
    "status.open": "门未过",
    "status.board.title": "验收板",
    "status.board.local": "本地验证",
    "status.board.localV": "全绿 · 40/40 · CHECK 0 · 29/0 · NOTIFY · 21/0",
    "status.board.live": "连续 live 运营",
    "status.board.liveV": "待满连续 7 天",
    "status.board.webhook": "webhook 地址",
    "status.board.webhookV": "飞书 / 微信 / 邮件 待接入",
    "status.board.auth": "生产鉴权",
    "status.board.authV": "CLOUDFLARE ACCESS / GITHUB OIDC 待接入",
    "status.board.deploy": "现网部署",
    "status.board.deployV": "域名 · TLS · 真实店铺——依赖 M6",
    "status.note":
      "绝不冒充已上线：没有真实店铺连接、没有生产 webhook、没有生产鉴权。规划地址 https://ops-console.bayjf.com 在 GATE-M8 过门前仅为占位。",

    // ---------- Footer ----------
    "foot.tag":
      "内部运营控制台：Agent 在上游执行，人对持住事项签核。",
    "foot.nav.capabilities": "能力",
    "foot.nav.principles": "原则",
    "foot.nav.status": "状态",
    "foot.nav.privacy": "隐私",
    "foot.nav.terms": "条款",
    "foot.nav.family": "产品族总览",
    "foot.meta": "M8 本地全绿 · GATE-M8 未过",
  },
} as const;
