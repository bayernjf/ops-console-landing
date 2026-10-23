# handoff — ops-console-landing

Date: 2026-10-24
Repo: `/Users/jiangfeng/000mycodes/ops-console-landing/` (independent git repo, branch `main`)
**Published: public repo https://github.com/bayernjf/ops-console-landing — see Round 3.**

## What was built

A pure-static, bilingual (English default `/` + Chinese `/zh/`) Astro 7 facade for the
**ops-console** module of the Tier 0 family. The actual post-login workbench
(https://github.com/bayernjf/ops-console) is untouched; this repo is only the public
introduction page. Stack mirrors tier0-landing exactly: Astro 7 `output: 'static'`,
@astrojs/react 5 + React 19, @astrojs/sitemap, `@bay/landing-ui@github:bayernjf/landing-ui#v1.5.0`,
native CSS tokens.

## Commit sequence (20, English conventional commits, no AI trailer)

| # | hash | subject |
|---|------|---------|
| 1 | ef1bc6a | chore: scaffold Astro 7 static bilingual site skeleton |
| 2 | 8971c45 | feat: design base with industrial tokens, layout shell and sign-off mark |
| 3 | bae8b23 | feat: bilingual i18n dictionary with honest M8/GATE-M8 copy |
| 4 | 87e3b37 | feat: HUD strip, hero section and approval-flow diagram |
| 5 | 1726bfc | feat: five workbench capability cards |
| 6 | 27d805b | feat: design principles and honest M8/GATE-M8 status board |
| 7 | 59c84b2 | feat: footer with GitHub repo and family overview backlinks |
| 8 | 56962cf | feat: home and zh routes plus 404 page |
| 9 | 92e0422 | feat: SEO meta, hreflang alternates and JSON-LD schema |
| 10 | 7ea2f9c | feat: robots.txt, llms.txt and llms-en.txt for answer engines |
| 11 | 949ab2c | feat: privacy and terms legal pages in both locales |
| 12 | a3c1787 | feat: post-build Playwright screenshot script for OG images |
| 13 | 6d9d9b9 | fix: type-safe stage definitions in flow diagram |
| 14 | 040f5ac | fix: mobile grid track overflow from nowrap flow codes |
| 15 | 801a4f9 | docs: README and AGENTS with dev and deployment instructions |
| 16 | 7c6d5bf | docs: handoff report (initial round-1 entry) |

## Round 2 — independent-verification follow-up (2026-10-24, second pass)

The independent verify pass came back with no blockers but two fixes, both done as
NEW atomic commits (no history amended):

| # | hash | subject |
|---|------|---------|
| 17 | aa3bda3 | fix: constrain hero grid tracks so flow panel cannot overflow viewport |
| 18 | 39029df | fix: scroll-margin-top on anchored sections below fixed header |
| 19 | 65cd3a3 | docs: handoff report — round 2 verification results |

**D1 — desktop hero panel clip (fixed).** Cause: `.hero__grid` used
`0.92fr 1.08fr`, which resolves as `minmax(auto, …)`; the flow panel's min-content
(nowrap rail heads / block tags) forced the right track to ~884px, pushing the panel's
border box to x≈1317, and `.hero{overflow:hidden}` clipped its right rivet and the
"WEBHOOK → HUMAN → EXECUTE" tail at 1280px. Fix: both tracks are now
`minmax(0, …)`, `min-width:0` on `.hero__copy`/`.hero__map`, `.flow__bottom` rails are
`minmax(0,1fr)`, rail heads wrap and `.flow__rail-sub` may wrap instead of `nowrap`.
The shell was not shrunk; internal content now wraps/elides instead of stretching tracks.

**N2 — anchor landing (fixed).** Added `section[id]{scroll-margin-top:108px}` in
global.css (fixed header = 34px HUD + 58px nav = 92px, +16px breathing).

**Re-verification (all run by me, after rebuild):**
- `npm run build` = exit 0, 7 pages + sitemap, OG images regenerated.
- `npm run check` = **0 errors / 0 warnings / 0 hints**.
- Element right-edge walk (every element, not scrollWidth; overflow contained in
  self-scroll ancestors — the HUD strip — exempted):

  | width | en `/` | zh `/zh/` |
  |-------|--------|-----------|
  | 1024  | CLEAN  | CLEAN     |
  | 1280  | CLEAN  | CLEAN     |
  | 1440  | CLEAN  | CLEAN     |
  | 1536  | CLEAN  | CLEAN     |
  | 390   | CLEAN  | CLEAN     |

- Anchors: after jump, `#capabilities` / `#principles` / `#status` section top = **108px**
  in both locales (header bottom = 92px); the visible h2 heading sits ~225px — fully
  clear of the fixed header.
- Fresh `shots/en-hero-desktop.png` + `shots/zh-hero-desktop.png` visually confirmed:
  panel right border and rivet fully visible, "WEBHOOK → HUMAN → EXECUTE" tail fully
  visible, no new wrapping regressions in the flow diagram. Full audit re-run:
  brokenLinks / noEmoji / noZombieButtons / noMobileOverflow all PASS.

**Decisions documented (no code change):**
- D2 — footer "BayJF" credit link (shared `@bay/landing-ui` BayjfLink → https://bayjf.com):
  confirmed family-standard (tier0-landing, zeus-landing, atlas-landing render the same
  component). Kept as-is; the spec's "footer may keep only GitHub + family overview" is
  permissive, not prohibitive.
- N1 — zh hreflang without trailing slash: left as-is, standard Astro
  `trailingSlash: 'ignore'` behavior shared with the family landings.
- The verifier's scratch directory `verify-shots/` was removed by the orchestrator before
  publishing (it was always untracked, never committed).

## Round 3 — full-history secret scan and public release (orchestrator)

Pre-push secret scan (run independently by the orchestrator, full history):

1. Forbidden path names over every object ever committed:
   `git rev-list --all --objects | awk '{print $2}' | sort -u` scanned for
   `\.env`, `data/`, `*.db`, `*.sqlite`, `*.jsonl`, `*.pem`, `*.key`, `*.p12`, `*.pfx`,
   `id_rsa`, `credentials`, `secret`, `.netrc`, `.pgpass` → **NO FORBIDDEN PATHS**.
2. Every unique blob in history (`git cat-file blob` over all `git rev-list --all --objects`
   SHAs) scanned for `ghp_`, `github_pat_`, `gho_`, `AKIA`, `AIza`, `xox*`,
   `-----BEGIN PRIVATE KEY-----`, `sk-`, `Bearer …`, and
   `password|api_key|access_token|secret_key` assignments → **zero matches**.
3. No `.env*` files on disk (outside node_modules); external hosts in tracked files are
   only: `localhost`, `w3.org`, `schema.org`, `astro.build`, `bayjf.com`, `github.com`,
   `tier0.bayjf.com`, and the placeholder `ops-console.bayjf.com` — no webhook endpoints,
   no private/internal hosts.

Release:
- `gh repo create bayernjf/ops-console-landing --public --source=. --remote=origin
  --description "Public static bilingual landing page for ops-console, the Tier0 internal
  operations console. Built with Astro."` → https://github.com/bayernjf/ops-console-landing
- `git push -u origin main` → success; remote `main` = local `main` (19 commits at push
  time, then this handoff update).
- Verified via `gh repo view`: visibility = **PUBLIC**, default branch = **main**.

## Round 1 — initial build results

## Build / check results

- `npm install` — 336 packages, clean.
- `npm run build` — 7 pages built (`/`, `/zh/`, `/404`, `/privacy`, `/terms`, `/zh/privacy`,
  `/zh/terms`) + sitemap-index.xml; `scripts/shot.mjs` produced `dist/preview-en.png` and
  `dist/preview-zh.png` (1280×800 OG images). Only upstream vite/rolldown deprecation warnings
  (same as tier0-landing), zero errors.
- `npm run check` (astro check) — **0 errors, 0 warnings, 0 hints** (24 files).
- Dev port: **3024** (confirmed free; recorded in README, AGENTS.md, `.claude/launch.json`).
- Shot static port: **5189** (5187=commerce-os-landing, 5188=tier0-landing already taken).

## Screenshots (`shots/`, committed) and checklist

Generated by `node scripts/audit-shots.mjs` (1280×900 desktop + 390×844 mobile):

- `shots/en-hero-desktop.png`
- `shots/en-capabilities-desktop.png`
- `shots/en-principles-desktop.png`
- `shots/en-status-desktop.png`
- `shots/zh-hero-desktop.png`
- `shots/zh-status-desktop.png`
- `shots/en-hero-mobile-390.png`
- `shots/zh-hero-mobile-390.png`

Checklist output:

- broken internal links: **PASS**
- no emoji in body copy: **PASS** (© copyright symbol excluded — standard typography)
- no zombie buttons: **PASS** (zero `<button>` elements; every control is a real `<a>` —
  workbench repo on GitHub, anchor links, language switch, backlinks)
- no horizontal overflow at 390px: **PASS** (all elements; the intentionally scrollable
  HUD strip is self-contained and exempted)

Manual visual review of the shots: dark industrial theme matches family tokens; brand mark
variant (hexagon + three stacked layers + amber sign-off check) renders; no orphaned
widows on cards beyond natural line wrap; Chinese glyphs render correctly.

## Honest status wording (as required)

The page states: M8 local build complete with all local verification green (Vitest 40/40,
astro check 0 errors, verify-batch1 29/0, notify OK, verify-batch2 21/0), but **GATE-M8 has
NOT passed**. The acceptance board lists the four external items: 7 consecutive days of
live operations; real webhook URLs (Feishu / WeChat / email); production authentication
(Cloudflare Access / GitHub OIDC); live deployment / domain / TLS / real shop connection
(depends on M6). The planned URL `https://ops-console.bayjf.com` is presented as a placeholder.
No live-shop, no production-webhook, no SaaS/registration/billing claims. No internal kernel
gaps disclosed.

## Deviations from spec (with reasons)

1. **No CTA / waitlist section.** Spec says internal tool, no contact email; tier0's Cta
   component (partner + waitlist mailto) was therefore omitted entirely. Hero CTAs are real
   links: "Workbench source" → the GitHub repo, "See capabilities" → `#capabilities`.
2. **Brand mark variant.** Instead of reusing tier0's mark verbatim, the same hexagon +
   three stacked layers (two data-cyan top, amber base) carries an overstamped amber
   check (human sign-off) to distinguish ops-console — requested by the spec as an option.
3. **HUD clock bug fixed.** tier0's Layout script looks up `#res-clock` while its Hud used a
   bare `data-clock` attribute (clock never updated). Here the clock span carries
   `id="res-clock"`, so the live clock actually runs.
4. **Overflow audit strengthened.** The first audit run passed while real mobile overflow
   existed (body `overflow-x:hidden` masks scrollWidth and the flow diagram's `nowrap`
   code lines forced the mobile grid track wider than the viewport). Fixed by
   `minmax(0,1fr)` on the mobile hero grid + wrapping flow code; the audit script now scans
   every element's right edge and only exempts overflow contained in self-scrolling
   ancestors. This is why there are two small `fix:` commits in the sequence.
5. **Footer backlinks.** Exactly as spec'd: GitHub workbench repo (StarOnGithub), family
   overview (`https://tier0.bayjf.com`), plus the shared BayjfLink component. No email,
   no waitlist.
6. **`shots/` committed.** Unlike OG images (which stay in gitignored `dist/`), the audit
   screenshots are committed as verification evidence for the orchestrator.

## Before going live (orchestrator notes)

- Create the GitHub remote and push `main` only after independent verification.
- Cloudflare Pages: build `npx playwright install chromium && npm run build`, output `dist`,
  env `NODE_VERSION=22`, `PLAYWRIGHT_BROWSERS_PATH=0`; then CNAME `ops-console →
  ops-console-landing.pages.dev`. Deploy steps are documented in README.md — no infra was
  touched in this repo.
