/* ==========================================================================
   EcoBin Smart Waste Management Dashboard
   Frontend-only prototype. All data is simulated and stored in LocalStorage.
   No backend, no external APIs, no authentication.
   ========================================================================== */

'use strict';

/* ---------------------------------------------------------------------------
   1. CONSTANTS & CONFIG
   ------------------------------------------------------------------------- */

const STORAGE_KEY = 'ecobin_state_v1';

const NAV_ITEMS = [
  { id: 'overview',  label: 'Overview',           icon: 'grid' },
  { id: 'bins',      label: 'Smart Bins',         icon: 'bin' },
  { id: 'analytics', label: 'Waste Analytics',    icon: 'chart' },
  { id: 'routes',    label: 'Collection Routes',  icon: 'route' },
  { id: 'ai',        label: 'AI Recommendations', icon: 'spark' },
  { id: 'activity',  label: 'Activity',           icon: 'pulse' },
  { id: 'settings',  label: 'Settings',           icon: 'settings' },
];

const ICONS = {
  grid: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5ZM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4Zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4Z"/>',
  bin: '<path stroke-linecap="round" stroke-linejoin="round" d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13M10 11v6m4-6v6"/>',
  chart: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 20V10m6 10V4m6 16v-7"/>',
  route: '<path stroke-linecap="round" stroke-linejoin="round" d="M5 19c1-4 3-4 4-8s2-6 5-6M18 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm0 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>',
  spark: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.4-6.4-2.1 2.1M8.7 15.3l-2.1 2.1m0-10.8 2.1 2.1m8.7 8.6-2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/>',
  pulse: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12h4l2-7 4 14 2-7h6"/>',
  settings: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.3 3.8a1.9 1.9 0 0 1 3.4 0l.3.7a1.9 1.9 0 0 0 2.5 1l.7-.3a1.9 1.9 0 0 1 2.4 2.4l-.3.7a1.9 1.9 0 0 0 1 2.5l.7.3a1.9 1.9 0 0 1 0 3.4l-.7.3a1.9 1.9 0 0 0-1 2.5l.3.7a1.9 1.9 0 0 1-2.4 2.4l-.7-.3a1.9 1.9 0 0 0-2.5 1l-.3.7a1.9 1.9 0 0 1-3.4 0l-.3-.7a1.9 1.9 0 0 0-2.5-1l-.7.3a1.9 1.9 0 0 1-2.4-2.4l.3-.7a1.9 1.9 0 0 0-1-2.5l-.7-.3a1.9 1.9 0 0 1 0-3.4l.7-.3a1.9 1.9 0 0 0 1-2.5l-.3-.7a1.9 1.9 0 0 1 2.4-2.4l.7.3a1.9 1.9 0 0 0 2.5-1l.3-.7Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>',
  close: '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>',
  check: '<path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/>',
  alert: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.8 3h15a2 2 0 0 0 1.8-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>',
  info: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 8h.01M11 12h1v4h1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>',
  battery: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 10a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4Zm16 1h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H19"/>',
  thermo: '<path stroke-linecap="round" stroke-linejoin="round" d="M10 14.76V5a2 2 0 1 1 4 0v9.76a4 4 0 1 1-4 0Z"/>',
  clock: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>',
  pin: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>',
  truck: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 7h11v9H3zm11 3h4l3 3v3h-7z"/><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>',
  leaf: '<path stroke-linecap="round" stroke-linejoin="round" d="M5 21c8 0 14-6 14-14V5H17C9 5 5 11 5 19v2Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 21c3-6 6-9 12-12"/>',
  recycle: '<path stroke-linecap="round" stroke-linejoin="round" d="M7 19H5.5A2.5 2.5 0 0 1 3 16.5c0-.6.2-1.2.5-1.6L6 11m5 8h4a2.5 2.5 0 0 0 2.2-3.7L15 11m-8-7 2.7 4.6M9 4l2 3.5L14.5 4M15 11l-4-7m4 7h-3.5"/>',
  zap: '<path stroke-linecap="round" stroke-linejoin="round" d="m13 2-9 12h6l-1 8 9-12h-6l1-8Z"/>',
};

const ZONES = ['Mirpur', 'Uttara', 'Gulshan', 'Dhanmondi', 'Banani', 'Mohammadpur', 'Motijheel', 'Badda'];
const WASTE_TYPES = ['General Waste', 'Recyclable', 'Organic', 'Plastic', 'Paper'];
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/* ---------------------------------------------------------------------------
   2. SEED / DEMO DATA GENERATION
   ------------------------------------------------------------------------- */

function seedRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function statusFromFill(fill, offline) {
  if (offline) return 'offline';
  if (fill >= 90) return 'critical';
  if (fill >= 80) return 'warning';
  if (fill >= 50) return 'moderate';
  return 'normal';
}

function buildDemoBins() {
  const rnd = seedRandom(42);
  const bins = [];
  for (let i = 1; i <= 48; i++) {
    const id = 'EB-' + String(i).padStart(3, '0');
    const zone = ZONES[Math.floor(rnd() * ZONES.length)];
    const wasteType = WASTE_TYPES[Math.floor(rnd() * WASTE_TYPES.length)];
    const offline = rnd() < 0.06;
    let fill = Math.round(rnd() * 100);
    if (i <= 4) fill = 90 + Math.round(rnd() * 10); // guarantee some critical bins
    const status = statusFromFill(fill, offline);
    const hoursAgo = Math.round(rnd() * 30) + 1;
    const battery = offline ? Math.round(rnd() * 15) : Math.round(30 + rnd() * 70);
    const temp = Math.round(24 + rnd() * 12);
    const history = Array.from({ length: 6 }, (_, h) => Math.max(0, Math.min(100, fill - (5 - h) * (4 + Math.round(rnd() * 6)))));
    bins.push({
      id,
      location: zone + ' Sector ' + (1 + Math.floor(rnd() * 12)),
      zone,
      wasteType,
      fill: Math.min(100, fill),
      temp,
      battery,
      status,
      lastCollectionHours: hoursAgo,
      history,
    });
  }
  return bins;
}

function buildDemoRoutes() {
  return [
    { id: 'R-A', name: 'Route A', bins: 8, distance: 12.4, time: 31, priority: 'High', status: 'Active', zone: 'Mirpur → Mohammadpur' },
    { id: 'R-B', name: 'Route B', bins: 6, distance: 9.8, time: 24, priority: 'Medium', status: 'Scheduled', zone: 'Gulshan → Banani' },
    { id: 'R-C', name: 'Route C', bins: 10, distance: 16.2, time: 42, priority: 'Low', status: 'Completed', zone: 'Uttara loop' },
    { id: 'R-D', name: 'Route D', bins: 7, distance: 11.1, time: 27, priority: 'High', status: 'Active', zone: 'Dhanmondi → Motijheel' },
    { id: 'R-E', name: 'Route E', bins: 5, distance: 7.6, time: 19, priority: 'Medium', status: 'Scheduled', zone: 'Badda' },
  ];
}

function buildDemoActivity() {
  const now = Date.now();
  const mins = (m) => now - m * 60000;
  return [
    { id: 1, ts: mins(8),   type: 'critical', icon: 'alert',   text: 'Bin EB-014 reached 94% capacity in Mirpur Sector 6.' },
    { id: 2, ts: mins(35),  type: 'route',    icon: 'truck',   text: 'Route R-07 completed — 10 bins serviced, 182 kg collected.' },
    { id: 3, ts: mins(52),  type: 'recycle',  icon: 'recycle', text: '182 kg of recyclable waste collected from Gulshan zone.' },
    { id: 4, ts: mins(70),  type: 'battery',  icon: 'battery', text: 'Bin EB-021 battery dropped below 30%.' },
    { id: 5, ts: mins(95),  type: 'ai',       icon: 'spark',   text: 'New route recommendation generated for Uttara cluster.' },
    { id: 6, ts: mins(140), type: 'route',    icon: 'check',   text: 'Collection cycle completed for Dhanmondi zone.' },
    { id: 7, ts: mins(180), type: 'critical', icon: 'alert',   text: 'Bin EB-032 reached 91% capacity in Banani.' },
    { id: 8, ts: mins(210), type: 'bin',      icon: 'bin',     text: 'New smart bin EB-048 registered in Badda.' },
    { id: 9, ts: mins(260), type: 'route',    icon: 'truck',   text: 'Route R-02 dispatched with 6 bins scheduled.' },
    { id: 10, ts: mins(320), type: 'recycle', icon: 'leaf',    text: 'Organic waste diversion up 6% compared to last week.' },
  ];
}

function buildWeekly(rangeDays) {
  const rnd = seedRandom(rangeDays * 7 + 3);
  const scale = rangeDays === 7 ? 1 : rangeDays === 30 ? 4.1 : 11.8;
  return DAY_NAMES.map((d) => Math.round((650 + rnd() * 500) * (scale / 7) * 7 / 7 * (scale > 1 ? 1 : 1) * (rangeDays === 7 ? 1 : (rangeDays === 30 ? 1.35 : 1.9))));
}

function buildDistribution(rangeDays) {
  const rnd = seedRandom(rangeDays + 11);
  const base = { Organic: 34, Plastic: 21, Paper: 18, 'General Waste': 19, Glass: 8 };
  const jitter = {};
  let total = 0;
  Object.keys(base).forEach((k) => {
    const v = Math.max(4, Math.round(base[k] + (rnd() - 0.5) * 6));
    jitter[k] = v; total += v;
  });
  Object.keys(jitter).forEach((k) => { jitter[k] = Math.round((jitter[k] / total) * 100); });
  return jitter;
}

function buildRecycling(rangeDays) {
  const rnd = seedRandom(rangeDays + 77);
  const recyclable = Math.round((rangeDays === 7 ? 2100 : rangeDays === 30 ? 8900 : 25400) * (0.9 + rnd() * 0.2));
  const rate = Math.round(64 + rnd() * 14);
  const recovered = Math.round(recyclable * (rate / 100));
  const landfill = recyclable - recovered;
  return { recyclable, recovered, landfill, rate };
}

/* ---------------------------------------------------------------------------
   3. STATE MANAGEMENT (LocalStorage)
   ------------------------------------------------------------------------- */

const State = {
  data: null,
  prefs: null,
};

function defaultState() {
  return {
    bins: buildDemoBins(),
    routes: buildDemoRoutes(),
    activity: buildDemoActivity(),
    aiRecs: null,
    aiRecsGeneratedAt: null,
    createdAt: Date.now(),
  };
}

function defaultPrefs() {
  return {
    theme: 'dark',
    notifications: true,
    refreshInterval: 60,
    analyticsRange: 7,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      State.data = defaultState();
      State.prefs = defaultPrefs();
      saveState();
      return;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.data?.bins)) {
      throw new Error('Invalid stored shape');
    }
    State.data = parsed.data;
    State.prefs = Object.assign(defaultPrefs(), parsed.prefs || {});
  } catch (err) {
    console.warn('EcoBin: could not load saved state, using fresh demo data.', err);
    State.data = defaultState();
    State.prefs = defaultPrefs();
    saveState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: State.data, prefs: State.prefs }));
  } catch (err) {
    console.warn('EcoBin: failed to save state to LocalStorage.', err);
  }
}

/* ---------------------------------------------------------------------------
   4. UTILITIES
   ------------------------------------------------------------------------- */

function icon(name, cls) {
  return `<svg class="${cls || 'w-4 h-4'}" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">${ICONS[name] || ''}</svg>`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

function relativeTime(ts) {
  const diff = Math.max(0, Date.now() - ts);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return mins + (mins === 1 ? ' minute ago' : ' minutes ago');
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + (hrs === 1 ? ' hour ago' : ' hours ago');
  const days = Math.floor(hrs / 24);
  return days + (days === 1 ? ' day ago' : ' days ago');
}

function hoursAgoLabel(h) {
  if (h < 1) return 'Less than an hour ago';
  if (h === 1) return '1 hour ago';
  if (h < 24) return h + ' hours ago';
  const d = Math.floor(h / 24);
  return d + (d === 1 ? ' day ago' : ' days ago');
}

function statusMeta(status) {
  const map = {
    normal:   { label: 'Normal',   badge: 'b-normal',   fillColor: '#34D399', dotClass: 'status-normal' },
    moderate: { label: 'Moderate', badge: 'b-moderate',  fillColor: '#22D3EE', dotClass: 'status-moderate' },
    warning:  { label: 'Warning',  badge: 'b-warning',   fillColor: '#FBBF24', dotClass: 'status-warning' },
    critical: { label: 'Critical', badge: 'b-critical',  fillColor: '#F87171', dotClass: 'status-critical' },
    offline:  { label: 'Offline',  badge: 'b-offline',   fillColor: '#5C7A6E', dotClass: 'status-offline' },
  };
  return map[status] || map.normal;
}

function animateCount(el, target, opts) {
  const suffix = (opts && opts.suffix) || '';
  const duration = (opts && opts.duration) || 900;
  const start = performance.now();
  const from = 0;
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(from + (target - from) * eased);
    el.textContent = val.toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------------------------------------------------------------------------
   5. TOASTS
   ------------------------------------------------------------------------- */

function showToast(message, type) {
  type = type || 'info';
  const container = document.getElementById('toast-container');
  const iconName = type === 'success' ? 'check' : type === 'warning' ? 'alert' : type === 'error' ? 'alert' : 'info';
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.setAttribute('role', 'status');
  el.innerHTML = `${icon(iconName, 'w-4 h-4 mt-0.5 shrink-0')}<span>${escapeHtml(message)}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('removing');
    setTimeout(() => el.remove(), 220);
  }, 3600);
}

/* ---------------------------------------------------------------------------
   6. NAVIGATION
   ------------------------------------------------------------------------- */

let currentSection = 'overview';

function renderNav() {
  const sidebarNav = document.getElementById('sidebar-nav');
  const mobileNav = document.getElementById('mobile-nav');
  const bottomNav = document.getElementById('bottom-nav');
  const bottomOrder = ['overview', 'bins', 'analytics', 'routes', 'ai'];

  sidebarNav.innerHTML = NAV_ITEMS.map((item) => (
    `<button class="nav-item w-full text-left" data-section="${item.id}" aria-current="${item.id === currentSection ? 'page' : 'false'}">
      ${icon(item.icon)}<span>${item.label}</span>
    </button>`
  )).join('');

  mobileNav.innerHTML = NAV_ITEMS.map((item) => (
    `<button class="nav-item w-full text-left" data-section="${item.id}" aria-current="${item.id === currentSection ? 'page' : 'false'}">
      ${icon(item.icon)}<span>${item.label}</span>
    </button>`
  )).join('');

  bottomNav.innerHTML = bottomOrder.map((id) => {
    const item = NAV_ITEMS.find((n) => n.id === id);
    return `<button class="bottom-nav-item" data-section="${id}">${icon(item.icon)}<span>${item.label.split(' ')[0]}</span></button>`;
  }).join('');

  document.querySelectorAll('[data-section]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.section === currentSection);
  });
}

function goToSection(id) {
  currentSection = id;
  document.querySelectorAll('.app-section').forEach((s) => s.classList.add('hidden'));
  const target = document.getElementById('section-' + id);
  if (target) target.classList.remove('hidden');
  renderNav();
  closeMobileDrawer();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'analytics') renderAnalytics();
  if (id === 'bins') renderBins();
  if (id === 'routes') renderRoutes();
  if (id === 'ai') renderAI();
  if (id === 'activity') renderActivityFull();
}

function initNavHandlers() {
  document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('[data-section]');
    if (navBtn) { goToSection(navBtn.dataset.section); return; }
    const trigger = e.target.closest('.nav-trigger');
    if (trigger && trigger.dataset.nav) { goToSection(trigger.dataset.nav); }
  });
}

function openMobileDrawer() {
  document.getElementById('mobile-drawer').classList.remove('-translate-x-full');
  document.getElementById('mobile-drawer-backdrop').classList.remove('hidden');
}
function closeMobileDrawer() {
  document.getElementById('mobile-drawer').classList.add('-translate-x-full');
  document.getElementById('mobile-drawer-backdrop').classList.add('hidden');
}

/* ---------------------------------------------------------------------------
   7. THEME
   ------------------------------------------------------------------------- */

function applyTheme() {
  const isLight = State.prefs.theme === 'light';
  document.documentElement.classList.toggle('light', isLight);
  const label = isLight ? 'Light mode' : 'Dark mode';
  const label2 = document.getElementById('theme-label-desktop');
  if (label2) label2.textContent = label;
  const settingsToggle = document.getElementById('settings-theme-toggle');
  if (settingsToggle) settingsToggle.setAttribute('aria-checked', String(!isLight));
}

function toggleTheme() {
  State.prefs.theme = State.prefs.theme === 'light' ? 'dark' : 'light';
  applyTheme();
  saveState();
  showToast('Switched to ' + (State.prefs.theme === 'light' ? 'light' : 'dark') + ' mode.', 'info');
}

/* ---------------------------------------------------------------------------
   8. KPI CARDS (Overview)
   ------------------------------------------------------------------------- */

function computeKpis() {
  const bins = State.data.bins;
  const total = bins.length;
  const critical = bins.filter((b) => b.status === 'critical').length;
  const active = bins.filter((b) => b.status !== 'offline').length;
  const avgFill = Math.round(bins.reduce((s, b) => s + b.fill, 0) / total);
  return [
    { label: 'Total Smart Bins', value: total, suffix: '', trend: '+2 this month', trendType: 'up', accent: '#34D399', iconName: 'bin', desc: 'Across 8 collection zones' },
    { label: 'Active Bins', value: active, suffix: '', trend: '91.7% online', trendType: 'up', accent: '#22D3EE', iconName: 'zap', desc: 'Reporting normally' },
    { label: 'Critical Bins', value: critical, suffix: '', trend: 'Needs attention', trendType: 'down', accent: '#F87171', iconName: 'alert', desc: 'At or above 90% capacity' },
    { label: 'Average Fill Level', value: avgFill, suffix: '%', trend: '+3.1% vs yesterday', trendType: 'up', accent: '#FBBF24', iconName: 'thermo', desc: 'Network-wide average' },
    { label: 'Waste Collected Today', value: 1284, suffix: ' kg', trend: '+8.4% from last week', trendType: 'up', accent: '#34D399', iconName: 'truck', desc: 'From 6 completed routes' },
    { label: 'Collection Efficiency', value: 89, suffix: '%', trend: '+1.2% improvement', trendType: 'up', accent: '#22D3EE', iconName: 'route', desc: 'On-time collection rate' },
    { label: 'Routes Optimized', value: 12, suffix: '', trend: 'This week', trendType: 'up', accent: '#FBBF24', iconName: 'spark', desc: 'By the AI simulator' },
    { label: 'Recycling Rate', value: 72, suffix: '%', trend: '+4.6% vs last month', trendType: 'up', accent: '#34D399', iconName: 'recycle', desc: 'Recovered material share' },
  ];
}

function renderKpis() {
  const grid = document.getElementById('kpi-grid');
  const kpis = computeKpis();
  grid.innerHTML = kpis.map((k, i) => `
    <div class="kpi-card" style="--kpi-accent:${k.accent}">
      <div class="flex items-start justify-between mb-3">
        <div class="w-9 h-9 rounded-lg grid place-items-center" style="background:${k.accent}1A; color:${k.accent}">${icon(k.iconName, 'w-[18px] h-[18px]')}</div>
        <span class="text-[11px] font-medium ${k.trendType === 'up' ? 'text-leaf-400' : 'text-coral-400'}">${escapeHtml(k.trend)}</span>
      </div>
      <p class="count-up font-display text-2xl font-semibold text-mist-100" id="kpi-value-${i}">0${k.suffix}</p>
      <p class="text-sm text-mist-300 mt-1">${escapeHtml(k.label)}</p>
      <p class="text-xs text-mist-400 mt-0.5">${escapeHtml(k.desc)}</p>
    </div>
  `).join('');
  kpis.forEach((k, i) => {
    const el = document.getElementById('kpi-value-' + i);
    if (el) animateCount(el, k.value, { suffix: k.suffix, duration: 1000 + i * 60 });
  });
}

/* ---------------------------------------------------------------------------
   9. CHARTS (pure CSS/JS — bar + donut)
   ------------------------------------------------------------------------- */

function renderBarChart(container, labels, values, colorFn) {
  const max = Math.max(...values, 1);
  container.innerHTML = values.map((v, i) => {
    const h = Math.max(4, Math.round((v / max) * 100));
    const color = colorFn ? colorFn(i) : '#34D399';
    return `<div class="bar-col">
      <span class="text-[11px] text-mist-300 font-medium">${v.toLocaleString()}</span>
      <div class="w-full flex-1 flex items-end justify-center"><div class="bar-rect" style="height:0%;background:${color}" data-h="${h}"></div></div>
      <span class="text-[11px] text-mist-400">${labels[i]}</span>
    </div>`;
  }).join('');
  requestAnimationFrame(() => {
    container.querySelectorAll('.bar-rect').forEach((el) => { el.style.height = el.dataset.h + '%'; });
  });
}

function donutSvg(segments, size, thickness) {
  size = size || 140; thickness = thickness || 18;
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const circles = segments.map((seg) => {
    const frac = seg.value / total;
    const len = frac * circumference;
    const dash = `${len} ${circumference - len}`;
    const rotate = (offset / total) * 360 - 90;
    offset += seg.value;
    return `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="${thickness}"
      stroke-dasharray="${dash}" transform="rotate(${rotate} ${c} ${c})" stroke-linecap="butt"/>`;
  }).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Distribution donut chart">
    <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="currentColor" stroke-width="${thickness}" class="text-ink-600"/>
    ${circles}
  </svg>`;
}

/* ---------------------------------------------------------------------------
   10. OVERVIEW SECTION
   ------------------------------------------------------------------------- */

function renderOverview() {
  renderKpis();

  const weekly = buildWeekly(7);
  const total = weekly.reduce((a, b) => a + b, 0);
  document.getElementById('overview-week-total').textContent = total.toLocaleString() + ' kg total';
  renderBarChart(
    document.getElementById('overview-weekly-chart'),
    DAY_NAMES.map((d) => d.slice(0, 3)),
    weekly,
    () => '#34D399'
  );

  const bins = State.data.bins;
  const counts = { normal: 0, moderate: 0, warning: 0, critical: 0, offline: 0 };
  bins.forEach((b) => counts[b.status]++);
  const segments = [
    { key: 'normal', value: counts.normal, color: '#34D399', label: 'Normal' },
    { key: 'moderate', value: counts.moderate, color: '#22D3EE', label: 'Moderate' },
    { key: 'warning', value: counts.warning, color: '#FBBF24', label: 'Warning' },
    { key: 'critical', value: counts.critical, color: '#F87171', label: 'Critical' },
    { key: 'offline', value: counts.offline, color: '#5C7A6E', label: 'Offline' },
  ];
  document.getElementById('overview-status-donut').innerHTML = donutSvg(segments, 140, 20);
  document.getElementById('overview-status-legend').innerHTML = segments.map((s) => `
    <div class="flex items-center justify-between">
      <span class="flex items-center gap-2 text-mist-300"><span class="w-2.5 h-2.5 rounded-full" style="background:${s.color}"></span>${s.label}</span>
      <span class="text-mist-100 font-medium">${s.value}</span>
    </div>`).join('');

  const critical = bins.filter((b) => b.status === 'critical' || b.status === 'warning')
    .sort((a, b) => b.fill - a.fill).slice(0, 4);
  const criticalList = document.getElementById('overview-critical-list');
  criticalList.innerHTML = critical.length ? critical.map((b) => {
    const m = statusMeta(b.status);
    return `<button class="w-full flex items-center gap-3 text-left hover:bg-ink-700 rounded-lg p-2 -m-2 transition-colors" data-open-bin="${b.id}">
      <span class="badge ${m.badge}"><span class="badge-dot"></span></span>
      <span class="flex-1 min-w-0">
        <span class="block text-sm font-medium text-mist-100 truncate">${b.id} · ${escapeHtml(b.location)}</span>
        <span class="block text-xs text-mist-400">${escapeHtml(b.wasteType)}</span>
      </span>
      <span class="text-sm font-semibold ${m.dotClass}">${b.fill}%</span>
    </button>`;
  }).join('') : emptyStateHtml('No bins currently need attention', 'All bins are operating within normal range.');
  criticalList.parentElement.querySelector('button[data-nav="bins"]');

  const activityList = document.getElementById('overview-activity-list');
  activityList.innerHTML = State.data.activity.slice(0, 4).map((a) => activityRowHtml(a)).join('');
}

function emptyStateHtml(title, sub) {
  return `<div class="empty-state">
    <div class="w-12 h-12 mx-auto rounded-full bg-ink-700 grid place-items-center mb-3 text-mist-400">${icon('info', 'w-5 h-5')}</div>
    <p class="text-sm font-medium text-mist-200">${escapeHtml(title)}</p>
    <p class="text-xs text-mist-400 mt-1">${escapeHtml(sub)}</p>
  </div>`;
}

function activityRowHtml(a) {
  return `<div class="flex items-start gap-3">
    <div class="w-8 h-8 rounded-full bg-ink-700 border border-ink-600/60 grid place-items-center shrink-0 text-leaf-400">${icon(a.icon, 'w-4 h-4')}</div>
    <div class="min-w-0">
      <p class="text-sm text-mist-200 leading-snug">${escapeHtml(a.text)}</p>
      <p class="text-xs text-mist-400 mt-0.5">${relativeTime(a.ts)}</p>
    </div>
  </div>`;
}

/* ---------------------------------------------------------------------------
   11. SMART BINS SECTION
   ------------------------------------------------------------------------- */

const binFilterOptions = [
  { id: 'all', label: 'All' },
  { id: 'normal', label: 'Normal' },
  { id: 'warning', label: 'Warning' },
  { id: 'critical', label: 'Critical' },
  { id: 'offline', label: 'Offline' },
];
let activeBinFilter = 'all';
let binSearchTerm = '';
let binSortMode = 'fill-desc';

function renderBinFilters() {
  const el = document.getElementById('bin-filters');
  el.innerHTML = binFilterOptions.map((f) => (
    `<button class="filter-chip ${f.id === activeBinFilter ? 'active' : ''}" data-bin-filter="${f.id}">${f.label}</button>`
  )).join('');
}

function getFilteredSortedBins() {
  let bins = State.data.bins.slice();
  if (activeBinFilter !== 'all') bins = bins.filter((b) => b.status === activeBinFilter);
  if (binSearchTerm.trim()) {
    const q = binSearchTerm.trim().toLowerCase();
    bins = bins.filter((b) => b.id.toLowerCase().includes(q) || b.location.toLowerCase().includes(q) || b.wasteType.toLowerCase().includes(q));
  }
  const statusOrder = { critical: 0, warning: 1, moderate: 2, normal: 3, offline: 4 };
  switch (binSortMode) {
    case 'fill-desc': bins.sort((a, b) => b.fill - a.fill); break;
    case 'fill-asc': bins.sort((a, b) => a.fill - b.fill); break;
    case 'location': bins.sort((a, b) => a.location.localeCompare(b.location)); break;
    case 'status': bins.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]); break;
    case 'collection': bins.sort((a, b) => a.lastCollectionHours - b.lastCollectionHours); break;
  }
  return bins;
}

function binCardHtml(b) {
  const m = statusMeta(b.status);
  return `<div class="bin-card" data-open-bin="${b.id}" tabindex="0" role="button" aria-label="View details for bin ${b.id}">
    <div class="flex items-start justify-between mb-4">
      <div>
        <p class="font-display font-semibold text-mist-100 text-sm">${b.id}</p>
        <p class="text-xs text-mist-400 mt-0.5 flex items-center gap-1">${icon('pin', 'w-3 h-3')}${escapeHtml(b.location)}</p>
      </div>
      <span class="badge ${m.badge}"><span class="badge-dot"></span>${m.label}</span>
    </div>
    <div class="flex items-center gap-4">
      <div class="tank">
        <div class="tank-fill" style="height:0%;background:${m.fillColor}" data-h="${b.fill}"></div>
      </div>
      <div class="flex-1 space-y-2">
        <div class="flex items-center justify-between text-xs">
          <span class="text-mist-400">Fill level</span>
          <span class="font-semibold ${m.dotClass}">${b.fill}%</span>
        </div>
        <div class="meter-track"><div class="meter-fill" style="width:0%;background:${m.fillColor}" data-w="${b.fill}"></div></div>
        <div class="flex items-center justify-between text-xs text-mist-400 pt-1">
          <span class="flex items-center gap-1">${icon('leaf', 'w-3 h-3')}${escapeHtml(b.wasteType)}</span>
          <span class="flex items-center gap-1">${icon('battery', 'w-3 h-3')}${b.battery}%</span>
        </div>
      </div>
    </div>
    <div class="mt-4 pt-3 border-t border-ink-600/50 flex items-center justify-between text-xs text-mist-400">
      <span class="flex items-center gap-1">${icon('clock', 'w-3 h-3')}${hoursAgoLabel(b.lastCollectionHours)}</span>
      <span class="flex items-center gap-1">${icon('thermo', 'w-3 h-3')}${b.temp}°C</span>
    </div>
  </div>`;
}

function renderBins() {
  renderBinFilters();
  const bins = getFilteredSortedBins();
  const grid = document.getElementById('bin-grid');
  const empty = document.getElementById('bin-empty');
  document.getElementById('bin-results-count').textContent = `${bins.length} of ${State.data.bins.length} bins shown`;

  if (bins.length === 0) {
    grid.innerHTML = '';
    grid.classList.add('hidden');
    empty.classList.remove('hidden');
    empty.innerHTML = emptyStateHtml('No smart bins found', 'No smart bins match your current filters.');
    return;
  }
  grid.classList.remove('hidden');
  empty.classList.add('hidden');
  grid.innerHTML = bins.map(binCardHtml).join('');
  requestAnimationFrame(() => {
    grid.querySelectorAll('.tank-fill').forEach((el) => { el.style.height = el.dataset.h + '%'; });
    grid.querySelectorAll('.meter-fill').forEach((el) => { el.style.width = el.dataset.w + '%'; });
  });
}

function initBinControls() {
  document.getElementById('bin-search').addEventListener('input', (e) => {
    binSearchTerm = e.target.value;
    renderBins();
  });
  document.getElementById('bin-sort').addEventListener('change', (e) => {
    binSortMode = e.target.value;
    renderBins();
  });
  document.getElementById('bin-filters').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-bin-filter]');
    if (!chip) return;
    activeBinFilter = chip.dataset.binFilter;
    renderBins();
  });
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open-bin]');
    if (opener) openBinModal(opener.dataset.openBin);
  });
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.dataset && document.activeElement.dataset.openBin) {
      e.preventDefault();
      openBinModal(document.activeElement.dataset.openBin);
    }
  });
}

/* ---------------------------------------------------------------------------
   12. BIN DETAIL MODAL
   ------------------------------------------------------------------------- */

let lastFocusedEl = null;

function openBinModal(binId) {
  const b = State.data.bins.find((x) => x.id === binId);
  if (!b) return;
  const m = statusMeta(b.status);
  const needsCollection = b.fill >= 80;
  const nextSuggested = needsCollection ? 'Within next 6 hours' : (b.fill >= 50 ? 'Within 1–2 days' : 'Within 3–5 days');

  const historyBars = b.history.map((h, i) => `
    <div class="flex-1 flex flex-col items-center gap-1.5">
      <div class="w-full bg-ink-700 rounded-t" style="height:${Math.max(6, h)}px; max-height:70px; background:${statusMeta(statusFromFill(h)).fillColor}; opacity:${0.5 + (i / b.history.length) * 0.5}"></div>
      <span class="text-[9px] text-mist-400">${['−5d','−4d','−3d','−2d','−1d','Now'][i]}</span>
    </div>`).join('');

  document.getElementById('bin-modal-body').innerHTML = `
    <div class="p-6">
      <div class="flex items-start justify-between mb-1">
        <div>
          <p id="bin-modal-title" class="font-display text-xl font-semibold text-mist-100">${b.id}</p>
          <p class="text-sm text-mist-400 flex items-center gap-1 mt-0.5">${icon('pin', 'w-3.5 h-3.5')}${escapeHtml(b.location)}</p>
        </div>
        <button id="close-bin-modal" class="p-1.5 -mr-1.5 -mt-1.5 text-mist-400 hover:text-mist-100" aria-label="Close dialog">${icon('close', 'w-5 h-5')}</button>
      </div>

      <div class="flex items-center gap-2 my-4">
        <span class="badge ${m.badge}"><span class="badge-dot"></span>${m.label}</span>
        ${needsCollection ? `<span class="badge b-critical">${icon('truck', 'w-3 h-3')}Collection Required</span>` : ''}
      </div>

      <div class="flex items-center gap-5 bg-ink-700/60 rounded-xl p-4 mb-4">
        <div class="tank" style="width:44px;height:82px;">
          <div class="tank-fill" style="height:${b.fill}%;background:${m.fillColor}"></div>
        </div>
        <div>
          <p class="font-display text-3xl font-semibold text-mist-100">${b.fill}<span class="text-lg text-mist-400">%</span></p>
          <p class="text-xs text-mist-400">Current fill level</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-5">
        ${detailRow('leaf', 'Waste type', b.wasteType)}
        ${detailRow('thermo', 'Temperature', b.temp + '°C')}
        ${detailRow('battery', 'Battery', b.battery + '%')}
        ${detailRow('clock', 'Last collection', hoursAgoLabel(b.lastCollectionHours))}
      </div>

      <div class="bg-ink-700/60 rounded-xl p-4 mb-5">
        <p class="text-xs text-mist-400 mb-1">Next suggested collection</p>
        <p class="text-sm font-medium text-mist-100">${nextSuggested}</p>
      </div>

      <div class="mb-1">
        <p class="text-xs text-mist-400 mb-2">Fill history (last 5 days)</p>
        <div class="flex items-end gap-2 h-20 bg-ink-700/40 rounded-lg p-3">${historyBars}</div>
      </div>
    </div>
  `;

  function detailRow(iconName, label, value) {
    return `<div class="bg-ink-700/40 rounded-lg p-3">
      <p class="text-[11px] text-mist-400 flex items-center gap-1.5 mb-1">${icon(iconName, 'w-3.5 h-3.5')}${label}</p>
      <p class="text-sm font-medium text-mist-100">${escapeHtml(value)}</p>
    </div>`;
  }

  lastFocusedEl = document.activeElement;
  const backdrop = document.getElementById('bin-modal-backdrop');
  backdrop.classList.remove('hidden');
  backdrop.classList.add('open', 'flex');
  document.getElementById('close-bin-modal').addEventListener('click', closeBinModal);
  document.getElementById('close-bin-modal').focus();
}

function closeBinModal() {
  const backdrop = document.getElementById('bin-modal-backdrop');
  backdrop.classList.add('hidden');
  backdrop.classList.remove('open', 'flex');
  if (lastFocusedEl) lastFocusedEl.focus();
}

function initModalHandlers() {
  const binBackdrop = document.getElementById('bin-modal-backdrop');
  binBackdrop.addEventListener('click', (e) => { if (e.target === binBackdrop) closeBinModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBinModal();
      closeConfirmModal();
    }
  });
}

/* ---------------------------------------------------------------------------
   13. ANALYTICS SECTION
   ------------------------------------------------------------------------- */

const rangeOptions = [
  { id: 7, label: '7 Days' },
  { id: 30, label: '30 Days' },
  { id: 90, label: '3 Months' },
];

function renderRangeSelector() {
  const el = document.getElementById('analytics-range');
  el.innerHTML = rangeOptions.map((r) => (
    `<button class="filter-chip ${r.id === State.prefs.analyticsRange ? 'active' : ''}" data-range="${r.id}">${r.label}</button>`
  )).join('');
}

function renderAnalytics() {
  renderRangeSelector();
  const range = State.prefs.analyticsRange;

  const dist = buildDistribution(range);
  const colors = { Organic: '#34D399', Plastic: '#22D3EE', Paper: '#FBBF24', 'General Waste': '#8FA69B', Glass: '#F87171' };
  const segments = Object.keys(dist).map((k) => ({ label: k, value: dist[k], color: colors[k] }));
  document.getElementById('analytics-donut').innerHTML = donutSvg(segments, 160, 22);
  document.getElementById('analytics-donut-legend').innerHTML = segments.map((s) => `
    <div class="flex items-center justify-between">
      <span class="flex items-center gap-2 text-mist-300"><span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:${s.color}"></span>${s.label}</span>
      <span class="text-mist-100 font-medium">${s.value}%</span>
    </div>`).join('');

  const rec = buildRecycling(range);
  document.getElementById('analytics-recycling').innerHTML = `
    <div>
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-mist-300">Recyclable waste collected</span>
        <span class="text-sm font-semibold text-mist-100">${rec.recyclable.toLocaleString()} kg</span>
      </div>
      <div class="meter-track"><div class="meter-fill" style="width:100%;background:#22D3EE"></div></div>
    </div>
    <div>
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-mist-300">Recovered material</span>
        <span class="text-sm font-semibold text-mist-100">${rec.recovered.toLocaleString()} kg</span>
      </div>
      <div class="meter-track"><div class="meter-fill" style="width:${rec.rate}%;background:#34D399"></div></div>
    </div>
    <div>
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-mist-300">Landfill-bound waste</span>
        <span class="text-sm font-semibold text-mist-100">${rec.landfill.toLocaleString()} kg</span>
      </div>
      <div class="meter-track"><div class="meter-fill" style="width:${100 - rec.rate}%;background:#F87171"></div></div>
    </div>
    <div class="flex items-center justify-between pt-3 border-t border-ink-600/50">
      <span class="text-sm text-mist-300">Recycling rate</span>
      <span class="font-display text-lg font-semibold text-leaf-400">${rec.rate}%</span>
    </div>
  `;

  const weekly = buildWeekly(range);
  const wLabels = range === 7 ? DAY_NAMES.map((d) => d.slice(0, 3)) : weekly.map((_, i) => 'W' + (i + 1));
  document.getElementById('analytics-week-total').textContent = weekly.reduce((a, b) => a + b, 0).toLocaleString() + ' kg total';
  renderBarChart(document.getElementById('analytics-weekly-chart'), wLabels, weekly, (i) => (i % 2 === 0 ? '#34D399' : '#22D3EE'));
}

function initAnalyticsControls() {
  document.getElementById('analytics-range').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-range]');
    if (!chip) return;
    State.prefs.analyticsRange = Number(chip.dataset.range);
    saveState();
    renderAnalytics();
  });
}

/* ---------------------------------------------------------------------------
   14. COLLECTION ROUTES
   ------------------------------------------------------------------------- */

function priorityBadgeClass(p) {
  return p === 'High' ? 'b-critical' : p === 'Medium' ? 'b-warning' : 'b-normal';
}
function statusBadgeClass(s) {
  return s === 'Active' ? 'b-moderate' : s === 'Scheduled' ? 'b-warning' : 'b-normal';
}

function routeCardHtml(r) {
  return `<div class="route-card" data-route="${r.id}">
    <div class="flex items-start justify-between mb-3">
      <div>
        <p class="font-display font-semibold text-mist-100">${r.name}</p>
        <p class="text-xs text-mist-400 mt-0.5">${escapeHtml(r.zone)}</p>
      </div>
      <span class="badge ${statusBadgeClass(r.status)}"><span class="badge-dot"></span>${r.status}</span>
    </div>
    <div class="grid grid-cols-3 gap-2 mb-4">
      <div class="bg-ink-700/50 rounded-lg p-2.5 text-center">
        <p class="font-display font-semibold text-mist-100 text-sm">${r.bins}</p>
        <p class="text-[10px] text-mist-400 mt-0.5">Bins</p>
      </div>
      <div class="bg-ink-700/50 rounded-lg p-2.5 text-center">
        <p class="font-display font-semibold text-mist-100 text-sm">${r.distance} km</p>
        <p class="text-[10px] text-mist-400 mt-0.5">Distance</p>
      </div>
      <div class="bg-ink-700/50 rounded-lg p-2.5 text-center">
        <p class="font-display font-semibold text-mist-100 text-sm">${r.time} min</p>
        <p class="text-[10px] text-mist-400 mt-0.5">Est. time</p>
      </div>
    </div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-xs text-mist-400">Priority</span>
      <span class="badge ${priorityBadgeClass(r.priority)}"><span class="badge-dot"></span>${r.priority}</span>
    </div>
    <div class="flex gap-2">
      <button class="flex-1 text-xs font-medium bg-ink-700 hover:bg-ink-600 border border-ink-500/60 text-mist-100 rounded-lg py-2 transition-colors" data-route-action="view" data-route-id="${r.id}">View Route</button>
      <button class="flex-1 text-xs font-medium bg-leaf-500 hover:bg-leaf-400 text-ink-950 rounded-lg py-2 transition-colors" data-route-action="optimize" data-route-id="${r.id}">Optimize Route</button>
    </div>
  </div>`;
}

function renderRoutes() {
  document.getElementById('routes-grid').innerHTML = State.data.routes.map(routeCardHtml).join('');
}

function initRouteControls() {
  document.getElementById('routes-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-route-action]');
    if (!btn) return;
    const route = State.data.routes.find((r) => r.id === btn.dataset.routeId);
    if (!route) return;
    if (btn.dataset.routeAction === 'view') {
      showToast(`${route.name}: ${route.bins} bins · ${route.distance} km · est. ${route.time} min · ${route.zone}`, 'info');
    } else {
      const before = route.distance;
      const reduction = 0.06 + Math.random() * 0.1;
      route.distance = Math.round(before * (1 - reduction) * 10) / 10;
      route.time = Math.max(8, Math.round(route.time * (1 - reduction)));
      route.status = 'Scheduled';
      saveState();
      renderRoutes();
      showToast(`${route.name} optimized — distance reduced from ${before} km to ${route.distance} km.`, 'success');
      addActivity('route', 'spark', `Route ${route.id} re-optimized, saving ${(before - route.distance).toFixed(1)} km.`);
    }
  });
}

/* ---------------------------------------------------------------------------
   15. AI ROUTE OPTIMIZATION SIMULATOR
   ------------------------------------------------------------------------- */

function generateInsights() {
  const bins = State.data.bins;
  const critical = bins.filter((b) => b.status === 'critical');
  const warning = bins.filter((b) => b.status === 'warning');
  const zoneFill = {};
  bins.forEach((b) => {
    if (!zoneFill[b.zone]) zoneFill[b.zone] = { total: 0, count: 0 };
    zoneFill[b.zone].total += b.fill; zoneFill[b.zone].count++;
  });
  let topZone = null, topAvg = -1;
  Object.keys(zoneFill).forEach((z) => {
    const avg = zoneFill[z].total / zoneFill[z].count;
    if (avg > topAvg) { topAvg = avg; topZone = z; }
  });
  const activeRoutes = State.data.routes.filter((r) => r.status !== 'Completed');
  const potentialSaving = 6 + Math.round(Math.random() * 10);
  const recycleDelta = 3 + Math.round(Math.random() * 8);

  return [
    { icon: 'alert', accent: '#F87171', title: 'Critical Capacity Alert', text: `${critical.length} bin${critical.length === 1 ? '' : 's'} require attention within the next collection cycle.` },
    { icon: 'route', accent: '#22D3EE', title: 'Route Optimization', text: `An alternative route sequence could reduce simulated travel distance by approximately ${potentialSaving}%.` },
    { icon: 'recycle', accent: '#34D399', title: 'Recycling Insight', text: `Recyclable waste collection has increased by about ${recycleDelta}% compared with the previous period.` },
    { icon: 'pin', accent: '#FBBF24', title: 'Location Insight', text: `${topZone} zone currently has the highest average bin fill level, at ${Math.round(topAvg)}%.` },
    { icon: 'spark', accent: '#8FA69B', title: 'Fleet Insight', text: `${activeRoutes.length} route${activeRoutes.length === 1 ? ' is' : 's are'} active or scheduled across the network right now.` },
  ];
}

function generateRecommendations() {
  const bins = State.data.bins.slice().sort((a, b) => b.fill - a.fill);
  const recs = [];

  bins.filter((b) => b.status === 'critical').slice(0, 3).forEach((b) => {
    recs.push({ icon: 'alert', priority: 'High', text: `Bin ${b.id} has reached ${b.fill}% capacity in ${b.location}. Consider prioritizing this location in the next collection cycle.` });
  });

  const zoneCounts = {};
  bins.filter((b) => b.status === 'warning' || b.status === 'critical').forEach((b) => {
    zoneCounts[b.zone] = (zoneCounts[b.zone] || 0) + 1;
  });
  Object.keys(zoneCounts).filter((z) => zoneCounts[z] >= 3).forEach((z) => {
    recs.push({ icon: 'pin', priority: 'Medium', text: `${zoneCounts[z]} bins in the ${z} zone are approaching critical capacity. A dedicated sweep could reduce risk of overflow.` });
  });

  const routes = State.data.routes;
  const active = routes.filter((r) => r.status === 'Active' || r.status === 'Scheduled');
  if (active.length >= 2) {
    const [r1, r2] = active;
    recs.push({ icon: 'route', priority: 'Medium', text: `Combining ${r1.name} and ${r2.name} could reduce estimated travel distance in this simulated scenario.` });
  }

  const offline = bins.filter((b) => b.status === 'offline');
  if (offline.length) {
    recs.push({ icon: 'zap', priority: 'Low', text: `${offline.length} bin${offline.length === 1 ? '' : 's'} appear offline. Dispatching a technician could restore live fill reporting.` });
  }

  const lowBattery = bins.filter((b) => b.battery < 25 && b.status !== 'offline');
  if (lowBattery.length) {
    recs.push({ icon: 'battery', priority: 'Low', text: `${lowBattery.length} bin${lowBattery.length === 1 ? '' : 's'} report low battery. Schedule maintenance to avoid reporting gaps.` });
  }

  if (recs.length === 0) {
    recs.push({ icon: 'check', priority: 'Low', text: 'All bins and routes are within normal operating parameters. No urgent action recommended right now.' });
  }
  return recs;
}

function renderAI() {
  const insights = generateInsights();
  document.getElementById('ai-insight-grid').innerHTML = insights.map((ins) => `
    <div class="kpi-card" style="--kpi-accent:${ins.accent}">
      <div class="w-9 h-9 rounded-lg grid place-items-center mb-3" style="background:${ins.accent}1A; color:${ins.accent}">${icon(ins.icon, 'w-[18px] h-[18px]')}</div>
      <p class="text-sm font-semibold text-mist-100 mb-1">${ins.title}</p>
      <p class="text-xs text-mist-400 leading-relaxed">${ins.text}</p>
    </div>`).join('');

  if (!State.data.aiRecs) {
    State.data.aiRecs = generateRecommendations();
    State.data.aiRecsGeneratedAt = Date.now();
    saveState();
  }
  renderRecsList();
}

function renderRecsList() {
  const list = document.getElementById('ai-recs-list');
  list.innerHTML = State.data.aiRecs.map((r) => `
    <div class="flex items-start gap-3 bg-ink-700/40 rounded-lg p-3.5">
      <div class="w-8 h-8 rounded-lg bg-ink-700 grid place-items-center shrink-0 text-leaf-400">${icon(r.icon, 'w-4 h-4')}</div>
      <p class="text-sm text-mist-200 leading-relaxed flex-1">${escapeHtml(r.text)}</p>
      <span class="badge ${priorityBadgeClass(r.priority)} shrink-0"><span class="badge-dot"></span>${r.priority}</span>
    </div>`).join('');
}

function initAIControls() {
  document.getElementById('generate-recs-btn').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    btn.classList.add('opacity-60');
    setTimeout(() => {
      State.data.aiRecs = generateRecommendations();
      State.data.aiRecsGeneratedAt = Date.now();
      saveState();
      renderRecsList();
      renderAI();
      btn.disabled = false;
      btn.classList.remove('opacity-60');
      showToast('New AI-assisted recommendations generated.', 'success');
      addActivity('ai', 'spark', 'New route recommendation generated by the AI simulator.');
    }, 500);
  });
}

/* ---------------------------------------------------------------------------
   16. ACTIVITY TIMELINE
   ------------------------------------------------------------------------- */

function addActivity(type, iconName, text) {
  State.data.activity.unshift({ id: Date.now(), ts: Date.now(), type, icon: iconName, text });
  State.data.activity = State.data.activity.slice(0, 40);
  saveState();
}

function renderActivityFull() {
  const list = document.getElementById('activity-full-list');
  const empty = document.getElementById('activity-empty');
  const items = State.data.activity;
  if (!items.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    empty.innerHTML = emptyStateHtml('No Activity', 'No recent operational activity is available.');
    return;
  }
  empty.classList.add('hidden');
  list.innerHTML = items.map((a) => `
    <div class="timeline-item">
      <div class="timeline-dot text-leaf-400">${icon(a.icon, 'w-3 h-3')}</div>
      <p class="text-sm text-mist-200 leading-relaxed">${escapeHtml(a.text)}</p>
      <p class="text-xs text-mist-400 mt-0.5">${relativeTime(a.ts)}</p>
    </div>`).join('');
}

/* ---------------------------------------------------------------------------
   17. NOTIFICATIONS PANEL
   ------------------------------------------------------------------------- */

function renderNotifications() {
  const bins = State.data.bins;
  const critical = bins.filter((b) => b.status === 'critical').slice(0, 5);
  const list = document.getElementById('notif-list');
  if (!critical.length) {
    list.innerHTML = `<div class="p-4">${emptyStateHtml('All clear', 'No critical alerts right now.')}</div>`;
    return;
  }
  list.innerHTML = critical.map((b) => `
    <button class="w-full text-left px-4 py-3 hover:bg-ink-700 flex items-start gap-3" data-open-bin="${b.id}">
      <span class="text-coral-400 mt-0.5">${icon('alert', 'w-4 h-4')}</span>
      <span class="min-w-0">
        <span class="block text-sm text-mist-100">${b.id} at ${b.fill}% capacity</span>
        <span class="block text-xs text-mist-400 mt-0.5">${escapeHtml(b.location)}</span>
      </span>
    </button>`).join('');
}

function initNotifPanel() {
  const btn = document.getElementById('notif-btn');
  const panel = document.getElementById('notif-panel');
  btn.addEventListener('click', () => {
    panel.classList.toggle('hidden');
    document.getElementById('notif-dot').classList.add('hidden');
  });
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) panel.classList.add('hidden');
  });
  document.getElementById('clear-notifs').addEventListener('click', () => {
    panel.classList.add('hidden');
    showToast('Notifications cleared.', 'info');
  });
}

/* ---------------------------------------------------------------------------
   18. SETTINGS
   ------------------------------------------------------------------------- */

function renderSettings() {
  document.getElementById('settings-theme-toggle').setAttribute('aria-checked', String(State.prefs.theme !== 'light'));
  document.getElementById('settings-notif-toggle').setAttribute('aria-checked', String(State.prefs.notifications));
  document.getElementById('settings-refresh').value = String(State.prefs.refreshInterval);
}

function initSettingsControls() {
  document.getElementById('settings-theme-toggle').addEventListener('click', () => { toggleTheme(); renderSettings(); });

  document.getElementById('settings-notif-toggle').addEventListener('click', (e) => {
    State.prefs.notifications = !State.prefs.notifications;
    e.currentTarget.setAttribute('aria-checked', String(State.prefs.notifications));
    saveState();
    showToast('Notification preference saved.', 'success');
  });

  document.getElementById('settings-refresh').addEventListener('change', (e) => {
    State.prefs.refreshInterval = Number(e.target.value);
    saveState();
    showToast('Dashboard refresh preference saved.', 'success');
    setupAutoRefresh();
  });

  document.getElementById('export-data-btn').addEventListener('click', () => {
    const payload = { exportedAt: new Date().toISOString(), data: State.data, prefs: State.prefs, app: 'EcoBin Smart Waste Management Dashboard' };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecobin-dashboard-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Dashboard data exported.', 'success');
  });

  document.getElementById('import-data-input').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || !parsed.data || !Array.isArray(parsed.data.bins) || !Array.isArray(parsed.data.routes) || !Array.isArray(parsed.data.activity)) {
          throw new Error('Missing required fields (bins, routes, activity).');
        }
        State.data = parsed.data;
        if (parsed.prefs) State.prefs = Object.assign(defaultPrefs(), parsed.prefs);
        saveState();
        applyTheme();
        renderEverything();
        showToast('Dashboard data imported successfully.', 'success');
      } catch (err) {
        showToast('Import failed: the file is not a valid EcoBin export.', 'error');
        console.warn('EcoBin import error:', err);
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('reset-data-btn').addEventListener('click', openConfirmModal);
  document.getElementById('confirm-cancel').addEventListener('click', closeConfirmModal);
  document.getElementById('confirm-reset').addEventListener('click', () => {
    State.data = defaultState();
    saveState();
    renderEverything();
    closeConfirmModal();
    showToast('Simulated data has been reset.', 'warning');
  });
  const confirmBackdrop = document.getElementById('confirm-modal-backdrop');
  confirmBackdrop.addEventListener('click', (e) => { if (e.target === confirmBackdrop) closeConfirmModal(); });
}

function openConfirmModal() {
  const backdrop = document.getElementById('confirm-modal-backdrop');
  backdrop.classList.remove('hidden');
  backdrop.classList.add('open', 'flex');
}
function closeConfirmModal() {
  const backdrop = document.getElementById('confirm-modal-backdrop');
  backdrop.classList.add('hidden');
  backdrop.classList.remove('open', 'flex');
}

/* ---------------------------------------------------------------------------
   19. AUTO REFRESH (simulated live data drift)
   ------------------------------------------------------------------------- */

let refreshTimer = null;

function setupAutoRefresh() {
  if (refreshTimer) clearInterval(refreshTimer);
  const interval = State.prefs.refreshInterval;
  if (!interval) return;
  refreshTimer = setInterval(() => {
    State.data.bins.forEach((b) => {
      if (b.status === 'offline') return;
      const drift = Math.round((Math.random() - 0.35) * 4);
      b.fill = Math.max(0, Math.min(100, b.fill + drift));
      b.status = statusFromFill(b.fill, false);
    });
    saveState();
    if (currentSection === 'overview') renderOverview();
    if (currentSection === 'bins') renderBins();
  }, interval * 1000);
}

/* ---------------------------------------------------------------------------
   20. HEADER (date / greeting)
   ------------------------------------------------------------------------- */

function renderHeader() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning, Admin' : hour < 18 ? 'Good afternoon, Admin' : 'Good evening, Admin';
  document.getElementById('header-greeting').textContent = greeting;
  document.getElementById('header-date').textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

/* ---------------------------------------------------------------------------
   21. GLOBAL INIT
   ------------------------------------------------------------------------- */

function renderEverything() {
  renderHeader();
  renderNav();
  renderOverview();
  renderBins();
  renderAnalytics();
  renderRoutes();
  renderAI();
  renderActivityFull();
  renderSettings();
  renderNotifications();
}

function initMobileDrawer() {
  document.getElementById('open-drawer').addEventListener('click', openMobileDrawer);
  document.getElementById('close-drawer').addEventListener('click', closeMobileDrawer);
  document.getElementById('mobile-drawer-backdrop').addEventListener('click', closeMobileDrawer);
}

function initThemeToggles() {
  document.getElementById('theme-toggle-desktop').addEventListener('click', toggleTheme);
  document.getElementById('theme-toggle-mobile').addEventListener('click', toggleTheme);
}

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  applyTheme();
  renderHeader();
  renderNav();
  goToSection('overview');
  renderBins();
  renderAnalytics();
  renderRoutes();
  renderAI();
  renderActivityFull();
  renderSettings();
  renderNotifications();

  initNavHandlers();
  initMobileDrawer();
  initThemeToggles();
  initBinControls();
  initModalHandlers();
  initAnalyticsControls();
  initRouteControls();
  initAIControls();
  initNotifPanel();
  initSettingsControls();
  setupAutoRefresh();
});
