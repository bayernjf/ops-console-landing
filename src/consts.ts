// Site-wide constants. No human-facing copy here — that lives in src/i18n/ui.ts.
// This repo is the public facade of the ops-console workbench (a separate,
// already-completed internal repo). The facade contains no credentials and no
// contact forms: ops-console is an internal tool, not merchant-facing.
export const SITE_URL = "https://ops-console.bayjf.com";
export const SITE_NAME = "ops-console";
export const AUTHOR = "bayernjf";

export const SOCIAL = {
  // The actual post-login workbench — this facade only links to it.
  github: "https://github.com/bayernjf/ops-console",
};

// Family overview backlink only — no waitlist, no partner email on this site.
export const FAMILY = "https://tier0.bayjf.com";
export const FAMILY_NAME = "Tier 0";

export const BRAND_MARK = "/brand/ops-console-mark.svg";

// Playwright renders dist/preview-{en,zh}.png during build (scripts/shot.mjs).
export const OG_IMAGE = {
  en: "/preview-en.png",
  zh: "/preview-zh.png",
} as const;
export const OG_IMAGE_SIZE = { width: 1280, height: 800 } as const;
