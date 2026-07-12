/* ============================================
   Main App — Lenis + GSAP + Cyberpunk Layout
   ============================================ */
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Components */
import Cursor from './components/Cursor/Cursor';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Certifications from './components/Certifications/Certifications';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { scrollState } from './scrollState';
const CyberpunkScene = lazy(() => import('./components/Background/CyberpunkScene'));

/* Styles */
import './index.css';
import './styles/animations.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const lenisRef = useRef(null);
  const appRef = useRef(null);

  /* --- Initialize Lenis Smooth Scroll --- */
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger and our Companion Drone scrollState
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      scrollState.progress = e.progress;
      scrollState.velocity = e.velocity ?? 0;
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [isLoading]);

  /* --- Stagger 3D Background scene mount --- */
  useEffect(() => {
    if (isLoading) return;
    const sceneTimer = setTimeout(() => {
      setSceneReady(true);
    }, 300);
    return () => clearTimeout(sceneTimer);
  }, [isLoading]);

  /* --- GSAP Scroll Animations --- */
  useEffect(() => {
    if (isLoading) return;

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      // Reveal animations (fade in up)
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Reveal from left
      gsap.utils.toArray('.reveal-left').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Reveal from right
      gsap.utils.toArray('.reveal-right').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Reveal scale
      gsap.utils.toArray('.reveal-scale').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Staggered children reveal
      gsap.utils.toArray('.reveal-stagger').forEach((container) => {
        const children = container.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Neon line draw
      gsap.utils.toArray('.neon-line').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isLoading]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <Loader onComplete={handleLoadComplete} />}

      {/* Custom Cursor */}
      <Cursor />

      {/* Scanline Overlay */}
      <div className="scanline-overlay" />

      {/* 3D Background */}
      {sceneReady && (
        <Suspense fallback={null}>
          <CyberpunkScene />
        </Suspense>
      )}

      {/* Main Content */}
      {!isLoading && (
        <div ref={appRef} className="app-wrapper">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
