# 🌆 Soham Kolhe — Cyberpunk Portfolio & Developer Grid

Welcome to the Grid. This is a highly interactive, responsive, and developer-centric portfolio designed around a **Cyberpunk / Neon City HUD** aesthetic.

---

## ⚡ Tech Stack & Architecture

- **Core Framework**: React 19 + Vite
- **3D Graphics**: Three.js + React Three Fiber + `@react-three/drei`, with a `PerformanceMonitor`-driven degraded mode for lower-end devices
- **Smooth Scroll**: Lenis, synced to GSAP's ticker
- **Animations**: GSAP + ScrollTrigger, with `matchMedia`-based scrub vs. one-shot reveal variants for desktop/mobile
- **Styling**: Vanilla CSS with custom properties and a shared design-token file (`src/index.css`)
- **Linting**: Oxlint (fast static checks, run manually via `npm run lint` — not yet wired into CI)

---

## 🚀 Key Features

1. **Scroll-Reactive 3D Courier Drone**: A wireframe octahedron that follows a Catmull-Rom spline tied to scroll progress, banks based on scroll velocity, and interpolates color between section accents.
2. **Adaptive Performance Monitor**: Drei's `<PerformanceMonitor>` drops particle counts, disables point-lighting, and simplifies geometry when frame rate declines.
3. **Cyberpunk OS Boot Loader**: Progress-tracked boot sequence with keyboard/click skip and screen-reader description.
4. **Dual-Mode Tech Arsenal**: Skills section toggles between a quick chip grid and a terminal-style scan view.
5. **Custom Cursor**: Crosshair cursor using a `MutationObserver` to track dynamically added interactive elements without duplicate listeners.

---

## 🧪 Testing & Quality

Current state, honestly:
- `oxlint` catches basic static issues (rules-of-hooks, unused exports) — run with `npm run lint`.
- Component tests (Vitest + React Testing Library) are being added incrementally — see `src/test/`. Coverage is not yet comprehensive; contributions welcome.
- No CI pipeline is configured yet. Planned: run `lint` + `test` on push via GitHub Actions.

---

## 🛠️ Local Development & Setup

Make sure you have [Node.js](https://nodejs.org/) installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/soham-kolhe/Soham.dev.git
   cd Soham.dev
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Run tests**:
   ```bash
   npm run test
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Preview the production build locally**:
   ```bash
   npm run preview
   ```

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).