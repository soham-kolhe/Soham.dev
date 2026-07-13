# 🌆 Soham Kolhe — Cyberpunk Portfolio & Developer Grid

Welcome to the Grid. This is a highly interactive, responsive, and developer-centric portfolio designed around a **Cyberpunk / Neon City HUD** aesthetic.

---

## ⚡ Tech Stack & Architecture

- **Core Framework**: React 19 + Vite (Fast dev, HMR, optimal compilation)
- **3D Graphics**: Three.js + React Three Fiber + `@react-three/drei` (DPR-capped Canvas)
- **Smooth Scroll**: Lenis (silky-smooth 60fps scrolling synced to animation cycles)
- **Animations**: GSAP + ScrollTrigger (custom scroll-bound timeline reveals)
- **Styling**: Vanilla CSS (custom properties, strict tokens, and responsive layouts)
- **Linting & Quality**: Oxlint (ultra-fast codebase checks)

---

## 🚀 Key Features

1. **Scroll-Reactive 3D Courier Drone**: A custom wireframe octahedron companion drone patrolling the background grid. It tracks scroll progress along a 3D Catmull-Rom spline curve, banks dynamically based on scroll velocity, and transitions color matching section accents (Cyan → Magenta → Green).
2. **Adaptive Performance Monitor**: Uses Drei's `<PerformanceMonitor>` to adapt R3F canvas quality on lower-end devices. Automatically decreases particle counts, disables point-lighting on mobile, and drops rendering of heavy background shapes on low FPS.
3. **Cyberpunk OS Boot Loader**: Interactive, progress-tracked terminal booting log on load. Includes keyboard & click dismissal capabilities and full screen-reader accessibility description.
4. **Dual-Mode Tech Arsenal**: Custom Skills section letting visitors choose between a quick-scan chips layout and an expandable, classic terminal scan block.
5. **Dynamic HUD Profile Frame**: Active corner frames, flashing scanlines, and status logs wrapped around the profile picture.
6. **Smart Custom Cursor**: Custom crosshair cursor utilizing dynamic mutation observation for hover interactions without listener duplication or memory leaks.

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

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production build locally**:
   ```bash
   npm run preview
   ```

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

