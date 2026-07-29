// State Configuration and Isolation Utilities for CPD Sessions & Scheduler

export const STATES = [
  { id: "up", code: "UP", name: "Uttar Pradesh", path: "/up" },
  { id: "goa", code: "GA", name: "Goa", path: "/goa" },
  { id: "delhi", code: "DL", name: "Delhi", path: "/delhi" },
  { id: "uttarakhand", code: "UT", name: "Uttarakhand", path: "/uttarakhand" },
  { id: "gujarat", code: "GJ", name: "Gujarat", path: "/gujarat" },
];

export const BASE_SCHEDULER_URL = "https://aeskills.github.io/CPD-Scheduler";
export const BASE_CPD_URL = "https://aeskills.github.io/CPD";

export const STATE_CONFIGS = {
  up: {
    id: "up",
    code: "UP",
    name: "Uttar Pradesh",
    schedulerUrl: "https://aeskills.github.io/CPD-Scheduler/UP",
    cpdUrl: "https://aeskills.github.io/CPD/up",
    title: "CPD Foundation Program — Uttar Pradesh",
    heroTitleHighlight: "teaching practice in Uttar Pradesh",
  },
  goa: {
    id: "goa",
    code: "GA",
    name: "Goa",
    schedulerUrl: "https://aeskills.github.io/CPD-Scheduler/GA",
    cpdUrl: "https://aeskills.github.io/CPD/goa",
    title: "CPD Foundation Program — Goa",
    heroTitleHighlight: "teaching practice in Goa",
  },
  ga: {
    id: "goa",
    code: "GA",
    name: "Goa",
    schedulerUrl: "https://aeskills.github.io/CPD-Scheduler/GA",
    cpdUrl: "https://aeskills.github.io/CPD/goa",
    title: "CPD Foundation Program — Goa",
    heroTitleHighlight: "teaching practice in Goa",
  },
  delhi: {
    id: "delhi",
    code: "DL",
    name: "Delhi",
    schedulerUrl: "https://aeskills.github.io/CPD-Scheduler/DL",
    cpdUrl: "https://aeskills.github.io/CPD/delhi",
    title: "CPD Foundation Program — Delhi",
    heroTitleHighlight: "teaching practice in Delhi",
  },
  dl: {
    id: "delhi",
    code: "DL",
    name: "Delhi",
    schedulerUrl: "https://aeskills.github.io/CPD-Scheduler/DL",
    cpdUrl: "https://aeskills.github.io/CPD/delhi",
    title: "CPD Foundation Program — Delhi",
    heroTitleHighlight: "teaching practice in Delhi",
  },
  uttarakhand: {
    id: "uttarakhand",
    code: "UT",
    name: "Uttarakhand",
    schedulerUrl: "https://aeskills.github.io/CPD-Scheduler/UT",
    cpdUrl: "https://aeskills.github.io/CPD/uttarakhand",
    title: "CPD Foundation Program — Uttarakhand",
    heroTitleHighlight: "teaching practice in Uttarakhand",
  },
  uttrakhand: {
    id: "uttarakhand",
    code: "UT",
    name: "Uttarakhand",
    schedulerUrl: "https://aeskills.github.io/CPD-Scheduler/UT",
    cpdUrl: "https://aeskills.github.io/CPD/UT",
    title: "CPD Foundation Program — Uttarakhand",
    heroTitleHighlight: "teaching practice in Uttarakhand",
  },
  ut: {
    id: "uttarakhand",
    code: "UT",
    name: "Uttarakhand",
    schedulerUrl: "https://aeskills.github.io/CPD-Scheduler/UT",
    cpdUrl: "https://aeskills.github.io/CPD/UT",
    title: "CPD Foundation Program — Uttarakhand",
    heroTitleHighlight: "teaching practice in Uttarakhand",
  },
  gujarat: {
    id: "gujarat",
    code: "GJ",
    name: "Gujarat",
    schedulerUrl: "https://aeskills.github.io/CPD-Scheduler/GJ",
    cpdUrl: "https://aeskills.github.io/CPD/gujarat",
    title: "CPD Foundation Program — Gujarat",
    heroTitleHighlight: "teaching practice in Gujarat",
  },
  gj: {
    id: "gujarat",
    code: "GJ",
    name: "Gujarat",
    schedulerUrl: "https://aeskills.github.io/CPD-Scheduler/GJ",
    cpdUrl: "https://aeskills.github.io/CPD/gujarat",
    title: "CPD Foundation Program — Gujarat",
    heroTitleHighlight: "teaching practice in Gujarat",
  },
  default: {
    id: "",
    code: "CR",
    name: "Chain & Retail Schools",
    schedulerUrl: "https://aeskills.github.io/CPD-Scheduler",
    cpdUrl: "https://aeskills.github.io/CPD/",
    title: "CPD Foundation Program",
    heroTitleHighlight: "teaching practice",
  },
};

/**
 * Helper to resolve valid state ID from a raw string/slug.
 * Performs strict matching against known states and aliases to avoid invalid route values (like 'admin').
 */
function resolveStateId(slug) {
  if (!slug) return null;
  const key = slug.toLowerCase().trim();
  if (STATE_CONFIGS[key]) return STATE_CONFIGS[key].id || key;
  const found = STATES.find(
    (s) => s.id === key || s.code.toLowerCase() === key
  );
  if (found) return found.id;
  return null;
}

/**
 * Returns isolated state configuration object
 */
export function getStateConfig(stateId) {
  if (!stateId) return STATE_CONFIGS.default;
  const key = stateId.toLowerCase().trim();
  const resolvedId = resolveStateId(key);
  if (resolvedId && STATE_CONFIGS[resolvedId]) return STATE_CONFIGS[resolvedId];
  
  return STATE_CONFIGS.default;
}

/**
 * Extracts active state slug from current window location (pathname, hash, or search)
 */
export function getStateFromPath(
  pathname = window.location.pathname,
  hash = window.location.hash,
  search = window.location.search
) {
  // 1. Check GitHub Pages SPA search redirect: ?/up or ?/goa or ?/delhi
  if (search && search.startsWith("?/")) {
    const rawPath = search.slice(2).split("&")[0].replace(/\/$/, "");
    const firstSeg = rawPath.split("/")[0];
    const resolved = resolveStateId(firstSeg);
    if (resolved) return resolved;
  }

  // 2. Check standard search params: ?state=up
  try {
    const searchParams = new URLSearchParams(search);
    const stateQuery = searchParams.get("state");
    if (stateQuery) {
      const resolved = resolveStateId(stateQuery);
      if (resolved) return resolved;
    }
  } catch (e) {
    console.warn("Failed parsing query string", e);
  }

  // 3. Check hash: /#/up or #up
  if (hash) {
    const hashPath = hash.replace(/^#\/?/, "").toLowerCase().trim();
    const firstSegment = hashPath.split("/")[0];
    const resolved = resolveStateId(firstSegment);
    if (resolved) return resolved;
  }

  // 4. Check pathname: /CPD/up or /up or /CPD/up/
  if (pathname) {
    const normalized = pathname.replace(/\/$/, "");
    const segments = normalized.split("/").filter(Boolean);
    
    // Find segment following 'CPD' if present, or last segment
    const cpdIdx = segments.findIndex((s) => s.toLowerCase() === "cpd");
    let candidate = "";
    if (cpdIdx !== -1 && segments.length > cpdIdx + 1) {
      candidate = segments[cpdIdx + 1];
    } else if (segments.length > 0) {
      candidate = segments[segments.length - 1];
    }

    if (candidate) {
      const resolved = resolveStateId(candidate);
      if (resolved) return resolved;
    }
  }

  return ""; // default / chain & retail
}

/**
 * Returns the CPD Scheduler URL for a given state (e.g. https://aeskills.github.io/CPD-Scheduler/UP)
 */
export function getSchedulerUrl(stateId) {
  const config = getStateConfig(stateId);
  return config.schedulerUrl;
}

/**
 * Returns user-friendly state name (e.g. "Uttar Pradesh")
 */
export function getStateDisplayName(stateId) {
  const config = getStateConfig(stateId);
  return config.name;
}

/**
 * Formats full CPD web URL for a state (e.g. https://aeskills.github.io/CPD/up)
 */
export function getCpdStateUrl(stateId) {
  const config = getStateConfig(stateId);
  return config.cpdUrl;
}
