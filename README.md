# 🌆 Soham Kolhe — Cyberpunk Portfolio & Developer Grid

Welcome to the Grid. This is a highly interactive, responsive, and developer-centric portfolio designed around a **Cyberpunk / Neon City HUD** aesthetic.

---

## ⚡ Tech Stack & Architecture

- **Core Framework**: React 19 + Vite
- **3D Graphics**: Three.js + React Three Fiber + `@react-three/drei`, with a `PerformanceMonitor`-driven degraded mode for lower-end devices
- **Smooth Scroll**: Lenis, synced to GSAP's ticker
- **Animations**: GSAP + ScrollTrigger, with `matchMedia`-based scrub vs. one-shot reveal variants for desktop/mobile
- **Styling**: Vanilla CSS with custom properties and a shared design-token file (`src/index.css`)
- **Linting**: Oxlint (run automatically in CI, or manually via `npm run lint`)

---

## 🚀 Key Features

1. **Scroll-Reactive 3D Courier Drone**: A wireframe octahedron that follows a Catmull-Rom spline tied to scroll progress, banks based on scroll velocity, and interpolates color between section accents.
2. **Adaptive Performance Monitor**: Drei's `<PerformanceMonitor>` drops particle counts, disables point-lighting, and simplifies geometry when frame rate declines.
3. **Cyberpunk OS Boot Loader**: Progress-tracked boot sequence with keyboard/click skip and screen-reader description.
4. **Dual-Mode Tech Arsenal**: Skills section toggles between a quick chip grid and a terminal-style scan view.
5. **Custom Cursor**: Crosshair cursor using a `MutationObserver` to track dynamically added interactive elements without duplicate listeners.

---

## 🧪 Testing & Quality

- Component tests (Vitest + React Testing Library) cover Contact, Navbar, OpenSource, Skills, About, and Certifications — see `src/test/`.
- CI runs lint, test, and build on every push via GitHub Actions (`.github/workflows/ci.yml`), on Node 20 and 22.

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