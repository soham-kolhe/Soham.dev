/* ============================================
   Navbar — HUD Overlay Navigation
   ============================================ */
import { useState, useEffect, useCallback, useRef } from 'react';
import { navItems } from '../../data/portfolio.js';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('#hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const overlayRef = useRef(null);

  /* --- Track scroll position for navbar bg and progress --- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledProg = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolledProg);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* --- IntersectionObserver for active section --- */
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: '-20% 0px -30% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  /* --- Lock body scroll when mobile menu is open --- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* --- Keyboard Accessibility: Escape to close, trap focus --- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!mobileOpen) return;
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      
      if (e.key === 'Tab') {
        const focusableElements = overlayRef.current?.querySelectorAll(
          'a[href], button'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (mobileOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Optional: focus close button when opened
      const closeBtn = overlayRef.current?.querySelector('.navbar-overlay__close');
      if (closeBtn) closeBtn.focus();
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  /* --- Smooth scroll handler --- */
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          {/* Logo */}
          <a
            href="#hero"
            className="navbar__logo"
            onClick={(e) => handleNavClick(e, '#hero')}
          >
            SOHAM<span className="navbar__logo-dot">.</span>DEV
          </a>

          {/* Desktop links */}
          <ul className="navbar__links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`navbar__link ${activeSection === item.href ? 'navbar__link--active' : ''}`}
                  aria-current={activeSection === item.href ? 'page' : undefined}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className={`navbar__burger ${mobileOpen ? 'navbar__burger--open' : ''}`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className="navbar__burger-line" />
            <span className="navbar__burger-line" />
            <span className="navbar__burger-line" />
          </button>
        </div>

        {/* Cyan bottom line */}
        <div className="navbar__line" />
        
        {/* Scroll Progress Bar */}
        <div className="navbar__progress" style={{ width: `${scrollProgress}%` }} />
      </nav>

      {/* Mobile fullscreen overlay */}
      <div 
        className={`navbar-overlay ${mobileOpen ? 'navbar-overlay--open' : ''}`}
        ref={overlayRef}
      >
        <button
          className="navbar-overlay__close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <ul className="navbar-overlay__links">
          {navItems.map((item, idx) => (
            <li
              key={item.href}
              className="navbar-overlay__item"
              style={{ transitionDelay: mobileOpen ? `${idx * 80 + 150}ms` : '0ms' }}
            >
              <a
                href={item.href}
                className={`navbar-overlay__link ${activeSection === item.href ? 'navbar-overlay__link--active' : ''}`}
                aria-current={activeSection === item.href ? 'page' : undefined}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span className="navbar-overlay__index">0{idx + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-overlay__decoration">
          <span>// NAVIGATION MODULE</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
