# Soham Kolhe — Portfolio

A modern, high-performance developer portfolio built with React 19, Three.js, React Three Fiber, Rapier Physics, Tailwind CSS v4, and Framer Motion.

🚀 **Live Deployment:** [https://soham-dev-omega.vercel.app/](https://soham-dev-omega.vercel.app/)

---

## ✨ Features

- **3D Interactive Physics Lanyard:** Draggable ID-card with realistic rope joints and physical constraints powered by `@react-three/fiber` and `@react-three/rapier`.
- **Neural Constellation Cursor Flow:** Interactive site-wide canvas background where nodes drift freely in space and form energetic synaptic connections and electrical signals when the cursor approaches.
- **Geist Pixel Typography:** Distinctive retro-futuristic display typography paired with clean, modern sans-serif body text.
- **Decrypted Dynamic Text:** Scrambled text decipher animation dynamically cycling engineering roles.
- **Smooth Inertia Scrolling:** Butter-smooth scroll performance orchestrated with Lenis and GSAP ScrollTrigger.
- **Selected Work & Certifications:** Interactive project showcases, metrics counter, and credential verification cards.
- **Optimized & Accessible:** Respects `prefers-reduced-motion`, responsive across all viewports, with fast build and load times.

---

## 🛠️ Tech Stack

- **Framework & Build:** [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics & Physics:** [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei), [@react-three/rapier](https://github.com/pmndrs/react-three-rapier)
- **Animation & Motion:** [Framer Motion (Motion)](https://motion.dev/), [GSAP](https://gsap.com/), [Lenis](https://lenis.darkroom.engineering/)
- **Icons:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📂 Project Structure

```text
├── public/                 # Static assets, fonts, icons, images
│   ├── fonts/              # Geist Pixel & Geist variable font files
│   └── images/             # Profile and project assets
├── src/
│   ├── assets/             # 3D models (.glb) and project assets
│   ├── components/         # React components
│   │   ├── ui/             # Reusable UI primitives (Button, Badge)
│   │   ├── GlobalBackgroundFlow.tsx  # Neural constellation background
│   │   ├── Hero.tsx        # Hero section with 3D ID card
│   │   ├── Lanyard.tsx     # 3D physics lanyard badge
│   │   ├── Navbar.tsx      # Sticky header with scroll spy
│   │   ├── SelectedWork.tsx# Project cards & details
│   │   ├── About.tsx       # Bio & tech skills matrix
│   │   ├── Certifications.tsx # Cloud credentials & badges
│   │   └── Contact.tsx     # Social links & contact info
│   ├── hooks/              # Custom React hooks (useReducedMotion)
│   ├── styles/             # Tailwind theme & global CSS
│   ├── App.tsx             # Main page container
│   └── main.tsx            # Application entrypoint
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/soham-kolhe/Soham.dev.git
   cd Soham.dev
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📬 Contact & Connect

- **Website:** [soham-dev-omega.vercel.app](https://soham-dev-omega.vercel.app/)
- **GitHub:** [@soham-kolhe](https://github.com/soham-kolhe)
- **LinkedIn:** [soham-kolhe3318](https://www.linkedin.com/in/soham-kolhe3318/)
- **LeetCode:** [Soham_Kolhe](https://leetcode.com/u/Soham_Kolhe/)
- **Email:** [sohamkolhe20@gmail.com](mailto:sohamkolhe20@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
