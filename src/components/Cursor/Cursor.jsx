/* ============================================
   Custom Cyberpunk Cursor
   Neon crosshair that follows the mouse
   ============================================ */
import { useState, useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('cursor-ready');

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows exactly
      if (dot) {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      }
    };

    const animate = () => {
      // Smooth follow for outer ring
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;

      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }

      requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = () => setIsHovering(true);
    const onMouseLeaveInteractive = () => setIsHovering(false);
    const onMouseLeaveWindow = () => setIsHidden(true);
    const onMouseEnterWindow = () => setIsHidden(false);

    // Add listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    const registeredElements = new WeakSet();

    const addHoverListeners = (el) => {
      if (registeredElements.has(el)) return;
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
      registeredElements.add(el);
    };

    const removeHoverListeners = (el) => {
      el.removeEventListener('mouseenter', onMouseEnterInteractive);
      el.removeEventListener('mouseleave', onMouseLeaveInteractive);
    };

    // Track interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .interactive');
    interactiveElements.forEach(addHoverListeners);

    // Start animation loop
    const animId = requestAnimationFrame(animate);

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const currentElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .interactive');
      currentElements.forEach(addHoverListeners);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('cursor-ready');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      cancelAnimationFrame(animId);
      observer.disconnect();
      const currentElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .interactive');
      currentElements.forEach(removeHoverListeners);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring - smooth follow */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`cursor-ring ${isHovering ? 'cursor-ring--hover' : ''} ${isHidden ? 'cursor-ring--hidden' : ''}`}
      >
        {/* Crosshair lines */}
        <span className="cursor-ring__line cursor-ring__line--top" />
        <span className="cursor-ring__line cursor-ring__line--right" />
        <span className="cursor-ring__line cursor-ring__line--bottom" />
        <span className="cursor-ring__line cursor-ring__line--left" />
      </div>

      {/* Inner dot - exact follow */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`cursor-dot ${isHovering ? 'cursor-dot--hover' : ''} ${isHidden ? 'cursor-dot--hidden' : ''}`}
      />
    </>
  );
}
