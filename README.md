# ♻️ EcoBin — Smart Waste Management Dashboard

**Companion operations interface for the EcoBin 2.0 concept — "The Next Generation AI Bin."**

A frontend-only, portfolio-grade dashboard for monitoring smart waste bins, understanding waste segregation statistics, reviewing collection routes, and exploring rule-based, AI-assisted route optimization recommendations.

---

## 🖼️ Overview

EcoBin Smart Waste Management Dashboard is a static, single-page web application that simulates the operations console a smart-city waste management team might use day to day: live bin fill levels, waste analytics, collection route status, and simulated AI recommendations — all running entirely in the browser.

This project was built as a **frontend engineering and product design portfolio piece**. It has no backend, no database, and no external services. All data is generated and persisted locally using JavaScript and `localStorage`.

## 🎯 Problem Statement

Urban waste collection is often reactive: trucks run fixed routes regardless of how full bins actually are, leading to wasted trips, overflow, and inefficient fuel use. A smart, data-informed dashboard — even in prototype form — helps demonstrate how real-time bin telemetry and simple optimization logic can make collection more efficient.

## 🎯 Objectives

- Visualize the live status of a network of smart bins (fill level, temperature, battery, waste type).
- Surface actionable insights on waste composition and recycling performance.
- Represent collection routes and simulate the effect of route optimization.
- Demonstrate, transparently, how rule-based "AI" recommendations could work in a real system — without claiming to run an actual model.
- Ship a fully static, dependency-light app that deploys in minutes on Cloudflare Pages.

## ✨ Key Features

- **Overview dashboard** with animated KPI counters, a 7-day collection chart, a bin-status donut chart, top at-risk bins, and recent activity.
- **Smart Bins** grid with live search, status/priority filters, multi-field sorting, and a detailed bin modal (fill history, battery, temperature, next suggested collection).
- **Waste Analytics** with waste-distribution donut chart, recycling performance breakdown, and a weekly/30-day/3-month collection volume chart.
- **Collection Routes** with functional **View Route** and **Optimize Route** actions that simulate distance and time reductions.
- **AI Route Optimization Simulator** — clearly labeled rule-based recommendation engine driven by current bin fill, priority, zone and route data.
- **AI insight cards** summarizing critical alerts, optimization potential, recycling trends, and zone-level hotspots.
- **Activity timeline** of simulated operational events.
- **Settings** for theme, notifications, refresh interval, and data export / import / reset.
- Fully **responsive** (desktop sidebar, tablet, mobile drawer + bottom nav), **accessible** (semantic HTML, ARIA, keyboard-friendly modals, visible focus states), and animated with restrained, purposeful micro-interactions.

## 🧩 Dashboard Modules

| Module | Description |
|---|---|
| Overview | KPI summary, weekly volume chart, bin status mix, at-risk bins, recent activity |
| Smart Bins | Searchable, filterable, sortable bin inventory with detail modal |
| Waste Analytics | Waste distribution, recycling performance, collection volume trends |
| Collection Routes | Route cards with view/optimize actions |
| AI Recommendations | Rule-based optimization insights and recommendation feed |
| Activity | Full operational activity timeline |
| Settings | Theme, notifications, refresh interval, data export/import/reset |

## 🤖 About the AI Recommendation Simulator

> This portfolio prototype uses rule-based logic and simulated operational data to demonstrate how AI-assisted waste collection optimization could work in a real smart-city system.

The simulator does **not** call any external AI/ML API. It evaluates simple, transparent rules against the current in-memory dataset — bin fill percentage, status, zone concentration, route load, and battery health — to produce contextual recommendation text. Recommendations regenerate on demand and change as the underlying simulated data changes.

## 🛠️ Technology Stack

- **HTML5** — semantic structure
- **Tailwind CSS** (via CDN, no build step) — utility styling
- **Vanilla JavaScript (ES6+)** — all app logic, state, and rendering
- **Custom CSS** (`style.css`) — theming, animation, and bespoke components (bin "tank" gauge, timeline, toasts)
- **Browser LocalStorage** — persistence for bins, routes, activity, and preferences

No frameworks, no npm build pipeline, no bundler required.

## 🏗️ System Architecture

```
Browser
 ├── index.html      → structure & Tailwind config
 ├── style.css        → theme tokens, animation, bespoke components
 ├── script.js         → state, simulated data generators, rendering, events
 └── localStorage      → ecobin_state_v1 { data: {...}, prefs: {...} }
```

There is no server tier. On first load, `script.js` seeds a deterministic demo dataset (48 bins, 5 routes, activity feed) and writes it to `localStorage`. On every subsequent load, the saved state is read back and rendered. All interactions (filtering, sorting, optimizing a route, generating recommendations, editing settings) mutate the in-memory state and persist it back to `localStorage`.

## 🧪 Methodology

- **Bin status** is derived from fill percentage: 0–49% Normal, 50–79% Moderate, 80–89% Warning, 90–100% Critical (or Offline if the bin isn't reporting).
- **Route optimization** applies a randomized-but-bounded distance/time reduction (6–16%) to simulate the effect of resequencing stops, and logs the change to the activity feed.
- **AI recommendations** are generated by inspecting the current bin and route arrays for critical bins, zone hotspots, mergeable routes, offline bins, and low-battery bins, then formatting plain-language suggestions.
- **Analytics ranges** (7 / 30 / 90 days) use a seeded pseudo-random generator so values are stable within a session but vary sensibly by range.

## 📁 Project Structure

```
ecobin-smart-waste-dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 💻 Local Setup

No build tools or installation required.

1. Download or clone this project folder.
2. Open `index.html` directly in any modern browser (Chrome, Firefox, Edge, Safari).

Optional (recommended for consistent relative-path behavior): serve it with any static file server, e.g.:

```bash
# Python
python3 -m http.server 8080

# Node (if installed)
npx serve .
```

Then visit `http://localhost:8080`.

## ☁️ Deploying to Cloudflare Pages

This project is a plain static site and deploys to **Cloudflare Pages** with no build command and no environment variables.

### Option 1 — Direct Upload

1. Create or open a Cloudflare account.
2. Go to **Workers & Pages → Pages**.
3. Click **Create a project → Upload assets** (direct upload / static deployment option).
4. Upload the project folder containing `index.html`, `style.css`, and `script.js`.
5. Click **Deploy site**.
6. Cloudflare will provide a public `*.pages.dev` URL.

### Option 2 — GitHub Integration

1. Push this project to a GitHub repository.
2. In Cloudflare Pages, choose **Connect to Git** and select the repository.
3. Leave the build command empty and set the output directory to the project root (`/`).
4. Deploy — Cloudflare will automatically redeploy on every push to the connected branch.

No Cloudflare Workers, Functions, KV, or database bindings are required.

## 📸 Screenshots

_Add screenshots of the Overview, Smart Bins, Analytics, Routes, and AI Recommendations sections here once deployed._

## ⚠️ Limitations

- This is a **frontend prototype**. All bin, route, and activity data is **simulated**, not sourced from real hardware.
- There is **no real IoT connectivity** — no MQTT, LoRaWAN, or sensor integration.
- AI recommendations are **rule-based**, not generated by a machine learning model or external AI API.
- Data is stored per-browser in `localStorage`; it is not synced across devices or users.
- Simulated "live" updates (auto-refresh) apply small randomized drift to fill levels for demonstration purposes only.

## 🚀 Future Improvements

- Connect to real IoT sensor telemetry (e.g., ultrasonic fill sensors) via a backend ingestion service.
- Replace the rule-based simulator with a real optimization model (e.g., vehicle routing problem solver) or ML-based fill-level forecasting.
- Add multi-user roles, authentication, and audit logging for a production deployment.
- Persist data in a real database and expose a proper API instead of LocalStorage.
- Add map-based route visualization and geofencing.

## 👤 Author

Built as a frontend engineering & product design portfolio project.

- GitHub — github.com/Majortarif   
- LinkedIn — https://www.linkedin.com/in/tariful-hoque-582321259/
- Portfolio — tarifulhoqueportfoloi.netlify.app

---

**EcoBin Smart Waste Management Dashboard** · Frontend Portfolio Prototype · Built with HTML, Tailwind CSS & JavaScript.
