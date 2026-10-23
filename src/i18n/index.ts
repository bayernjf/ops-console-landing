import { ui, defaultLang, type Lang } from "./ui";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang === "zh") return "zh";
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getOtherLang(lang: Lang): Lang {
  return lang === "zh" ? "en" : "zh";
}

/** Always-rooted path, e.g. "/privacy" or "/zh/privacy" for the given lang. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "zh") return `/zh${clean === "/" ? "" : clean}`;
  return clean;
}

/** URL of the same page in the other language, derived from Astro.url. */
export function getAltLangPath(url: URL, lang: Lang): string {
  const segments = url.pathname.split("/").filter(Boolean);
  // strip existing locale prefix (only /zh exists)
  const rest = segments[0] === "zh" ? segments.slice(1) : segments;
  const path = rest.length ? `/${rest.join("/")}` : "/";
  return lang === "zh" ? path : `/zh${path === "/" ? "" : path}`;
}

export type { Lang };
