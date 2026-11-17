/* @soffits/dsh-ui-kit 0.3.0: built by scripts/build.mjs from src/client/, locale/ and Lucide 1.74.0 (ISC; see LICENSE-lucide). Do not edit. */
window.__ModuleLoader__.load({
  id: "@soffits/dsh-ui-kit",
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.js
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);

// virtual:locales
var locales_default = { "en": { "meta": { "title": "UI kit", "description": "Shared pieces for plugin pages: icon tiles, ticking times, rings and sparklines, a live dot and change cues." }, "ui": { "live": "Live", "connecting": "Connecting", "updated": "Updated {time}", "liveUpdated": "Live \xB7 updated {time}", "justNow": "just now", "newSince": "New since you last looked", "suggested": "Suggested", "now": "now", "inDuration": "in {duration}", "earlier": "+{n} earlier", "less": "Show less", "send": "Send", "mentionPick": "Mention someone", "noMatch": "Nobody by that name", "cancel": "Cancel", "mentioned": "You were mentioned", "unreadCount": "{n} unread" } }, "fr": { "meta": { "title": "Kit d\u2019interface", "description": "Des \xE9l\xE9ments partag\xE9s pour les pages des plugins : tuiles d\u2019ic\xF4nes, heures qui avancent, anneaux et courbes, point \xAB en direct \xBB et signaux de changement." }, "ui": { "live": "En direct", "connecting": "Connexion", "updated": "Mis \xE0 jour \xE0 {time}", "liveUpdated": "En direct \xB7 mis \xE0 jour \xE0 {time}", "justNow": "\xE0 l\u2019instant", "newSince": "Nouveau depuis votre derni\xE8re visite", "suggested": "Suggestions", "now": "maintenant", "inDuration": "dans {duration}", "earlier": "+{n} plus anciens", "less": "Moins", "send": "Envoyer", "mentionPick": "Mentionner quelqu\u2019un", "noMatch": "Personne de ce nom", "cancel": "Annuler", "mentioned": "On vous a mentionn\xE9", "unreadCount": "{n} non lus" } }, "zh": { "meta": { "title": "\u754C\u9762\u7EC4\u4EF6", "description": "\u63D2\u4EF6\u9875\u9762\u5171\u7528\u7684\u5C0F\u90E8\u4EF6\uFF1A\u56FE\u6807\u3001\u5B9E\u65F6\u66F4\u65B0\u7684\u65F6\u95F4\u3001\u5706\u73AF\u548C\u5C0F\u6298\u7EBF\u3001\u5B9E\u65F6\u72B6\u6001\u70B9\u548C\u53D8\u5316\u63D0\u793A\u3002" }, "ui": { "live": "\u5B9E\u65F6", "connecting": "\u6B63\u5728\u8FDE\u63A5", "updated": "{time} \u66F4\u65B0", "liveUpdated": "\u5B9E\u65F6 \xB7 {time} \u66F4\u65B0", "justNow": "\u521A\u521A", "newSince": "\u4E0A\u6B21\u67E5\u770B\u4E4B\u540E\u6709\u66F4\u65B0", "suggested": "\u5EFA\u8BAE", "now": "\u73B0\u5728", "inDuration": "{duration}\u540E", "earlier": "\u8FD8\u6709 {n} \u6761\u66F4\u65E9\u7684", "less": "\u6536\u8D77", "send": "\u53D1\u9001", "mentionPick": "\u63D0\u53CA\u67D0\u4EBA", "noMatch": "\u6CA1\u6709\u8FD9\u4E2A\u540D\u5B57", "cancel": "\u53D6\u6D88", "mentioned": "\u6709\u4EBA\u63D0\u5230\u4E86\u4F60", "unreadCount": "{n} \u6761\u672A\u8BFB" } } };

// src/time.js
var MINUTE = 6e4;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var UNITS = [["day", DAY], ["hour", HOUR], ["minute", MINUTE]];
function durationParts(ms, max = 2) {
  if (ms < MINUTE) return [{ unit: "second", n: Math.max(0, Math.ceil(ms / 1e3)) }];
  let rest = ms;
  const parts = [];
  for (const [unit, size] of UNITS) {
    const n = Math.floor(rest / size);
    rest -= n * size;
    if (n > 0 || parts.length > 0) parts.push({ unit, n });
  }
  return parts.filter((part) => part.n > 0).slice(0, max);
}
function unitText(n, unit, locale, display = "narrow") {
  return new Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay: display }).format(n);
}
function unitParts(n, unit, locale) {
  const parts = new Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay: "narrow" }).formatToParts(n);
  return {
    number: parts.filter((part) => part.type === "integer" || part.type === "group" || part.type === "decimal" || part.type === "fraction").map((part) => part.value).join(""),
    unit: parts.filter((part) => part.type === "unit").map((part) => part.value).join("").trim()
  };
}
function formatDuration(ms, locale, max = 2) {
  const texts = durationParts(ms, max).map(({ n, unit }) => unitText(n, unit, locale));
  return new Intl.ListFormat(locale, { type: "unit", style: "narrow" }).format(texts);
}
var DAY_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
function toTime(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return NaN;
  const day = DAY_ONLY.exec(value);
  if (day) return new Date(Number(day[1]), Number(day[2]) - 1, Number(day[3])).getTime();
  return /^\d{4}-\d{2}-\d{2}T/.test(value) ? Date.parse(value) : NaN;
}
function dayDistance(time, now) {
  const a = new Date(now);
  const b = new Date(time);
  return Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()) - new Date(a.getFullYear(), a.getMonth(), a.getDate())) / DAY);
}
function formatRelativeDay(value, now, locale, near = 13) {
  const time = toTime(value);
  if (!Number.isFinite(time)) return String(value ?? "");
  const days = dayDistance(time, now);
  if (days === 0 && !DAY_ONLY.test(String(value))) return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(time);
  if (Math.abs(days) <= near) return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(days, "day");
  const sameYear = new Date(time).getFullYear() === new Date(now).getFullYear();
  return new Intl.DateTimeFormat(locale, sameYear ? { month: "short", day: "numeric" } : { dateStyle: "medium" }).format(time);
}
var BUCKET_UNIT = { minutes: "minute", hours: "hour", days: "day", months: "month", years: "year" };
function formatAgo(bucket, locale) {
  const unit = BUCKET_UNIT[bucket.unit];
  return unit === void 0 ? null : new Intl.RelativeTimeFormat(locale, { numeric: "always", style: "short" }).format(-bucket.n, unit);
}
function formatFull(time, locale) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(time);
}

// src/shapes.js
var TONES = Object.freeze(["ok", "warn", "bad", "accent", "violet", "muted"]);
var SEGMENT_STATES = Object.freeze(["done", "current", "ready", "todo"]);
var TONE_COLOR = Object.freeze({
  ok: "var(--dsw-alias-state-success-primary)",
  warn: "var(--dsw-alias-state-warn-primary)",
  bad: "var(--dsw-alias-state-error-primary)",
  accent: "var(--dsw-alias-state-business-primary)",
  violet: "var(--dsw-alias-state-done-primary)",
  muted: "var(--dsw-alias-label-tertiary)"
});
var TAG_TONE = Object.freeze({ ok: "success", warn: "warning", bad: "danger", accent: "info", violet: "info", muted: "neutral" });
var toneColor = (tone) => TONE_COLOR[tone] ?? TONE_COLOR.muted;
var tagTone = (tone) => TAG_TONE[tone] ?? "neutral";
function sparkPath(values, width, height, { pad = 2, min, max } = {}) {
  const numbers = values.filter((v) => typeof v === "number" && Number.isFinite(v));
  if (numbers.length === 0 || width <= 0) return { line: "", area: "", last: null };
  const lo = min ?? Math.min(...numbers);
  const hi = max ?? Math.max(...numbers);
  const span = hi - lo || 1;
  const step = values.length > 1 ? (width - 2 * pad) / (values.length - 1) : 0;
  const x = (i) => values.length > 1 ? pad + i * step : width / 2;
  const y = (v) => pad + (height - 2 * pad) * (1 - (Math.min(hi, Math.max(lo, v)) - lo) / span);
  const runs = [[]];
  values.forEach((v, i) => {
    if (typeof v === "number" && Number.isFinite(v)) runs[runs.length - 1].push([x(i), y(v)]);
    else if (runs[runs.length - 1].length > 0) runs.push([]);
  });
  if (runs[runs.length - 1].length === 0) runs.pop();
  const trace = (points) => points.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join("");
  const line = runs.map(trace).join("");
  const area = runs.map((points) => `${trace(points)}L${points[points.length - 1][0].toFixed(1)} ${height}L${points[0][0].toFixed(1)} ${height}Z`).join("");
  const lastRun = runs[runs.length - 1];
  return { line, area, last: lastRun[lastRun.length - 1] };
}
function share(value, max) {
  return max > 0 && Number.isFinite(value) ? Math.min(1, Math.max(0, value / max)) : 0;
}

// src/client/change.js
var import_react = require("react");
var WASH_MS = 2e3;
function useWash(version, key) {
  const seen = (0, import_react.useRef)({ version, key });
  const [washing, setWashing] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
    const before = seen.current;
    seen.current = { version, key };
    if (before.version === version || before.key !== key) return void 0;
    setWashing((count) => count + 1);
    const timer = setTimeout(() => setWashing(0), WASH_MS);
    return () => clearTimeout(timer);
  }, [version, key]);
  return washing === 0 ? "" : washing % 2 === 1 ? "uk-wash" : "uk-wash uk-washAgain";
}
function Wash({ version, washKey, as = "div", className, children, ...rest }) {
  const wash = useWash(version, washKey);
  return (0, import_react.createElement)(as, { ...rest, className: [className, wash].filter(Boolean).join(" ") || void 0 }, children);
}
function createChange({ useWords }) {
  function JustNow() {
    const { t } = useWords();
    return (0, import_react.createElement)("span", { className: "uk-justNow" }, t("justNow"));
  }
  function NewDot() {
    const { t } = useWords();
    return (0, import_react.createElement)("span", { className: "uk-newDot", role: "img", "aria-label": t("newSince"), title: t("newSince") });
  }
  return { JustNow, NewDot };
}

// src/client/glyphs.js
var import_react2 = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// virtual:icons
var icons_default = { "calendar": [["path", { "d": "M8 2v3" }], ["path", { "d": "M16 2v3" }], ["rect", { "x": "3", "y": "3", "width": "18", "height": "18", "rx": "2" }], ["path", { "d": "M3 9h18" }]], "calendar-days": [["path", { "d": "M8 2v3" }], ["path", { "d": "M16 2v3" }], ["rect", { "x": "3", "y": "3", "width": "18", "height": "18", "rx": "2" }], ["path", { "d": "M3 9h18" }], ["path", { "d": "M8 13h.01" }], ["path", { "d": "M12 13h.01" }], ["path", { "d": "M16 13h.01" }], ["path", { "d": "M8 17h.01" }], ["path", { "d": "M12 17h.01" }], ["path", { "d": "M16 17h.01" }]], "calendar-check": [["path", { "d": "M8 2v3" }], ["path", { "d": "M16 2v3" }], ["rect", { "x": "3", "y": "3", "width": "18", "height": "18", "rx": "2" }], ["path", { "d": "M3 9h18" }], ["path", { "d": "m9 15 2 2 4-4" }]], "calendar-clock": [["path", { "d": "M16 14v2.2l1.6 1" }], ["path", { "d": "M16 2v3" }], ["path", { "d": "M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338" }], ["path", { "d": "M3 9h5.859" }], ["path", { "d": "M8 2v3" }], ["circle", { "cx": "16", "cy": "16", "r": "6" }]], "calendar-plus": [["path", { "d": "M16 18h6" }], ["path", { "d": "M16 2v3" }], ["path", { "d": "M19 15v6" }], ["path", { "d": "M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.3" }], ["path", { "d": "M3 9h18" }], ["path", { "d": "M8 2v3" }]], "clock": [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "M12 6v6l4 2" }]], "alarm-clock": [["circle", { "cx": "12", "cy": "13", "r": "8" }], ["path", { "d": "M12 9v4l2 2" }], ["path", { "d": "M5 3 2 6" }], ["path", { "d": "m22 6-3-3" }], ["path", { "d": "M6.38 18.7 4 21" }], ["path", { "d": "M17.64 18.67 20 21" }]], "hourglass": [["path", { "d": "M5 22h14" }], ["path", { "d": "M5 2h14" }], ["path", { "d": "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" }], ["path", { "d": "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" }]], "timer": [["line", { "x1": "10", "x2": "14", "y1": "2", "y2": "2" }], ["line", { "x1": "12", "x2": "15", "y1": "14", "y2": "11" }], ["circle", { "cx": "12", "cy": "14", "r": "8" }]], "history": [["path", { "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }], ["path", { "d": "M3 3v5h5" }], ["path", { "d": "M12 7v5l4 2" }]], "list-todo": [["path", { "d": "M13 5h8" }], ["path", { "d": "M13 12h8" }], ["path", { "d": "M13 19h8" }], ["path", { "d": "m3 17 2 2 4-4" }], ["rect", { "x": "3", "y": "4", "width": "6", "height": "6", "rx": "1" }]], "list-checks": [["path", { "d": "M13 5h8" }], ["path", { "d": "M13 12h8" }], ["path", { "d": "M13 19h8" }], ["path", { "d": "m3 17 2 2 4-4" }], ["path", { "d": "m3 7 2 2 4-4" }]], "square-check": [["rect", { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }], ["path", { "d": "m16 9-5.5 5.5L8 12" }]], "circle-check": [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "m16 9-5.5 5.5L8 12" }]], "flag": [["path", { "d": "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" }]], "plane": [["path", { "d": "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" }]], "plane-takeoff": [["path", { "d": "M2 22h20" }], ["path", { "d": "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" }]], "plane-landing": [["path", { "d": "M2 22h20" }], ["path", { "d": "M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z" }]], "luggage": [["path", { "d": "M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" }], ["path", { "d": "M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" }], ["path", { "d": "M10 20h4" }], ["circle", { "cx": "16", "cy": "20", "r": "2" }], ["circle", { "cx": "8", "cy": "20", "r": "2" }]], "ticket": [["path", { "d": "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" }], ["path", { "d": "M13 5v2" }], ["path", { "d": "M13 17v2" }], ["path", { "d": "M13 11v2" }]], "map": [["path", { "d": "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" }], ["path", { "d": "M15 5.764v15" }], ["path", { "d": "M9 3.236v15" }]], "map-pin": [["path", { "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }], ["circle", { "cx": "12", "cy": "10", "r": "3" }]], "compass": [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" }]], "navigation": [["polygon", { "points": "3 11 22 2 13 21 11 13 3 11" }]], "globe": [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }], ["path", { "d": "M2 12h20" }]], "train-front": [["path", { "d": "M8 3.1V7a4 4 0 0 0 8 0V3.1" }], ["path", { "d": "m9 15-1-1" }], ["path", { "d": "m15 15 1-1" }], ["path", { "d": "M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" }], ["path", { "d": "m8 19-2 3" }], ["path", { "d": "m16 19 2 3" }]], "bus": [["path", { "d": "M8 6v6" }], ["path", { "d": "M15 6v6" }], ["path", { "d": "M2 12h19.6" }], ["path", { "d": "M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" }], ["circle", { "cx": "7", "cy": "18", "r": "2" }], ["path", { "d": "M9 18h5" }], ["circle", { "cx": "16", "cy": "18", "r": "2" }]], "car": [["path", { "d": "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" }], ["circle", { "cx": "7", "cy": "17", "r": "2" }], ["path", { "d": "M9 17h6" }], ["circle", { "cx": "17", "cy": "17", "r": "2" }]], "bike": [["circle", { "cx": "18.5", "cy": "17.5", "r": "3.5" }], ["circle", { "cx": "5.5", "cy": "17.5", "r": "3.5" }], ["circle", { "cx": "15", "cy": "5", "r": "1" }], ["path", { "d": "M12 17.5V14l-3-3 4-3 2 3h2" }]], "footprints": [["path", { "d": "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" }], ["path", { "d": "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" }], ["path", { "d": "M16 17h4" }], ["path", { "d": "M4 13h4" }]], "hotel": [["path", { "d": "M10 22v-6.57" }], ["path", { "d": "M12 11h.01" }], ["path", { "d": "M12 7h.01" }], ["path", { "d": "M14 15.43V22" }], ["path", { "d": "M15 16a5 5 0 0 0-6 0" }], ["path", { "d": "M16 11h.01" }], ["path", { "d": "M16 7h.01" }], ["path", { "d": "M8 11h.01" }], ["path", { "d": "M8 7h.01" }], ["rect", { "x": "4", "y": "2", "width": "16", "height": "20", "rx": "2" }]], "id-card": [["path", { "d": "M13 19a4 4 0 00-8 0" }], ["path", { "d": "M16 10h2" }], ["path", { "d": "M16 14h2" }], ["circle", { "cx": "9", "cy": "12", "r": "3" }], ["rect", { "x": "2", "y": "5", "width": "20", "height": "14", "rx": "2" }]], "syringe": [["path", { "d": "m18 2 4 4" }], ["path", { "d": "m17 7 3-3" }], ["path", { "d": "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" }], ["path", { "d": "m9 11 4 4" }], ["path", { "d": "m5 19-3 3" }], ["path", { "d": "m14 4 6 6" }]], "pill": [["path", { "d": "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" }], ["path", { "d": "m8.5 8.5 7 7" }]], "heart-pulse": [["path", { "d": "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" }], ["path", { "d": "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" }]], "activity": [["path", { "d": "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" }]], "stethoscope": [["path", { "d": "M11 2v2" }], ["path", { "d": "M5 2v2" }], ["path", { "d": "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" }], ["path", { "d": "M8 15a6 6 0 0 0 12 0v-3" }], ["circle", { "cx": "20", "cy": "10", "r": "2" }]], "thermometer": [["path", { "d": "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }]], "bed": [["path", { "d": "M2 4v16" }], ["path", { "d": "M2 8h18a2 2 0 0 1 2 2v10" }], ["path", { "d": "M2 17h20" }], ["path", { "d": "M6 8v9" }]], "bed-double": [["path", { "d": "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" }], ["path", { "d": "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" }], ["path", { "d": "M12 4v6" }], ["path", { "d": "M2 18h20" }]], "moon": [["path", { "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" }]], "sun": [["circle", { "cx": "12", "cy": "12", "r": "4" }], ["path", { "d": "M12 2v2" }], ["path", { "d": "M12 20v2" }], ["path", { "d": "m4.93 4.93 1.41 1.41" }], ["path", { "d": "m17.66 17.66 1.41 1.41" }], ["path", { "d": "M2 12h2" }], ["path", { "d": "M20 12h2" }], ["path", { "d": "m6.34 17.66-1.41 1.41" }], ["path", { "d": "m19.07 4.93-1.41 1.41" }]], "sun-medium": [["circle", { "cx": "12", "cy": "12", "r": "4" }], ["path", { "d": "M12 3v1" }], ["path", { "d": "M12 20v1" }], ["path", { "d": "M3 12h1" }], ["path", { "d": "M20 12h1" }], ["path", { "d": "m18.364 5.636-.707.707" }], ["path", { "d": "m6.343 17.657-.707.707" }], ["path", { "d": "m5.636 5.636.707.707" }], ["path", { "d": "m17.657 17.657.707.707" }]], "sunrise": [["path", { "d": "M12 2v8" }], ["path", { "d": "m4.93 10.93 1.41 1.41" }], ["path", { "d": "M2 18h2" }], ["path", { "d": "M20 18h2" }], ["path", { "d": "m19.07 10.93-1.41 1.41" }], ["path", { "d": "M22 22H2" }], ["path", { "d": "m8 6 4-4 4 4" }], ["path", { "d": "M16 18a4 4 0 0 0-8 0" }]], "sunset": [["path", { "d": "M12 10V2" }], ["path", { "d": "m4.93 10.93 1.41 1.41" }], ["path", { "d": "M2 18h2" }], ["path", { "d": "M20 18h2" }], ["path", { "d": "m19.07 10.93-1.41 1.41" }], ["path", { "d": "M22 22H2" }], ["path", { "d": "m16 6-4 4-4-4" }], ["path", { "d": "M16 18a4 4 0 0 0-8 0" }]], "dumbbell": [["path", { "d": "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" }], ["path", { "d": "m2.5 21.5 1.4-1.4" }], ["path", { "d": "m20.1 3.9 1.4-1.4" }], ["path", { "d": "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" }], ["path", { "d": "m9.6 14.4 4.8-4.8" }]], "scale": [["path", { "d": "M12 3v18" }], ["path", { "d": "m19 8 3 8a5 5 0 0 1-6 0zV7" }], ["path", { "d": "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" }], ["path", { "d": "m5 8 3 8a5 5 0 0 1-6 0zV7" }], ["path", { "d": "M7 21h10" }]], "brain": [["path", { "d": "M12 18V5" }], ["path", { "d": "M15 13a4.17 4.17 0 01-3-4 4.17 4.17 0 01-3 4" }], ["path", { "d": "M17.707 6.294A3 3 0 1012 5a3 3 0 10-5.707 1.294" }], ["path", { "d": "M17.996 5.125a4 4 0 012.526 5.77" }], ["path", { "d": "M18 18a4 4 0 002-7.465" }], ["path", { "d": "M19.967 17.482a4 4 0 11-7.967.517 4 4 0 11-7.967-.517" }], ["path", { "d": "M6 18a4 4 0 01-2-7.465" }], ["path", { "d": "M6.004 5.125a4 4 0 00-2.526 5.77" }]], "droplet": [["path", { "d": "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" }]], "droplets": [["path", { "d": "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" }], ["path", { "d": "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" }]], "smile": [["path", { "d": "M15 10V9" }], ["path", { "d": "M16.472 15a6 6 0 01-8.943 0" }], ["path", { "d": "M9 10V9" }], ["circle", { "cx": "12", "cy": "12", "r": "10" }]], "utensils": [["path", { "d": "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" }], ["path", { "d": "M7 2v20" }], ["path", { "d": "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" }]], "utensils-crossed": [["path", { "d": "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" }], ["path", { "d": "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" }], ["path", { "d": "m2.1 21.8 6.4-6.3" }], ["path", { "d": "m19 5-7 7" }]], "sandwich": [["path", { "d": "m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777" }], ["path", { "d": "M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25" }], ["path", { "d": "M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9" }], ["path", { "d": "m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" }], ["rect", { "width": "20", "height": "4", "x": "2", "y": "11", "rx": "1" }]], "soup": [["path", { "d": "M11.248 3c.273.1.808.53.747 1.36-.05.83-.938 1.2-.989 2.02-.06.78.333 1.24.727 1.62" }], ["path", { "d": "M16.252 3c.268.1.794.53.745 1.36-.06.83-.923 1.2-.993 2.02-.05.78.338 1.24.725 1.62" }], ["path", { "d": "M19.5 12 22 6" }], ["path", { "d": "M4 12a1 1 0 00-.99 1.133A9 9 0 0012 21a9 9 0 008.99-7.867A1 1 0 0020 12z" }], ["path", { "d": "M6.252 3c.268.1.794.53.745 1.36-.06.83-.923 1.2-.993 2.02-.05.78.338 1.24.735 1.62" }], ["path", { "d": "M7 21h10" }]], "salad": [["path", { "d": "M19.496 12a2.5 2.5 0 00.399-2.214A2 2 0 0020.32 6.5 2 2 0 0019 3a2 2 0 00-1.5.68 2 2 0 00-3.287.424 2.5 2.5 0 00-3.189 2.06A3 3 0 0012 12l4-4" }], ["path", { "d": "M4 12a1 1 0 00-.99 1.133A9 9 0 0012 21a9 9 0 008.99-7.867A1 1 0 0020 12z" }], ["path", { "d": "M7 21h10" }], ["path", { "d": "M9.85 6.907A3.5 3.5 0 005.05 12" }]], "apple": [["path", { "d": "M12 6.528V3a1 1 0 0 1 1-1h0" }], ["path", { "d": "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21" }]], "milk": [["path", { "d": "M8 2h8" }], ["path", { "d": "M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" }], ["path", { "d": "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" }]], "coffee": [["path", { "d": "M10 2v2" }], ["path", { "d": "M14 2v2" }], ["path", { "d": "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" }], ["path", { "d": "M6 2v2" }]], "cup-soda": [["path", { "d": "m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" }], ["path", { "d": "M5 8h14" }], ["path", { "d": "M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" }], ["path", { "d": "m12 8 1-6h2" }]], "egg": [["path", { "d": "M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12" }]], "fish": [["path", { "d": "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" }], ["path", { "d": "M18 12v.5" }], ["path", { "d": "M16 17.93a9.77 9.77 0 0 1 0-11.86" }], ["path", { "d": "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" }], ["path", { "d": "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" }], ["path", { "d": "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" }]], "beef": [["path", { "d": "M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3" }], ["path", { "d": "m18.5 6 1.754 3.5a6.48 6.48 0 0 1-1.854 8.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5" }], ["circle", { "cx": "12.5", "cy": "8.5", "r": "2.5" }]], "pizza": [["path", { "d": "m12 14-1 1" }], ["path", { "d": "m13.75 18.25-1.25 1.42" }], ["path", { "d": "M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12" }], ["path", { "d": "M18.8 9.3a1 1 0 0 0 2.1 7.7" }], ["path", { "d": "M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z" }]], "cookie": [["path", { "d": "M11 17h.01" }], ["path", { "d": "M11.496 2c.324-.016.558.292.529.615a4 4 0 004.235 4.368.713.713 0 01.758.757 4 4 0 004.366 4.237c.323-.03.63.204.614.527a10 10 0 01-2.915 6.566A1 1 0 114.93 4.918 10 10 0 0111.496 2" }], ["path", { "d": "M12 12h.01" }], ["path", { "d": "M16 16h.01" }], ["path", { "d": "M16 3h.01" }], ["path", { "d": "M21 4h.01" }], ["path", { "d": "M21 8h.01" }], ["path", { "d": "M7 14h.01" }], ["path", { "d": "M9 8h.01" }]], "carrot": [["path", { "d": "M15 16a1 1 0 0 0-7-7q-4 4-5.987 12.385a.5.5 0 0 0 .602.602Q11 20 15 16l-3-3" }], ["path", { "d": "M15 9q4 4 7 0-3-4-7 0 4-4 0-7-4 3 0 7" }], ["path", { "d": "m8 15-2.58-2.58" }]], "croissant": [["path", { "d": "M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487" }], ["path", { "d": "M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132" }], ["path", { "d": "M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42" }], ["path", { "d": "M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14" }], ["path", { "d": "M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676" }]], "cake-slice": [["path", { "d": "M16 13H3" }], ["path", { "d": "M16 17H3" }], ["path", { "d": "m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6" }], ["circle", { "cx": "9", "cy": "7", "r": "2" }]], "wheat": [["path", { "d": "M2 22 16 8" }], ["path", { "d": "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }], ["path", { "d": "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }], ["path", { "d": "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }], ["path", { "d": "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" }], ["path", { "d": "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" }], ["path", { "d": "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" }], ["path", { "d": "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" }]], "refrigerator": [["path", { "d": "M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" }], ["path", { "d": "M5 10h14" }], ["path", { "d": "M15 7v6" }]], "cooking-pot": [["path", { "d": "M2 12h20" }], ["path", { "d": "M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" }], ["path", { "d": "m4 8 16-4" }], ["path", { "d": "m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" }]], "chef-hat": [["path", { "d": "M10 11v5" }], ["path", { "d": "M14 11v5" }], ["path", { "d": "M6 12.65c0-.457-.316-.844-.727-1.041A4 4 0 017.52 4.034a1.53 1.53 0 001.367-.547 4 4 0 016.225 0 1.53 1.53 0 001.367.547 4 4 0 012.248 7.575c-.411.197-.727.584-.727 1.04V19a2 2 0 01-2 2H8a2 2 0 01-2-2z" }], ["path", { "d": "M6 16h12" }]], "shopping-cart": [["path", { "d": "m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" }], ["path", { "d": "M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" }], ["circle", { "cx": "18", "cy": "20", "r": "2" }], ["circle", { "cx": "8", "cy": "20", "r": "2" }]], "shopping-basket": [["path", { "d": "m15 11-1 9" }], ["path", { "d": "m19 11-4-7" }], ["path", { "d": "M2 11h20" }], ["path", { "d": "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" }], ["path", { "d": "M4.5 15.5h15" }], ["path", { "d": "m5 11 4-7" }], ["path", { "d": "m9 11 1 9" }]], "wallet": [["path", { "d": "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" }], ["path", { "d": "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" }]], "credit-card": [["rect", { "width": "20", "height": "14", "x": "2", "y": "5", "rx": "2" }], ["line", { "x1": "2", "x2": "22", "y1": "10", "y2": "10" }], ["path", { "d": "M6 14h2" }]], "banknote": [["rect", { "width": "20", "height": "12", "x": "2", "y": "6", "rx": "2" }], ["circle", { "cx": "12", "cy": "12", "r": "2" }], ["path", { "d": "M6 12h.01M18 12h.01" }]], "coins": [["path", { "d": "M13.744 17.736a6 6 0 1 1-7.48-7.48" }], ["path", { "d": "M15 6h1v4" }], ["path", { "d": "m6.134 14.768.866-.5 2 3.464" }], ["circle", { "cx": "16", "cy": "8", "r": "6" }]], "piggy-bank": [["path", { "d": "M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" }], ["path", { "d": "M16 10h.01" }], ["path", { "d": "M2 8v1a2 2 0 0 0 2 2h1" }]], "receipt": [["path", { "d": "M12 17V7" }], ["path", { "d": "M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" }], ["path", { "d": "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" }]], "landmark": [["path", { "d": "M10 18v-7" }], ["path", { "d": "M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" }], ["path", { "d": "M14 18v-7" }], ["path", { "d": "M18 18v-7" }], ["path", { "d": "M3 22h18" }], ["path", { "d": "M6 18v-7" }]], "trending-up": [["path", { "d": "M16 7h6v6" }], ["path", { "d": "m22 7-8.5 8.5-5-5L2 17" }]], "trending-down": [["path", { "d": "M16 17h6v-6" }], ["path", { "d": "m22 17-8.5-8.5-5 5L2 7" }]], "chart-line": [["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }], ["path", { "d": "m19 9-5 5-4-4-3 3" }]], "chart-column": [["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }], ["path", { "d": "M18 17V9" }], ["path", { "d": "M13 17V5" }], ["path", { "d": "M8 17v-3" }]], "chart-pie": [["path", { "d": "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" }], ["path", { "d": "M21.21 15.89A10 10 0 1 1 8 2.83" }]], "percent": [["line", { "x1": "19", "x2": "5", "y1": "5", "y2": "19" }], ["circle", { "cx": "6.5", "cy": "6.5", "r": "2.5" }], ["circle", { "cx": "17.5", "cy": "17.5", "r": "2.5" }]], "hand-coins": [["path", { "d": "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" }], ["path", { "d": "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" }], ["path", { "d": "m2 16 6 6" }], ["circle", { "cx": "16", "cy": "9", "r": "2.9" }], ["circle", { "cx": "6", "cy": "5", "r": "3" }]], "badge-percent": [["path", { "d": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }], ["path", { "d": "m15 9-6 6" }], ["path", { "d": "M9 9h.01" }], ["path", { "d": "M15 15h.01" }]], "house": [["path", { "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }], ["path", { "d": "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }]], "lock": [["rect", { "width": "18", "height": "11", "x": "3", "y": "11", "rx": "2", "ry": "2" }], ["path", { "d": "M7 11V7a5 5 0 0 1 10 0v4" }]], "lock-open": [["rect", { "width": "18", "height": "11", "x": "3", "y": "11", "rx": "2", "ry": "2" }], ["path", { "d": "M7 11V7a5 5 0 0 1 9.9-1" }]], "key-round": [["path", { "d": "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" }], ["circle", { "cx": "16.5", "cy": "7.5", "r": ".5", "fill": "currentColor" }]], "door-open": [["path", { "d": "M10 21H2" }], ["path", { "d": "M10 3H7a2 2 0 00-2 2v16" }], ["path", { "d": "M14 12h.01" }], ["path", { "d": "M19 21V5a2 2 0 00-1.675-1.974l-6.163-1.013A1 1 0 0010 3v18a1 1 0 001.124.992z" }], ["path", { "d": "M22 21h-3" }]], "lamp": [["path", { "d": "M12 12v6" }], ["path", { "d": "M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z" }], ["path", { "d": "M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" }]], "lightbulb": [["path", { "d": "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" }], ["path", { "d": "M9 18h6" }], ["path", { "d": "M10 22h4" }]], "plug": [["path", { "d": "M12 22v-5" }], ["path", { "d": "M15 8V2" }], ["path", { "d": "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z" }], ["path", { "d": "M9 8V2" }]], "zap": [["path", { "d": "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" }]], "fan": [["path", { "d": "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z" }], ["path", { "d": "M12 12v.01" }]], "wifi": [["path", { "d": "M12 20h.01" }], ["path", { "d": "M2 8.82a15 15 0 0 1 20 0" }], ["path", { "d": "M5 12.859a10 10 0 0 1 14 0" }], ["path", { "d": "M8.5 16.429a5 5 0 0 1 7 0" }]], "router": [["rect", { "width": "20", "height": "8", "x": "2", "y": "14", "rx": "2" }], ["path", { "d": "M6.01 18H6" }], ["path", { "d": "M10.01 18H10" }], ["path", { "d": "M15 10v4" }], ["path", { "d": "M17.84 7.17a4 4 0 0 0-5.66 0" }], ["path", { "d": "M20.66 4.34a8 8 0 0 0-11.31 0" }]], "tv": [["path", { "d": "m17 2-5 5-5-5" }], ["rect", { "width": "20", "height": "15", "x": "2", "y": "7", "rx": "2" }]], "washing-machine": [["path", { "d": "M3 6h3" }], ["path", { "d": "M17 6h.01" }], ["rect", { "width": "18", "height": "20", "x": "3", "y": "2", "rx": "2" }], ["circle", { "cx": "12", "cy": "13", "r": "5" }], ["path", { "d": "M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" }]], "sofa": [["path", { "d": "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" }], ["path", { "d": "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" }], ["path", { "d": "M4 18v2" }], ["path", { "d": "M20 18v2" }], ["path", { "d": "M12 4v9" }]], "shower-head": [["path", { "d": "m4 4 2.5 2.5" }], ["path", { "d": "M13.5 6.5a4.95 4.95 0 0 0-7 7" }], ["path", { "d": "M15 5 5 15" }], ["path", { "d": "M14 17v.01" }], ["path", { "d": "M10 16v.01" }], ["path", { "d": "M13 13v.01" }], ["path", { "d": "M16 10v.01" }], ["path", { "d": "M11 20v.01" }], ["path", { "d": "M17 14v.01" }], ["path", { "d": "M20 11v.01" }]], "trash-2": [["path", { "d": "M10 11v6" }], ["path", { "d": "M14 11v6" }], ["path", { "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }], ["path", { "d": "M3 6h18" }], ["path", { "d": "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]], "package": [["path", { "d": "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" }], ["path", { "d": "M12 22V12" }], ["polyline", { "points": "3.29 7 12 12 20.71 7" }], ["path", { "d": "m7.5 4.27 9 5.15" }]], "package-check": [["path", { "d": "M12 22V12" }], ["path", { "d": "m16 17 2 2 4-4" }], ["path", { "d": "M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753" }], ["path", { "d": "M3.29 7 12 12l8.71-5" }], ["path", { "d": "m7.5 4.27 8.997 5.148" }]], "truck": [["path", { "d": "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" }], ["path", { "d": "M15 18H9" }], ["path", { "d": "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" }], ["circle", { "cx": "17", "cy": "18", "r": "2" }], ["circle", { "cx": "7", "cy": "18", "r": "2" }]], "mailbox": [["path", { "d": "M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" }], ["polyline", { "points": "15,9 18,9 18,11" }], ["path", { "d": "M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2" }], ["line", { "x1": "6", "x2": "7", "y1": "10", "y2": "10" }]], "cloud": [["path", { "d": "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" }]], "cloud-sun": [["path", { "d": "M12 2v2" }], ["path", { "d": "m4.93 4.93 1.41 1.41" }], ["path", { "d": "M20 12h2" }], ["path", { "d": "m19.07 4.93-1.41 1.41" }], ["path", { "d": "M15.947 12.65a4 4 0 0 0-5.925-4.128" }], ["path", { "d": "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" }]], "cloud-moon": [["path", { "d": "M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z" }], ["path", { "d": "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36" }]], "cloud-rain": [["path", { "d": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }], ["path", { "d": "M16 14v6" }], ["path", { "d": "M8 14v6" }], ["path", { "d": "M12 16v6" }]], "cloud-drizzle": [["path", { "d": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }], ["path", { "d": "M8 19v1" }], ["path", { "d": "M8 14v1" }], ["path", { "d": "M16 19v1" }], ["path", { "d": "M16 14v1" }], ["path", { "d": "M12 21v1" }], ["path", { "d": "M12 16v1" }]], "cloud-snow": [["path", { "d": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }], ["path", { "d": "M8 15h.01" }], ["path", { "d": "M8 19h.01" }], ["path", { "d": "M12 17h.01" }], ["path", { "d": "M12 21h.01" }], ["path", { "d": "M16 15h.01" }], ["path", { "d": "M16 19h.01" }]], "cloud-lightning": [["path", { "d": "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" }], ["path", { "d": "m13 12-3 5h4l-3 5" }]], "cloud-fog": [["path", { "d": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }], ["path", { "d": "M16 17H7" }], ["path", { "d": "M17 21H9" }]], "snowflake": [["path", { "d": "m10 20-1.25-2.5L6 18" }], ["path", { "d": "M10 4 8.75 6.5 6 6" }], ["path", { "d": "m14 20 1.25-2.5L18 18" }], ["path", { "d": "m14 4 1.25 2.5L18 6" }], ["path", { "d": "m17 21-3-6h-4" }], ["path", { "d": "m17 3-3 6 1.5 3" }], ["path", { "d": "M2 12h6.5L10 9" }], ["path", { "d": "m20 10-1.5 2 1.5 2" }], ["path", { "d": "M22 12h-6.5L14 15" }], ["path", { "d": "m4 10 1.5 2L4 14" }], ["path", { "d": "m7 21 3-6-1.5-3" }], ["path", { "d": "m7 3 3 6h4" }]], "wind": [["path", { "d": "M12.8 19.6A2 2 0 1 0 14 16H2" }], ["path", { "d": "M17.5 8a2.5 2.5 0 1 1 2 4H2" }], ["path", { "d": "M9.8 4.4A2 2 0 1 1 11 8H2" }]], "umbrella": [["path", { "d": "M12 13v7a2 2 0 0 0 4 0" }], ["path", { "d": "M12 2v2" }], ["path", { "d": "M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z" }]], "rainbow": [["path", { "d": "M22 17a10 10 0 0 0-20 0" }], ["path", { "d": "M6 17a6 6 0 0 1 12 0" }], ["path", { "d": "M10 17a2 2 0 0 1 4 0" }]], "mail": [["path", { "d": "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }], ["rect", { "x": "2", "y": "4", "width": "20", "height": "16", "rx": "2" }]], "mail-open": [["path", { "d": "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" }], ["path", { "d": "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" }]], "message-square": [["path", { "d": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" }]], "message-circle": [["path", { "d": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" }]], "phone": [["path", { "d": "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" }]], "smartphone": [["rect", { "width": "14", "height": "20", "x": "5", "y": "2", "rx": "2", "ry": "2" }], ["path", { "d": "M12 18h.01" }]], "bell": [["path", { "d": "M10.268 21a2 2 0 0 0 3.464 0" }], ["path", { "d": "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" }]], "bell-ring": [["path", { "d": "M10.268 21a2 2 0 0 0 3.464 0" }], ["path", { "d": "M22 8c0-2.3-.8-4.3-2-6" }], ["path", { "d": "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" }], ["path", { "d": "M4 2C2.8 3.7 2 5.7 2 8" }]], "bell-plus": [["path", { "d": "M10.268 21a2 2 0 0 0 3.464 0" }], ["path", { "d": "M15 8h6" }], ["path", { "d": "M18 5v6" }], ["path", { "d": "M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332" }]], "send": [["path", { "d": "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" }], ["path", { "d": "m21.854 2.147-10.94 10.939" }]], "inbox": [["polyline", { "points": "22 12 16 12 14 15 10 15 8 12 2 12" }], ["path", { "d": "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" }]], "at-sign": [["circle", { "cx": "12", "cy": "12", "r": "4" }], ["path", { "d": "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" }]], "hash": [["line", { "x1": "4", "x2": "20", "y1": "9", "y2": "9" }], ["line", { "x1": "4", "x2": "20", "y1": "15", "y2": "15" }], ["line", { "x1": "10", "x2": "8", "y1": "3", "y2": "21" }], ["line", { "x1": "16", "x2": "14", "y1": "3", "y2": "21" }]], "newspaper": [["path", { "d": "M15 18h-5" }], ["path", { "d": "M18 14h-8" }], ["path", { "d": "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" }], ["rect", { "width": "8", "height": "4", "x": "10", "y": "6", "rx": "1" }]], "rss": [["path", { "d": "M4 11a9 9 0 0 1 9 9" }], ["path", { "d": "M4 4a16 16 0 0 1 16 16" }], ["circle", { "cx": "5", "cy": "19", "r": "1" }]], "megaphone": [["path", { "d": "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" }], ["path", { "d": "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" }], ["path", { "d": "M8 6v8" }]], "radio-tower": [["path", { "d": "M4.9 16.1C1 12.2 1 5.8 4.9 1.9" }], ["path", { "d": "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" }], ["circle", { "cx": "12", "cy": "9", "r": "2" }], ["path", { "d": "M16.2 4.8c2 2 2.26 5.11.8 7.47" }], ["path", { "d": "M19.1 1.9a9.96 9.96 0 0 1 0 14.1" }], ["path", { "d": "M9.5 18h5" }], ["path", { "d": "m8 22 4-11 4 11" }]], "briefcase": [["path", { "d": "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" }], ["rect", { "width": "20", "height": "14", "x": "2", "y": "6", "rx": "2" }]], "laptop": [["path", { "d": "M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z" }], ["path", { "d": "M20.054 15.987H3.946" }]], "monitor": [["rect", { "width": "20", "height": "14", "x": "2", "y": "3", "rx": "2" }], ["line", { "x1": "8", "x2": "16", "y1": "21", "y2": "21" }], ["line", { "x1": "12", "x2": "12", "y1": "17", "y2": "21" }]], "server": [["rect", { "width": "20", "height": "8", "x": "2", "y": "2", "rx": "2", "ry": "2" }], ["rect", { "width": "20", "height": "8", "x": "2", "y": "14", "rx": "2", "ry": "2" }], ["line", { "x1": "6", "x2": "6.01", "y1": "6", "y2": "6" }], ["line", { "x1": "6", "x2": "6.01", "y1": "18", "y2": "18" }]], "hard-drive": [["path", { "d": "M10 16h.01" }], ["path", { "d": "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" }], ["path", { "d": "M21.946 12.013H2.054" }], ["path", { "d": "M6 16h.01" }]], "cpu": [["path", { "d": "M12 20v2" }], ["path", { "d": "M12 2v2" }], ["path", { "d": "M17 20v2" }], ["path", { "d": "M17 2v2" }], ["path", { "d": "M2 12h2" }], ["path", { "d": "M2 17h2" }], ["path", { "d": "M2 7h2" }], ["path", { "d": "M20 12h2" }], ["path", { "d": "M20 17h2" }], ["path", { "d": "M20 7h2" }], ["path", { "d": "M7 20v2" }], ["path", { "d": "M7 2v2" }], ["rect", { "x": "4", "y": "4", "width": "16", "height": "16", "rx": "2" }], ["rect", { "x": "8", "y": "8", "width": "8", "height": "8", "rx": "1" }]], "memory-stick": [["path", { "d": "M12 12v-2" }], ["path", { "d": "M12 18v-2" }], ["path", { "d": "M16 12v-2" }], ["path", { "d": "M16 18v-2" }], ["path", { "d": "M2 11h1.5" }], ["path", { "d": "M20 18v-2" }], ["path", { "d": "M20.5 11H22" }], ["path", { "d": "M4 18v-2" }], ["path", { "d": "M8 12v-2" }], ["path", { "d": "M8 18v-2" }], ["rect", { "x": "2", "y": "6", "width": "20", "height": "10", "rx": "2" }]], "database": [["ellipse", { "cx": "12", "cy": "5", "rx": "9", "ry": "3" }], ["path", { "d": "M3 5V19A9 3 0 0 0 21 19V5" }], ["path", { "d": "M3 12A9 3 0 0 0 21 12" }]], "code": [["path", { "d": "m16 18 6-6-6-6" }], ["path", { "d": "m8 6-6 6 6 6" }]], "terminal": [["path", { "d": "M12 19h8" }], ["path", { "d": "m4 17 6-6-6-6" }]], "git-pull-request": [["circle", { "cx": "18", "cy": "18", "r": "3" }], ["circle", { "cx": "6", "cy": "6", "r": "3" }], ["path", { "d": "M13 6h3a2 2 0 0 1 2 2v7" }], ["line", { "x1": "6", "x2": "6", "y1": "9", "y2": "21" }]], "git-branch": [["path", { "d": "M15 6a9 9 0 0 0-9 9V3" }], ["circle", { "cx": "18", "cy": "6", "r": "3" }], ["circle", { "cx": "6", "cy": "18", "r": "3" }]], "bot": [["path", { "d": "M12 8V4H8" }], ["rect", { "width": "16", "height": "12", "x": "4", "y": "8", "rx": "2" }], ["path", { "d": "M2 14h2" }], ["path", { "d": "M20 14h2" }], ["path", { "d": "M15 13v2" }], ["path", { "d": "M9 13v2" }]], "sparkles": [["path", { "d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" }], ["path", { "d": "M20 2v4" }], ["path", { "d": "M22 4h-4" }], ["circle", { "cx": "4", "cy": "20", "r": "2" }]], "sparkle": [["path", { "d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" }]], "wrench": [["path", { "d": "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" }]], "settings": [["path", { "d": "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }], ["circle", { "cx": "12", "cy": "12", "r": "3" }]], "shield": [["path", { "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }]], "shield-check": [["path", { "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }], ["path", { "d": "m9 12 2 2 4-4" }]], "shield-alert": [["path", { "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }], ["path", { "d": "M12 8v4" }], ["path", { "d": "M12 16h.01" }]], "key": [["path", { "d": "m2 21 9.6-9.6" }], ["path", { "d": "m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19" }], ["circle", { "cx": "15.5", "cy": "7.5", "r": "5.5" }]], "file-text": [["path", { "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" }], ["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }], ["path", { "d": "M10 9H8" }], ["path", { "d": "M16 13H8" }], ["path", { "d": "M16 17H8" }]], "files": [["path", { "d": "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" }], ["path", { "d": "M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z" }], ["path", { "d": "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1" }]], "folder": [["path", { "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" }]], "book-open": [["path", { "d": "M12 5v16" }], ["path", { "d": "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" }]], "graduation-cap": [["path", { "d": "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" }], ["path", { "d": "M22 10v6" }], ["path", { "d": "M6 12.5V16a6 3 0 0 0 12 0v-3.5" }]], "notebook-pen": [["path", { "d": "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" }], ["path", { "d": "M2 6h4" }], ["path", { "d": "M2 10h4" }], ["path", { "d": "M2 14h4" }], ["path", { "d": "M2 18h4" }], ["path", { "d": "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" }]], "gauge": [["path", { "d": "m12 14 4-4" }], ["path", { "d": "M3.34 19a10 10 0 1 1 17.32 0" }]], "battery": [["path", { "d": "M 22 14 L 22 10" }], ["rect", { "x": "2", "y": "6", "width": "16", "height": "12", "rx": "2" }]], "battery-low": [["path", { "d": "M22 14v-4" }], ["path", { "d": "M6 14v-4" }], ["rect", { "x": "2", "y": "6", "width": "16", "height": "12", "rx": "2" }]], "refresh-cw": [["path", { "d": "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }], ["path", { "d": "M21 3v5h-5" }], ["path", { "d": "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }], ["path", { "d": "M8 16H3v5" }]], "rotate-ccw": [["path", { "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }], ["path", { "d": "M3 3v5h5" }]], "eye": [["path", { "d": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }], ["circle", { "cx": "12", "cy": "12", "r": "3" }]], "search": [["path", { "d": "m21 21-4.34-4.34" }], ["circle", { "cx": "11", "cy": "11", "r": "8" }]], "link": [["path", { "d": "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }], ["path", { "d": "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" }]], "external-link": [["path", { "d": "M15 3h6v6" }], ["path", { "d": "M10 14 21 3" }], ["path", { "d": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }]], "download": [["path", { "d": "M12 15V3" }], ["path", { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }], ["path", { "d": "m7 10 5 5 5-5" }]], "upload": [["path", { "d": "M12 3v12" }], ["path", { "d": "m17 8-5-5-5 5" }], ["path", { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }]], "square-kanban": [["rect", { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }], ["path", { "d": "M8 7v7" }], ["path", { "d": "M12 7v4" }], ["path", { "d": "M16 7v9" }]], "play": [["path", { "d": "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" }]], "circle": [["circle", { "cx": "12", "cy": "12", "r": "10" }]], "circle-alert": [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["line", { "x1": "12", "x2": "12", "y1": "8", "y2": "12" }], ["line", { "x1": "12", "x2": "12.01", "y1": "16", "y2": "16" }]], "triangle-alert": [["path", { "d": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }], ["path", { "d": "M12 9v4" }], ["path", { "d": "M12 17h.01" }]], "circle-x": [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "m15 9-6 6" }], ["path", { "d": "m9 9 6 6" }]], "info": [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "M12 16v-4" }], ["path", { "d": "M12 8h.01" }]], "circle-help": [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["path", { "d": "M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5" }], ["path", { "d": "M12 17h.01" }]], "circle-pause": [["circle", { "cx": "12", "cy": "12", "r": "10" }], ["line", { "x1": "10", "x2": "10", "y1": "15", "y2": "9" }], ["line", { "x1": "14", "x2": "14", "y1": "15", "y2": "9" }]], "star": [["path", { "d": "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" }]], "heart": [["path", { "d": "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" }]], "heart-handshake": [["path", { "d": "M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762" }]], "gift": [["path", { "d": "M12 7v14" }], ["path", { "d": "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" }], ["path", { "d": "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" }], ["rect", { "x": "3", "y": "7", "width": "18", "height": "4", "rx": "1" }]], "thumbs-up": [["path", { "d": "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" }], ["path", { "d": "M7 10v12" }]], "thumbs-down": [["path", { "d": "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" }], ["path", { "d": "M17 14V2" }]], "music": [["path", { "d": "M21 16V3a1 1 0 0 0-1.28-.96l-10 2.917a1 1 0 0 0-.72.96V19" }], ["circle", { "cx": "18", "cy": "16", "r": "3" }], ["circle", { "cx": "6", "cy": "19", "r": "3" }]], "film": [["rect", { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }], ["path", { "d": "M7 3v18" }], ["path", { "d": "M3 7.5h4" }], ["path", { "d": "M3 12h18" }], ["path", { "d": "M3 16.5h4" }], ["path", { "d": "M17 3v18" }], ["path", { "d": "M17 7.5h4" }], ["path", { "d": "M17 16.5h4" }]], "clapperboard": [["path", { "d": "m12.296 3.464 3.02 3.956" }], ["path", { "d": "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z" }], ["path", { "d": "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }], ["path", { "d": "m6.18 5.276 3.1 3.899" }]], "gamepad-2": [["line", { "x1": "6", "x2": "10", "y1": "11", "y2": "11" }], ["line", { "x1": "8", "x2": "8", "y1": "9", "y2": "13" }], ["line", { "x1": "15", "x2": "15.01", "y1": "12", "y2": "12" }], ["line", { "x1": "18", "x2": "18.01", "y1": "10", "y2": "10" }], ["path", { "d": "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" }]], "monitor-play": [["path", { "d": "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" }], ["path", { "d": "M12 17v4" }], ["path", { "d": "M8 21h8" }], ["rect", { "x": "2", "y": "3", "width": "20", "height": "14", "rx": "2" }]], "headphones": [["path", { "d": "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" }]], "camera": [["path", { "d": "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" }], ["circle", { "cx": "12", "cy": "13", "r": "3" }]], "image": [["rect", { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2", "ry": "2" }], ["circle", { "cx": "9", "cy": "9", "r": "2" }], ["path", { "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]], "palette": [["path", { "d": "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" }], ["circle", { "cx": "13.5", "cy": "6.5", "r": ".5", "fill": "currentColor" }], ["circle", { "cx": "17.5", "cy": "10.5", "r": ".5", "fill": "currentColor" }], ["circle", { "cx": "6.5", "cy": "12.5", "r": ".5", "fill": "currentColor" }], ["circle", { "cx": "8.5", "cy": "7.5", "r": ".5", "fill": "currentColor" }]], "book": [["path", { "d": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }]], "bookmark": [["path", { "d": "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" }]], "users": [["path", { "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }], ["path", { "d": "M16 3.128a4 4 0 0 1 0 7.744" }], ["path", { "d": "M22 21v-2a4 4 0 0 0-3-3.87" }], ["circle", { "cx": "9", "cy": "7", "r": "4" }]], "user": [["path", { "d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }], ["circle", { "cx": "12", "cy": "7", "r": "4" }]], "baby": [["path", { "d": "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" }], ["path", { "d": "M15 12h.01" }], ["path", { "d": "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" }], ["path", { "d": "M9 12h.01" }]], "cat": [["path", { "d": "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" }], ["path", { "d": "M8 14v.5" }], ["path", { "d": "M16 14v.5" }], ["path", { "d": "M11.25 16.25h1.5L12 17l-.75-.75Z" }]], "dog": [["path", { "d": "M11.25 16.25h1.5L12 17z" }], ["path", { "d": "M16 14v.5" }], ["path", { "d": "M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309" }], ["path", { "d": "M8 14v.5" }], ["path", { "d": "M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" }]], "paw-print": [["circle", { "cx": "11", "cy": "4", "r": "2" }], ["circle", { "cx": "18", "cy": "8", "r": "2" }], ["circle", { "cx": "20", "cy": "16", "r": "2" }], ["path", { "d": "M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" }]], "leaf": [["path", { "d": "M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20" }], ["path", { "d": "M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13" }]], "flower-2": [["path", { "d": "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" }], ["circle", { "cx": "12", "cy": "8", "r": "2" }], ["path", { "d": "M12 10v12" }], ["path", { "d": "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" }], ["path", { "d": "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" }]], "tree-pine": [["path", { "d": "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" }], ["path", { "d": "M12 22v-3" }]], "shirt": [["path", { "d": "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" }]], "scissors": [["circle", { "cx": "6", "cy": "6", "r": "3" }], ["path", { "d": "M8.12 8.12 12 12" }], ["path", { "d": "M20 4 8.12 15.88" }], ["circle", { "cx": "6", "cy": "18", "r": "3" }], ["path", { "d": "M14.8 14.8 20 20" }]] };

// src/client/glyphs.js
var ICON_NAMES = Object.freeze(Object.keys(icons_default));
function Icon({ name: name2, size = 16, tone, className }) {
  const nodes = icons_default[name2];
  if (nodes === void 0) return null;
  return (0, import_react2.createElement)("svg", {
    className: className ? `uk-icon ${className}` : "uk-icon",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: "false",
    style: tone ? { color: toneColor(tone) } : void 0
  }, nodes.map(([tag, attrs], i) => (0, import_react2.createElement)(tag, { key: i, ...attrs })));
}
function Tile({ icon, tone = "muted", size = 30, className }) {
  return (0, import_react2.createElement)("span", {
    className: className ? `uk-tile ${className}` : "uk-tile",
    style: { "--uk-size": `${size}px`, color: toneColor(tone) },
    "aria-hidden": true
  }, icon && (0, import_react2.createElement)(Icon, { name: icon, size: Math.round(size * 0.53) }));
}
function createChip({ TimeUntil }) {
  return function Chip({ icon, tone = "muted", to, className, children }) {
    return (0, import_react2.createElement)(
      import_dsh_client_ui_primitives.Pill,
      { className: className ? `uk-chip ${className}` : "uk-chip" },
      icon && (0, import_react2.createElement)(Icon, { name: icon, size: 14, tone }),
      (0, import_react2.createElement)("span", { className: "uk-chipText" }, children, to && " ", to && (0, import_react2.createElement)(TimeUntil, { to }))
    );
  };
}

// src/client/history.js
var import_react3 = require("react");
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");
function createHistory({ useWords, useNow: useNow2 }) {
  function History({ items, max = 3, moreLabel }) {
    const { t, locale } = useWords();
    const now = useNow2(6e4);
    const [open, setOpen] = (0, import_react3.useState)(false);
    if (!items?.length) return null;
    const shown = open ? items : items.slice(0, max);
    const hidden = items.length - shown.length;
    const today = new Date(now).toDateString();
    const when = (at) => {
      const time = toTime(at);
      if (!Number.isFinite(time)) return "";
      const sameDay = new Date(time).toDateString() === today;
      return new Intl.DateTimeFormat(locale, sameDay ? { hour: "2-digit", minute: "2-digit" } : { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(time);
    };
    return (0, import_react3.createElement)(
      "div",
      { className: "uk-history" },
      (0, import_react3.createElement)("ol", null, shown.map((item, i) => (0, import_react3.createElement)(
        "li",
        { key: i },
        (0, import_react3.createElement)("time", { dateTime: item.at, title: Number.isFinite(toTime(item.at)) ? formatFull(toTime(item.at), locale) : void 0 }, when(item.at)),
        (0, import_react3.createElement)("span", null, item.text)
      ))),
      (hidden > 0 || open) && items.length > max && (0, import_react3.createElement)(
        import_dsh_client_ui_primitives2.Button,
        { variant: "ghost", size: "sm", className: "uk-historyToggle", onClick: () => setOpen((value) => !value) },
        open ? t("less") : moreLabel ? moreLabel.replace("{n}", String(hidden)) : t("earlier", { n: hidden })
      )
    );
  }
  return { History };
}

// src/client/live.js
var import_react4 = require("react");
var import_dsh_client_ui_primitives3 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/sse.js
function createSseParser(onData) {
  let buffer = "";
  let data = [];
  const line = (text) => {
    if (text === "") {
      if (data.length > 0) onData(data.join("\n"));
      data = [];
      return;
    }
    if (text.startsWith(":")) return;
    const colon = text.indexOf(":");
    const field = colon === -1 ? text : text.slice(0, colon);
    if (field !== "data") return;
    let value = colon === -1 ? "" : text.slice(colon + 1);
    if (value.startsWith(" ")) value = value.slice(1);
    data.push(value);
  };
  return {
    feed(chunk) {
      buffer += chunk;
      let at;
      while ((at = buffer.search(/\r\n|\r|\n/)) !== -1) {
        const end = buffer[at] === "\r" && buffer[at + 1] === "\n" ? at + 2 : at + 1;
        line(buffer.slice(0, at));
        buffer = buffer.slice(end);
      }
    }
  };
}
function backoff(attempt, random = Math.random) {
  return Math.min(30, 2 ** attempt) * (0.8 + random() * 0.4);
}

// src/client/live.js
var absolute = (path) => new URL(path, document.baseURI).href;
async function readTransport(fetch, path, signal, onOpen, onData) {
  const response = await fetch(path, { method: "GET", headers: { accept: "text/event-stream" }, signal });
  if (!response.ok || response.body === null) throw new Error(`${path} answered ${response.status}`);
  onOpen();
  const parser = createSseParser(onData);
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  for (; ; ) {
    const { done, value } = await reader.read();
    if (done) return;
    parser.feed(value);
  }
}
function useEventStream(path, onMessage) {
  const [status, setStatus] = (0, import_react4.useState)("connecting");
  const handler = (0, import_react4.useRef)(onMessage);
  handler.current = onMessage;
  (0, import_react4.useEffect)(() => {
    if (!path || typeof document === "undefined") return void 0;
    let closed = false;
    let attempt = 0;
    let timer = null;
    let close = () => {
    };
    const receive = (data) => {
      let message;
      try {
        message = JSON.parse(data);
      } catch {
        return;
      }
      handler.current(message);
    };
    const opened = () => {
      attempt = 0;
      setStatus("live");
    };
    const retry = () => {
      if (closed) return;
      setStatus("down");
      timer = setTimeout(connect, backoff(attempt++) * 1e3);
    };
    function connect() {
      if (closed) return;
      setStatus((status2) => status2 === "live" ? "live" : "connecting");
      const transport = globalThis.__DSH_TRANSPORT__;
      if (transport?.fetch !== void 0) {
        const controller = new AbortController();
        close = () => controller.abort();
        readTransport(transport.fetch, path, controller.signal, opened, receive).then(retry, retry);
        return;
      }
      const source = new EventSource(absolute(path), { withCredentials: true });
      close = () => source.close();
      source.onopen = opened;
      source.onmessage = (event) => receive(event.data);
      source.onerror = () => {
        if (source.readyState === EventSource.CLOSED) retry();
        else setStatus("connecting");
      };
    }
    connect();
    return () => {
      closed = true;
      clearTimeout(timer);
      close();
    };
  }, [path]);
  return status;
}
function createLive({ useWords }) {
  function LiveStatus({ status, updatedAt }) {
    const { t, locale } = useWords();
    const time = typeof updatedAt === "string" ? Date.parse(updatedAt) : updatedAt;
    const known = Number.isFinite(time) && time > 0;
    const sameDay = known && new Date(time).toDateString() === (/* @__PURE__ */ new Date()).toDateString();
    const when = known ? new Intl.DateTimeFormat(locale, sameDay ? { hour: "2-digit", minute: "2-digit" } : { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(time) : "";
    const text = status === "live" ? known ? t("liveUpdated", { time: when }) : t("live") : known ? t("updated", { time: when }) : status === "connecting" ? t("connecting") : "";
    return (0, import_react4.createElement)(
      "span",
      { className: "uk-live", "data-status": status, role: "status" },
      (0, import_react4.createElement)(import_dsh_client_ui_primitives3.StateDot, { state: status === "live" ? "done" : "idle" }),
      (0, import_react4.createElement)("span", null, text)
    );
  }
  return { LiveStatus };
}

// src/client/look.js
var STYLE_ID = "dsh-ui-kit-style";
var ACCENT = "var(--dsw-alias-state-business-primary)";
var CSS = `
.uk-icon{flex:none;display:inline-block;vertical-align:middle}
.uk-tile{flex:none;display:inline-grid;place-items:center;width:var(--uk-size);height:var(--uk-size);border-radius:calc(var(--uk-size) * .3);background:color-mix(in srgb,currentColor 13%,transparent)}
.uk-chip{gap:5px;max-width:100%;min-width:0}
.uk-chip .uk-icon{margin-left:-2px}
.uk-chipText{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.uk-time{font-variant-numeric:tabular-nums;white-space:nowrap}
.uk-countdown{font-variant-numeric:tabular-nums}
.uk-countdown-big{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:0 10px}
.uk-countdownPart b{font-size:40px;font-weight:600;line-height:44px;letter-spacing:-.02em}
.uk-countdownPart small{margin-left:3px;font-size:16px;font-weight:500;color:var(--dsw-alias-label-secondary)}
@media (width<=640px){.uk-countdownPart b{font-size:34px;line-height:38px}}
.uk-ring{position:relative;flex:none;display:inline-grid;place-items:center}
.uk-ring svg{position:absolute;inset:0;overflow:visible}
.uk-ringTrack{fill:none;stroke:var(--dsw-alias-border-l2)}
.uk-ringText{position:relative;display:flex;flex-direction:column;align-items:center;font-size:13px;font-weight:600;line-height:1.15;text-align:center;font-variant-numeric:tabular-nums}
.uk-ringText small{font-size:10px;font-weight:500;color:var(--dsw-alias-label-tertiary)}
.uk-spark{display:block;min-width:0}
.uk-spark svg{display:block;overflow:visible}
.uk-sparkDot{stroke:var(--dsw-alias-bg-base);stroke-width:1.5}
.uk-progress{display:flex;align-items:center;min-width:0}
.uk-progressLabelled{gap:10px}
.uk-progressTrack{position:relative;flex:1;min-width:24px;height:6px;border-radius:3px;background:var(--dsw-alias-border-l2);overflow:hidden}
.uk-progressFill{position:absolute;inset:0 auto 0 0;border-radius:3px}
.uk-progressLabel{flex:none;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;white-space:nowrap}
.uk-live{display:inline-flex;align-items:center;gap:6px;min-width:0}
.uk-live>span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.uk-wash{position:relative;animation:uk-wash 2s ease-out}
.uk-washAgain{animation-name:uk-wash-again}
.uk-wash::before{content:"";position:absolute;left:0;top:6px;bottom:6px;width:3px;border-radius:2px;background:${ACCENT};animation:uk-wash-bar 2s ease-out forwards;pointer-events:none}
@keyframes uk-wash{0%,40%{background-color:color-mix(in srgb,${ACCENT} 9%,transparent)}100%{background-color:transparent}}
@keyframes uk-wash-again{0%,40%{background-color:color-mix(in srgb,${ACCENT} 9%,transparent)}100%{background-color:transparent}}
@keyframes uk-wash-bar{0%,60%{opacity:1}100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.uk-wash,.uk-washAgain{animation:none}.uk-wash::before{display:none}}
.uk-justNow{font-size:11px;font-weight:500;line-height:16px;color:${ACCENT};white-space:nowrap}
.uk-newDot{flex:none;display:inline-block;width:7px;height:7px;border-radius:50%;background:${ACCENT}}
.uk-history ol{margin:8px 0 0;padding:0 0 0 12px;list-style:none;border-left:.5px solid var(--dsw-alias-border-l3);display:flex;flex-direction:column;gap:2px}
.uk-history li{display:flex;gap:10px;min-width:0;font-size:13px;line-height:20px;color:var(--dsw-alias-label-secondary)}
.uk-history time{flex:none;min-width:38px;font-size:12px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
.uk-history li span{min-width:0;overflow-wrap:anywhere}
.uk-historyToggle{margin:4px 0 0 4px}
.uk-suggested{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding-top:10px;border-top:.5px dashed var(--dsw-alias-border-l3)}
.uk-suggestedLabel{display:inline-flex;align-items:center;gap:5px;margin-right:2px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}
.uk-suggested .ua-bar{display:contents}
.uk-surface{position:relative;isolation:isolate;overflow:hidden;min-width:0;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-xl);background:var(--dsw-alias-bg-layer-1)}
.uk-surfaceBackdropped{background:var(--dsw-alias-bg-base)}
.uk-surfaceBackdrop{position:absolute;inset:-48px;z-index:-2;background:center/cover no-repeat;filter:blur(40px) saturate(1.4);opacity:.5;pointer-events:none}
.uk-surfaceBackdropped::before{content:"";position:absolute;inset:0;z-index:-1;background:color-mix(in srgb,var(--dsw-alias-bg-base) 62%,transparent);pointer-events:none}
.uk-segmentsLabelled{display:flex;align-items:center;gap:10px;min-width:0}
.uk-segments{flex:1;display:flex;gap:3px;min-width:0}
.uk-segment{flex:1 1 0;min-width:2px;height:5px;border-radius:3px;background:var(--dsw-alias-border-l2)}
.uk-segment[data-state=done]{background:${ACCENT}}
.uk-segment[data-state=current]{background:color-mix(in srgb,${ACCENT} 45%,transparent)}
.uk-segment[data-state=ready]{background:color-mix(in srgb,var(--dsw-alias-label-tertiary) 45%,transparent)}
.uk-segmentsEnd{flex:none;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);white-space:nowrap}
.uk-mention{padding:0 2px;border-radius:4px;color:${ACCENT};background:color-mix(in srgb,${ACCENT} 10%,transparent);font-weight:500}
.uk-mentionMe{color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 24%,transparent)}
.uk-msg{display:flex;align-items:flex-end;gap:8px;min-width:0;animation:uk-msg-in .18s ease-out}
.uk-msg[data-side=end]{flex-direction:row-reverse}
.uk-msgBubble{display:flex;flex-direction:column;gap:6px;min-width:0;max-width:min(620px,86%);box-sizing:border-box;padding:10px 14px;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-xl);background:var(--dsw-alias-bg-base);font-size:var(--dsh-content-font-size,14px);line-height:calc(22px + var(--dsh-content-font-delta,0px));overflow-wrap:anywhere;line-break:strict;transition:border-color .15s,box-shadow .15s}
.uk-msg[data-side=end] .uk-msgBubble{border-color:transparent;background:var(--dsw-specific-bubble)}
.uk-msg[data-highlight] .uk-msgBubble{border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 70%,transparent);box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-state-warn-primary) 18%,transparent)}
.uk-msg[data-folded] .uk-msgBubble{flex-direction:row;align-items:center;padding:4px 12px;border:1px dashed var(--dsw-alias-border-l3);background:transparent;color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px}
.uk-msgAuthor{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;min-width:0;font-size:13px;line-height:20px;font-weight:500;color:var(--dsw-alias-label-secondary)}
.uk-msgQuote{padding-left:8px;border-left:2px solid color-mix(in srgb,currentColor 35%,transparent);font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.uk-msgBody{min-width:0;white-space:pre-wrap}
.uk-msgFooter{display:flex;flex-wrap:wrap;align-items:center;gap:6px}
.uk-msgTime{flex:none;padding-bottom:2px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-caption,var(--dsw-alias-label-tertiary));font-variant-numeric:tabular-nums;white-space:nowrap}
@keyframes uk-msg-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.uk-chatDivider{display:flex;align-items:center;justify-content:center;gap:10px;margin:4px 0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}
.uk-chatDivider span{display:inline-block;padding:1px 10px;border-radius:10px;background:var(--dsw-alias-bg-layer-1)}
.uk-chatDivider span::first-letter{text-transform:uppercase}
.uk-chatDivider[data-tone=accent]{color:${ACCENT}}
.uk-chatDivider[data-tone=accent]::before,.uk-chatDivider[data-tone=accent]::after{content:"";flex:1;height:.5px;background:color-mix(in srgb,${ACCENT} 55%,transparent)}
.uk-chatDivider[data-tone=accent] span{background:none;padding:0}
.uk-convo{display:flex;align-items:center;gap:12px;width:100%;min-height:56px;box-sizing:border-box;padding:8px 10px;border:0;border-radius:12px;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer;transition:background-color .12s,transform .12s}
@media (hover:hover){.uk-convo:hover{background:var(--dsw-alias-interactive-bg-hover)}}
.uk-convo:active{transform:scale(.985);background:var(--dsw-alias-interactive-bg-hover)}
.uk-convo[aria-current=true]{background:var(--dsw-alias-bg-layer-2)}
.uk-convoIcon{flex:none;display:inline-flex}
.uk-convoMain{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}
.uk-convoTop,.uk-convoBottom{display:flex;align-items:center;gap:6px;min-width:0}
.uk-convoTitle{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px;line-height:22px;color:var(--dsw-alias-label-primary)}
.uk-convo[data-unread] .uk-convoTitle{font-weight:500}
.uk-convoTime{flex:none;margin-left:auto;padding-left:6px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;white-space:nowrap}
.uk-convoPreview{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary)}
.uk-convoCount,.uk-convoMention{flex:none;min-width:18px;height:18px;box-sizing:border-box;padding:0 5px;border-radius:9px;background:${ACCENT};color:#fff;font-size:11px;font-weight:600;line-height:18px;text-align:center;font-variant-numeric:tabular-nums}
.uk-convoCount[data-quiet]{background:var(--dsw-alias-bg-layer-3);color:var(--dsw-alias-label-secondary)}
.uk-convoMention{background:var(--dsw-alias-state-error-primary)}
.uk-composer{position:relative;display:flex;flex-direction:column;gap:6px;min-width:0}
.uk-composerRow{display:flex;align-items:flex-end;gap:6px;padding:6px 6px 6px 8px;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-xl);background:var(--dsw-alias-bg-base);transition:border-color .15s}
.uk-composerRow:focus-within{border-color:${ACCENT}}
.uk-composerInput{flex:1;min-width:0;min-height:32px;max-height:168px;box-sizing:border-box;margin:0;padding:5px 4px;border:0;outline:0;resize:none;background:transparent;color:inherit;font:inherit;font-size:var(--dsh-content-font-size,14px);line-height:22px;line-break:strict}
.uk-composerAt{flex:none;min-width:32px;font-weight:600}
.uk-composerSend{flex:none}
.uk-composerQuote,.uk-composerTo,.uk-composerError{display:flex;align-items:center;gap:6px;min-width:0;padding:0 8px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}
.uk-composerQuote>span:first-child{flex:1;min-width:0;padding-left:8px;border-left:2px solid ${ACCENT};overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.uk-composerError{color:var(--dsw-alias-state-error-primary)}
.uk-picker{position:absolute;left:0;right:0;bottom:calc(100% + 6px);z-index:20;max-height:min(320px,50vh);overflow:auto;padding:4px;border:.5px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-base);box-shadow:0 8px 28px rgba(0,0,0,.14);animation:uk-msg-in .12s ease-out}
.uk-pickerItem{display:flex;align-items:center;gap:8px;width:100%;min-height:36px;padding:6px 10px;border:0;border-radius:8px;background:none;color:inherit;font:inherit;font-size:14px;text-align:left;cursor:pointer}
.uk-pickerItem[aria-selected=true]{background:var(--dsw-alias-interactive-bg-hover)}
.uk-pickerName{flex:none;max-width:50%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.uk-pickerToken,.uk-pickerDetail{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:var(--dsw-alias-label-tertiary)}
.uk-pickerDetail{flex:1;text-align:right}
.uk-pickerEmpty{padding:8px 10px;font-size:13px;color:var(--dsw-alias-label-tertiary)}
/* Chrome is not selectable; message text is. */
.uk-msgAuthor,.uk-msgTime,.uk-chatDivider,.uk-convo,.uk-picker,.uk-composerTo,.uk-composerQuote,.uk-msg[data-folded]{-webkit-user-select:none;user-select:none}
.uk-msgBody{-webkit-user-select:text;user-select:text}
@media (pointer:coarse){.uk-pickerItem{min-height:44px}.uk-composerAt,.uk-composerSend{min-height:40px;min-width:40px}.uk-composerInput{min-height:40px;padding-block:9px}}
@media (width<=420px){.uk-composerSendText{display:none}}
@media (prefers-reduced-motion:reduce){.uk-msg,.uk-picker{animation:none}.uk-convo,.uk-convo:active{transition:none;transform:none}}
@media (pointer:coarse){.uk-touch{min-height:40px}}
`;

// src/client/measures.js
var import_react5 = require("react");
function useWidth() {
  const [element, setElement] = (0, import_react5.useState)(null);
  const [width, setWidth] = (0, import_react5.useState)(0);
  (0, import_react5.useLayoutEffect)(() => {
    if (!element) return void 0;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);
  return [setElement, width];
}
function Ring({ value, max, size = 54, stroke, tone = "accent", label, children }) {
  const width = stroke ?? Math.max(3, Math.round(size / 9));
  const r = (size - width) / 2;
  const length = 2 * Math.PI * r;
  const centre = size / 2;
  return (0, import_react5.createElement)(
    "span",
    { className: "uk-ring", style: { width: size, height: size }, role: label ? "img" : void 0, "aria-label": label },
    (0, import_react5.createElement)(
      "svg",
      { width: size, height: size, "aria-hidden": true },
      (0, import_react5.createElement)("circle", { cx: centre, cy: centre, r, className: "uk-ringTrack", strokeWidth: width }),
      share(value, max) > 0 && (0, import_react5.createElement)("circle", {
        cx: centre,
        cy: centre,
        r,
        strokeWidth: width,
        fill: "none",
        stroke: toneColor(tone),
        strokeLinecap: "round",
        strokeDasharray: `${(length * share(value, max)).toFixed(2)} ${length.toFixed(2)}`,
        transform: `rotate(-90 ${centre} ${centre})`
      })
    ),
    children !== void 0 && (0, import_react5.createElement)("span", { className: "uk-ringText" }, children)
  );
}
function Spark({ values, tone = "accent", height = 24, width, area = false, dot = true, min, max, label }) {
  const [ref, measured] = useWidth();
  const w = width ?? measured;
  const color = toneColor(tone);
  const path = sparkPath(values ?? [], w, height, { pad: dot ? 3 : 1.5, min, max });
  return (0, import_react5.createElement)(
    "span",
    { ref: width === void 0 ? ref : void 0, className: "uk-spark", style: { height, ...width === void 0 ? {} : { width } }, role: label ? "img" : void 0, "aria-label": label },
    w > 0 && path.last && (0, import_react5.createElement)(
      "svg",
      { width: w, height, "aria-hidden": true },
      area && (0, import_react5.createElement)("path", { d: path.area, fill: color, fillOpacity: 0.12, stroke: "none" }),
      (0, import_react5.createElement)("path", { d: path.line, fill: "none", stroke: color, strokeWidth: 1.6, strokeLinejoin: "round", strokeLinecap: "round" }),
      dot && (0, import_react5.createElement)("circle", { cx: path.last[0], cy: path.last[1], r: 2.6, fill: color, className: "uk-sparkDot" })
    )
  );
}
function Bar({ part, tone, start: start2, end, label }) {
  const bar = (0, import_react5.createElement)(
    "span",
    { className: "uk-progressTrack", role: "progressbar", "aria-label": label, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(part * 100) },
    (0, import_react5.createElement)("span", { className: "uk-progressFill", style: { width: `${(part * 100).toFixed(1)}%`, background: toneColor(tone) } })
  );
  if (start2 === void 0 && end === void 0) return (0, import_react5.createElement)("span", { className: "uk-progress" }, bar);
  return (0, import_react5.createElement)(
    "span",
    { className: "uk-progress uk-progressLabelled" },
    start2 !== void 0 && (0, import_react5.createElement)("span", { className: "uk-progressLabel" }, start2),
    bar,
    end !== void 0 && (0, import_react5.createElement)("span", { className: "uk-progressLabel" }, end)
  );
}
function createProgress({ useNow: useNow2 }) {
  function TimedBar({ from, to, ...rest }) {
    const now = useNow2(6e4);
    return (0, import_react5.createElement)(Bar, { ...rest, part: share(now - toTime(from), toTime(to) - toTime(from)) });
  }
  function Progress({ value, max, from, to, tone = "accent", start: start2, end, label }) {
    if (from !== void 0 && to !== void 0) return (0, import_react5.createElement)(TimedBar, { from, to, tone, start: start2, end, label });
    return (0, import_react5.createElement)(Bar, { part: share(value, max), tone, start: start2, end, label });
  }
  return { Progress };
}

// src/client/suggested.js
var import_react6 = require("react");
var import_dsh_client_ui_primitives4 = require("@deepseek-ai/dsh-client-ui-primitives");
function createActionsStore() {
  let value = null;
  const listeners = /* @__PURE__ */ new Set();
  return {
    set(next) {
      value = next;
      for (const listener of listeners) listener();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    get: () => value
  };
}
function createSuggested({ useWords, actionsStore }) {
  function Suggested({ actions, about, states, onPress }) {
    const { t } = useWords();
    const uiActions = (0, import_react6.useSyncExternalStore)(actionsStore.subscribe, actionsStore.get);
    const steps = (actions ?? []).filter((action) => action?.kind === "step");
    if (uiActions === null || steps.length === 0) return null;
    return (0, import_react6.createElement)(
      "div",
      { className: "uk-suggested" },
      (0, import_react6.createElement)("span", { className: "uk-suggestedLabel" }, (0, import_react6.createElement)(import_dsh_client_ui_primitives4.IconSparkleRegular, { size: 13 }), t("suggested")),
      (0, import_react6.createElement)(uiActions.ActionBar, { actions: steps, part: "steps", about, states, onPress })
    );
  }
  return { Suggested };
}

// src/client/surfaces.js
var import_react7 = require("react");
var TOUCH = "uk-touch";
function Surface({ backdrop, as = "div", className, children, ...rest }) {
  const classes = ["uk-surface", backdrop ? "uk-surfaceBackdropped" : "", className ?? ""].filter(Boolean).join(" ");
  return (0, import_react7.createElement)(
    as,
    { ...rest, className: classes },
    backdrop && (0, import_react7.createElement)("span", { className: "uk-surfaceBackdrop", "aria-hidden": true, style: { backgroundImage: `url(${JSON.stringify(backdrop)})` } }),
    children
  );
}
function Segments({ items, end, label }) {
  const strip = (0, import_react7.createElement)(
    "span",
    { className: "uk-segments", role: label ? "img" : void 0, "aria-label": label },
    (items ?? []).map((item, i) => {
      const { state, title } = typeof item === "string" ? { state: item } : item;
      return (0, import_react7.createElement)("span", { key: i, className: "uk-segment", "data-state": SEGMENT_STATES.includes(state) ? state : "todo", title });
    })
  );
  if (end === void 0) return strip;
  return (0, import_react7.createElement)("span", { className: "uk-segmentsLabelled" }, strip, (0, import_react7.createElement)("span", { className: "uk-segmentsEnd" }, end));
}

// src/client/chat.js
var import_react8 = require("react");
var import_dsh_client_ui_primitives5 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/chat.js
var MENTION = /(?<![A-Za-z0-9_.@])@([\p{L}\p{N}](?:[\p{L}\p{N}._-]*[\p{L}\p{N}])?)(?![\p{L}\p{N}_/])/gu;
var NOT_SPOKEN = /```[\s\S]*?```|`[^`\n]*`|\b[a-z][a-z0-9+.-]*:\/\/\S+/gi;
var spoken = (text) => String(text ?? "").replace(NOT_SPOKEN, (quoted) => " ".repeat(quoted.length));
function splitMentions(text) {
  const parts = [];
  let at = 0;
  for (const match of spoken(text).matchAll(MENTION)) {
    if (match.index > at) parts.push({ text: text.slice(at, match.index) });
    parts.push({ mention: match[1], text: match[0] });
    at = match.index + match[0].length;
  }
  if (at < String(text ?? "").length) parts.push({ text: text.slice(at) });
  return parts;
}
function mentionsIn(text) {
  return [...new Set(splitMentions(text).filter((part) => part.mention).map((part) => part.mention.toLowerCase()))];
}
function mentionAt(text, caret) {
  const before = String(text ?? "").slice(0, caret);
  const match = /(?:^|[^A-Za-z0-9_.@])@([\p{L}\p{N}._-]*)$/u.exec(before);
  if (match === null) return null;
  return { start: caret - match[1].length - 1, query: match[1] };
}
function rankCandidates(candidates, query, max = 8) {
  const q = query.toLowerCase();
  const scored = [];
  for (const candidate of candidates ?? []) {
    const keys = [candidate.token, candidate.label, ...candidate.aliases ?? []].filter(Boolean).map((key) => String(key).toLowerCase());
    const score = q === "" ? 1 : keys.some((key) => key.startsWith(q)) ? 0 : keys.some((key) => key.includes(q)) ? 1 : -1;
    if (score >= 0) scored.push([score, candidate]);
  }
  return scored.sort((a, b) => a[0] - b[0]).slice(0, max).map(([, candidate]) => candidate);
}
function insertMention(text, spot, token) {
  const end = spot.start + 1 + spot.query.length;
  const after = text.slice(end);
  const insert = `@${token}${/^\s/.test(after) ? "" : " "}`;
  return { text: text.slice(0, spot.start) + insert + after, caret: spot.start + insert.length };
}

// src/client/chat.js
var join = (...names) => names.filter(Boolean).join(" ");
function createChat({ useWords, useNow: useNow2 }) {
  function MentionText({ text, me }) {
    const mine = new Set((me ?? []).map((name2) => String(name2).toLowerCase()));
    return (0, import_react8.createElement)(import_react8.Fragment, null, splitMentions(text).map((part, i) => part.mention ? (0, import_react8.createElement)("span", { key: i, className: mine.has(part.mention.toLowerCase()) ? "uk-mention uk-mentionMe" : "uk-mention" }, part.text) : part.text));
  }
  function BubbleTime({ at }) {
    const { locale } = useWords();
    const now = useNow2(6e4);
    const time = toTime(at);
    if (!Number.isFinite(time)) return null;
    const today = new Date(time).toDateString() === new Date(now).toDateString();
    const text = new Intl.DateTimeFormat(locale, today ? { hour: "2-digit", minute: "2-digit" } : { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(time);
    return (0, import_react8.createElement)(
      import_dsh_client_ui_primitives5.Tooltip,
      { label: formatFull(time, locale), side: "top" },
      (0, import_react8.createElement)("time", { className: "uk-msgTime", dateTime: new Date(time).toISOString() }, text)
    );
  }
  function ChatBubble({ side = "start", author, quote, time, highlight, folded, footer, id, className, children }) {
    return (0, import_react8.createElement)(
      "div",
      {
        id,
        className: join("uk-msg", className),
        "data-side": side === "end" ? "end" : "start",
        "data-highlight": highlight ? "true" : void 0,
        "data-folded": folded ? "true" : void 0
      },
      (0, import_react8.createElement)(
        "div",
        { className: "uk-msgBubble" },
        author && (0, import_react8.createElement)("div", { className: "uk-msgAuthor" }, author),
        quote && (0, import_react8.createElement)("div", { className: "uk-msgQuote" }, quote),
        (0, import_react8.createElement)("div", { className: "uk-msgBody" }, children),
        footer && (0, import_react8.createElement)("div", { className: "uk-msgFooter" }, footer)
      ),
      time && (0, import_react8.createElement)(BubbleTime, { at: time })
    );
  }
  function ChatDivider({ tone = "muted", id, children }) {
    return (0, import_react8.createElement)("div", { id, className: "uk-chatDivider", "data-tone": tone === "accent" ? "accent" : "muted", role: "separator" }, (0, import_react8.createElement)("span", null, children));
  }
  function DayLabel({ at }) {
    const { locale } = useWords();
    const now = useNow2(6e4);
    const time = toTime(at);
    if (!Number.isFinite(time)) return null;
    const day = (d) => new Date(new Date(d).getFullYear(), new Date(d).getMonth(), new Date(d).getDate()).getTime();
    const diff = Math.round((day(now) - day(time)) / 864e5);
    if (diff >= 0 && diff <= 1) return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-diff, "day");
    return new Intl.DateTimeFormat(locale, { weekday: "short", month: "short", day: "numeric" }).format(time);
  }
  function ConversationRow({ icon, title, dot, preview, time, unread, quiet, mention, active, onClick, id }) {
    const { t } = useWords();
    const count = unread > 99 ? "99+" : unread > 0 ? String(unread) : "";
    return (0, import_react8.createElement)(
      "button",
      {
        type: "button",
        id,
        className: "uk-convo",
        "aria-current": active ? "true" : void 0,
        "data-unread": unread > 0 ? "true" : void 0,
        onClick
      },
      icon && (0, import_react8.createElement)("span", { className: "uk-convoIcon" }, icon),
      (0, import_react8.createElement)(
        "span",
        { className: "uk-convoMain" },
        (0, import_react8.createElement)(
          "span",
          { className: "uk-convoTop" },
          (0, import_react8.createElement)("span", { className: "uk-convoTitle" }, title),
          dot,
          time && (0, import_react8.createElement)("span", { className: "uk-convoTime" }, time)
        ),
        (0, import_react8.createElement)(
          "span",
          { className: "uk-convoBottom" },
          (0, import_react8.createElement)("span", { className: "uk-convoPreview" }, preview),
          mention && (0, import_react8.createElement)("span", { className: "uk-convoMention", role: "img", "aria-label": t("mentioned") }, "@"),
          count && (0, import_react8.createElement)("span", { className: "uk-convoCount", "data-quiet": quiet ? "true" : void 0, "aria-label": t("unreadCount", { n: unread }) }, count)
        )
      )
    );
  }
  return { MentionText, ChatBubble, ChatDivider, DayLabel, ConversationRow };
}

// src/client/composer.js
var import_react9 = require("react");
var import_dsh_client_ui_primitives6 = require("@deepseek-ai/dsh-client-ui-primitives");
var coarse = () => typeof window !== "undefined" && window.matchMedia?.("(pointer:coarse)").matches === true;
var MAX_ROWS_PX = 168;
function createComposer({ useWords }) {
  function Composer({ value, onChange, onSend, candidates, recipients, quote, onClearQuote, placeholder, label, sending, disabled, error }) {
    const { t } = useWords();
    const box = (0, import_react9.useRef)(null);
    const listId = (0, import_react9.useId)();
    const [spot, setSpot] = (0, import_react9.useState)(null);
    const [active, setActive] = (0, import_react9.useState)(0);
    const matches = spot === null ? [] : rankCandidates(candidates, spot.query);
    const open = spot !== null && (candidates?.length ?? 0) > 0;
    (0, import_react9.useEffect)(() => {
      const el = box.current;
      if (el === null) return;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, MAX_ROWS_PX)}px`;
    }, [value]);
    (0, import_react9.useEffect)(() => {
      setActive(0);
    }, [spot?.query]);
    const look = (text, caret) => setSpot(mentionAt(text, caret));
    const pick = (candidate) => {
      if (spot === null) return;
      const next = insertMention(value, spot, candidate.token);
      onChange(next.text);
      setSpot(null);
      requestAnimationFrame(() => {
        box.current?.focus();
        box.current?.setSelectionRange(next.caret, next.caret);
      });
    };
    const openPicker = () => {
      const el = box.current;
      const caret = el?.selectionStart ?? value.length;
      const before = value.slice(0, caret);
      const glue = before === "" || /\s$/.test(before) ? "" : " ";
      const text = `${before}${glue}@${value.slice(caret)}`;
      const at = caret + glue.length + 1;
      onChange(text);
      setSpot({ start: at - 1, query: "" });
      requestAnimationFrame(() => {
        el?.focus();
        el?.setSelectionRange(at, at);
      });
    };
    const send = () => {
      if (sending || disabled || value.trim() === "") return;
      setSpot(null);
      onSend();
    };
    const onKeyDown = (event) => {
      if (event.nativeEvent.isComposing || event.keyCode === 229) return;
      if (open && matches.length > 0) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          setActive((i) => (i + (event.key === "ArrowDown" ? 1 : matches.length - 1)) % matches.length);
          return;
        }
        if (event.key === "Enter" || event.key === "Tab") {
          event.preventDefault();
          pick(matches[active] ?? matches[0]);
          return;
        }
      }
      if (open && event.key === "Escape") {
        event.preventDefault();
        setSpot(null);
        return;
      }
      if (event.key === "Enter" && !event.shiftKey && !coarse()) {
        event.preventDefault();
        send();
      }
    };
    return (0, import_react9.createElement)(
      "div",
      { className: "uk-composer", "data-disabled": disabled ? "true" : void 0 },
      open && (0, import_react9.createElement)(
        "div",
        { className: "uk-picker", id: listId, role: "listbox", "aria-label": t("mentionPick") },
        matches.length === 0 ? (0, import_react9.createElement)("div", { className: "uk-pickerEmpty" }, t("noMatch")) : matches.map((candidate, i) => (0, import_react9.createElement)(
          "button",
          {
            key: candidate.token,
            type: "button",
            role: "option",
            id: `${listId}-${i}`,
            className: "uk-pickerItem",
            "aria-selected": i === active,
            onPointerDown: (event) => event.preventDefault(),
            onMouseEnter: () => setActive(i),
            onClick: () => pick(candidate)
          },
          candidate.state && (0, import_react9.createElement)(import_dsh_client_ui_primitives6.StateDot, { state: candidate.state }),
          (0, import_react9.createElement)("span", { className: "uk-pickerName" }, candidate.label ?? candidate.token),
          candidate.label && candidate.label !== candidate.token && (0, import_react9.createElement)("span", { className: "uk-pickerToken" }, `@${candidate.token}`),
          candidate.detail && (0, import_react9.createElement)("span", { className: "uk-pickerDetail" }, candidate.detail)
        ))
      ),
      quote && (0, import_react9.createElement)(
        "div",
        { className: "uk-composerQuote" },
        (0, import_react9.createElement)("span", null, quote),
        onClearQuote && (0, import_react9.createElement)(import_dsh_client_ui_primitives6.Button, { variant: "ghost", size: "sm", "aria-label": t("cancel"), onClick: onClearQuote }, (0, import_react9.createElement)(import_dsh_client_ui_primitives6.IconCloseOutlineRegular, { size: 14 }))
      ),
      recipients && (0, import_react9.createElement)("div", { className: "uk-composerTo" }, recipients),
      error && (0, import_react9.createElement)("div", { className: "uk-composerError", role: "alert" }, error),
      (0, import_react9.createElement)(
        "div",
        { className: "uk-composerRow" },
        (candidates?.length ?? 0) > 0 && (0, import_react9.createElement)(import_dsh_client_ui_primitives6.Button, {
          variant: "ghost",
          size: "sm",
          className: "uk-composerAt",
          "aria-label": t("mentionPick"),
          disabled,
          onClick: openPicker
        }, "@"),
        (0, import_react9.createElement)("textarea", {
          ref: box,
          className: "uk-composerInput",
          rows: 1,
          value,
          placeholder,
          "aria-label": label ?? placeholder,
          disabled,
          role: "combobox",
          "aria-expanded": open,
          "aria-controls": open ? listId : void 0,
          "aria-activedescendant": open && matches.length > 0 ? `${listId}-${active}` : void 0,
          "aria-autocomplete": "list",
          onChange: (event) => {
            onChange(event.target.value);
            look(event.target.value, event.target.selectionStart);
          },
          onSelect: (event) => look(event.target.value, event.target.selectionStart),
          onBlur: () => setTimeout(() => setSpot(null), 120),
          onKeyDown
        }),
        (0, import_react9.createElement)(
          import_dsh_client_ui_primitives6.Button,
          { variant: "primary", size: "sm", className: "uk-composerSend", disabled: disabled || sending || value.trim() === "", onClick: send, "aria-label": t("send") },
          (0, import_react9.createElement)(import_dsh_client_ui_primitives6.IconSendOutlineRegular, { size: 16 }),
          (0, import_react9.createElement)("span", { className: "uk-composerSendText" }, t("send"))
        )
      )
    );
  }
  return { Composer };
}

// src/client/time.js
var import_react10 = require("react");
var import_dsh_client_ui_primitives7 = require("@deepseek-ai/dsh-client-ui-primitives");
var MINUTE2 = 6e4;
var tickers = /* @__PURE__ */ new Map();
function ticker(step) {
  let entry = tickers.get(step);
  if (entry === void 0) {
    entry = { now: Date.now(), listeners: /* @__PURE__ */ new Set(), timer: null };
    tickers.set(step, entry);
  }
  return entry;
}
function tick(entry) {
  entry.now = Date.now();
  for (const listener of entry.listeners) listener();
}
function start(step, entry) {
  if (entry.timer !== null || entry.listeners.size === 0) return;
  if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
  entry.timer = setTimeout(function next() {
    tick(entry);
    entry.timer = setTimeout(next, step - Date.now() % step);
  }, step - Date.now() % step);
}
function stop(entry) {
  clearTimeout(entry.timer);
  entry.timer = null;
}
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    for (const [step, entry] of tickers) {
      if (document.visibilityState === "hidden") stop(entry);
      else {
        tick(entry);
        start(step, entry);
      }
    }
  });
}
function useNow(step = MINUTE2) {
  const subscribe = (0, import_react10.useCallback)((listener) => {
    const entry = ticker(step);
    if (entry.listeners.size === 0) entry.now = Date.now();
    entry.listeners.add(listener);
    start(step, entry);
    return () => {
      entry.listeners.delete(listener);
      if (entry.listeners.size === 0) stop(entry);
    };
  }, [step]);
  return (0, import_react10.useSyncExternalStore)(subscribe, () => ticker(step).now);
}
function useNowNear(target) {
  const minute = useNow(MINUTE2);
  const near = Number.isFinite(target) && Math.abs(target - minute) < 2 * MINUTE2;
  const second = useNow(near ? 1e3 : MINUTE2);
  return near ? second : minute;
}
function createTime({ useWords }) {
  function Countdown({ to, size = "big", units, className }) {
    const { t, locale } = useWords();
    const target = toTime(to);
    const now = useNowNear(target);
    const ms = target - now;
    const cls = `uk-countdown uk-countdown-${size}${className ? ` ${className}` : ""}`;
    if (!Number.isFinite(target)) return null;
    if (ms <= 0) return (0, import_react10.createElement)("span", { className: cls }, t("now"));
    if (size === "inline") return (0, import_react10.createElement)("span", { className: cls }, formatDuration(ms, locale, units ?? 2));
    return (0, import_react10.createElement)("span", { className: cls, role: "timer" }, durationParts(ms, units ?? 3).map(({ n, unit }) => {
      const parts = unitParts(n, unit, locale);
      return (0, import_react10.createElement)("span", { key: unit, className: "uk-countdownPart" }, (0, import_react10.createElement)("b", null, parts.number), (0, import_react10.createElement)("small", null, parts.unit));
    }));
  }
  function TimeUntil({ to }) {
    const { t, locale } = useWords();
    const target = toTime(to);
    const now = useNowNear(target);
    if (!Number.isFinite(target)) return null;
    const ms = target - now;
    return (0, import_react10.createElement)("span", { className: "uk-time" }, ms <= 0 ? t("now") : t("inDuration", { duration: formatDuration(ms, locale) }));
  }
  function TimeAgo({ at }) {
    const { t, locale } = useWords();
    const now = useNow(MINUTE2);
    const time = toTime(at);
    if (!Number.isFinite(time)) return null;
    const text = formatAgo((0, import_dsh_client_ui_primitives7.relativeTime)(time, now), locale) ?? t("justNow");
    return (0, import_react10.createElement)(import_dsh_client_ui_primitives7.Tooltip, { label: formatFull(time, locale), side: "top" }, (0, import_react10.createElement)("time", { className: "uk-time", dateTime: new Date(time).toISOString() }, text));
  }
  function RelativeDay({ date }) {
    const { locale } = useWords();
    const now = useNow(MINUTE2);
    const time = toTime(date);
    if (!Number.isFinite(time)) return null;
    return (0, import_react10.createElement)(import_dsh_client_ui_primitives7.Tooltip, { label: formatFull(time, locale), side: "top" }, (0, import_react10.createElement)("time", { className: "uk-time", dateTime: String(date) }, formatRelativeDay(date, now, locale)));
  }
  return { Countdown, TimeUntil, TimeAgo, RelativeDay };
}

// src/client/words.js
var import_react11 = require("react");
var NS = "dsh-ui-kit";
function intlTag(active) {
  try {
    return Intl.DateTimeFormat.supportedLocalesOf(active).length > 0 ? active : "en";
  } catch {
    return "en";
  }
}
function createWords(ctx) {
  const t = ctx.locale.bind(NS);
  function useLanguage() {
    const subscribe = (0, import_react11.useCallback)((listener) => ctx.locale.subscribe(listener), []);
    return (0, import_react11.useSyncExternalStore)(subscribe, () => ctx.locale.getSnapshot().active);
  }
  function useWords() {
    const active = useLanguage();
    return { t, locale: intlTag(active) };
  }
  return { t, useLanguage, useWords };
}

// src/client/index.js
var name = "ui-kit";
var inject = ["locale"];
function apply(ctx) {
  ctx.effect(() => {
    const disposers = [];
    for (const [tag, file] of Object.entries(locales_default)) {
      try {
        disposers.push(ctx.locale.register(NS, tag, file.ui));
      } catch (error) {
        console.warn(`dsh-ui-kit: no ${tag} words`, error);
      }
    }
    return () => {
      for (const dispose of disposers) dispose();
    };
  }, "ui-kit: words");
  if (typeof document !== "undefined") {
    ctx.effect(() => {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.dataset.plugin = "@soffits/dsh-ui-kit";
      style.textContent = CSS;
      document.head.appendChild(style);
      return () => style.remove();
    }, "ui-kit: styles");
  }
  const actionsStore = createActionsStore();
  ctx.inject(["uiActions"], (scope) => {
    scope.effect(() => {
      actionsStore.set(scope.uiActions);
      return () => actionsStore.set(null);
    }, "ui-kit: suggested steps");
  });
  const { useWords } = createWords(ctx);
  const time = createTime({ useWords });
  const live = createLive({ useWords });
  const change = createChange({ useWords });
  ctx.provide("uiKit", Object.freeze({
    Icon,
    Tile,
    Chip: createChip({ TimeUntil: time.TimeUntil }),
    useNow,
    ...time,
    Ring,
    Spark,
    ...createProgress({ useNow }),
    useEventStream,
    ...live,
    useWash,
    Wash,
    ...change,
    ...createHistory({ useWords, useNow }),
    ...createSuggested({ useWords, actionsStore }),
    ...createChat({ useWords, useNow }),
    ...createComposer({ useWords }),
    splitMentions,
    mentionsIn,
    Surface,
    Segments,
    TOUCH,
    TONES,
    toneColor,
    tagTone,
    ICON_NAMES,
    formatDuration,
    formatRelativeDay
  }));
}

    return module.exports
  },
})
