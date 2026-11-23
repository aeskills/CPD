/**
 * Google Analytics 4 helpers.
 * - The gtag tag itself lives in index.html.
 * - Everything here is wrapped in try/catch so analytics can never break the site.
 * - PRIVACY: only non-personal values are ever sent (no names, emails, IDs,
 *   form fields, search text, query strings or localStorage progress data).
 */

export function trackEvent(name, params) {
  try {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", name, params || {});
  } catch {
    /* never break the site */
  }
}

// Fire an event only once per key for the lifetime of the page load.
const onceKeys = new Set();
export function trackEventOnce(key, name, params) {
  try {
    if (onceKeys.has(key)) return;
    onceKeys.add(key);
    trackEvent(name, params);
  } catch {
    /* ignore */
  }
}

const PAGE_TITLES = {
  landing: "CPD - Home",
  modules: "CPD - Modules",
  session: "CPD - Session",
};

// Virtual page view for the single-page app, de-duplicated so StrictMode
// double-effects and re-renders never send the same view twice.
let lastPageKey = null;
export function trackPageView(page, moduleId, state) {
  try {
    const key = `${page}|${page === "session" ? moduleId : ""}|${state || ""}`;
    if (key === lastPageKey) return;
    lastPageKey = key;

    const base = window.location.origin + window.location.pathname.replace(/\/$/, "");
    let vpath = `/${page}`;
    if (page === "session" && moduleId) vpath += `/${moduleId}`;

    const params = {
      page_title: PAGE_TITLES[page] || `CPD - ${page}`,
      page_location: base + vpath,
      page_path: vpath,
    };
    if (state) params.state = state;
    if (page === "session" && moduleId) params.module_id = moduleId;
    trackEvent("page_view", params);
  } catch {
    /* ignore */
  }
}

// select_state: once per state per page load
export function trackStateSelected(state) {
  if (!state) return;
  trackEventOnce(`state:${state}`, "select_state", { state });
}

// ---- Outbound / download link tracking (document-level, capture phase) ----
const recentLinks = new Map();
const DEDUPE_MS = 1500;

function classifyLink(url, anchor) {
  const u = url.toLowerCase();
  if (/(^|\/\/|\.)(youtube\.com|youtu\.be)(\/|$)/.test(u)) return "open_tutorial";
  if (u.includes("forms.gle") || u.includes("docs.google.com/forms")) return "open_form";
  if (/\.pptx?($|[?#])/.test(u) || u.includes("/export/pptx")) return "download_ppt";
  if (anchor.hasAttribute("download") && /ppt/i.test(u)) return "download_ppt";
  return "open_resource";
}

function handleLinkClick(e) {
  try {
    const anchor = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!anchor) return;
    const isBlank = anchor.getAttribute("target") === "_blank";
    const isDownload = anchor.hasAttribute("download");
    if (!isBlank && !isDownload) return;

    const href = anchor.href;
    if (!href || !/^https?:/i.test(href)) return;

    // Strip query string and hash: they may carry personal data.
    let clean = href;
    let domain = "";
    try {
      const parsed = new URL(href);
      domain = parsed.hostname;
      clean = parsed.origin + parsed.pathname;
    } catch {
      /* keep href */
    }

    const now = Date.now();
    const last = recentLinks.get(clean);
    if (last && now - last < DEDUPE_MS) return;
    recentLinks.set(clean, now);

    const text = (anchor.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100);
    trackEvent(classifyLink(clean, anchor), {
      link_url: clean,
      link_domain: domain,
      link_text: text,
    });
  } catch {
    /* ignore */
  }
}

if (typeof document !== "undefined" && !window.__cpdLinkTracking) {
  window.__cpdLinkTracking = true;
  document.addEventListener("click", handleLinkClick, true);
}
