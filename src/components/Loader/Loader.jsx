/* ============================================
   Loader — Netflix-Style Portal Reveal
   A full-screen loading overlay that features an
   exponential text zoom transition into the page.
   ============================================ */

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { personalInfo } from '../../data/portfolio.js';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Direct elegant fade out for accessibility
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: onComplete,
      });
      return;
    }

    // Set initial animations timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (!isSkipped) {
          onComplete();
        }
      }
    });

    // 1. Text emerges with opacity and tracking-in
    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.95, letterSpacing: '0.8em' },
      {
        opacity: 1,
        scale: 1,
        letterSpacing: '0.3em',
        duration: 1.0,
        ease: 'power2.out',
      }
    );

    // 2. Short dramatic pause
    tl.to(textRef.current, {
      duration: 0.3,
    });

    // 3. Exponential zoom portal (zoom out past the camera)
    tl.to(
      textRef.current,
      {
        scale: 120,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.in',
      }
    );

    // Fade out overlay background slightly before the zoom completes to merge with the main page
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      '-=0.4'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete, isSkipped]);

  // Click or keydown handler to skip immediately
  const handleSkip = useCallback(() => {
    if (isSkipped) return;
    setIsSkipped(true);
    gsap.killTweensOf([containerRef.current, textRef.current]);
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: onComplete,
    });
  }, [isSkipped, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space or Enter or Esc keys can skip
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  return (
    <div
      ref={containerRef}
      className="loader-portal"
      onClick={handleSkip}
      role="region"
      aria-label="Welcome screen. Press enter, space, escape, or click to skip."
    >
      <div className="loader-portal__scanlines" aria-hidden="true" />
      <div className="loader-portal__scaler">
        <h1 ref={textRef} className="loader-portal__text">
          {personalInfo.name.toUpperCase()}
        </h1>
      </div>
    </div>
  );
};

export default Loader;
