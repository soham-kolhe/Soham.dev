/* ============================================
   Hero Section — Cyberpunk Landing
   Full-viewport intro with glitch title,
   typed subtitle, CTAs, and social links.
   ============================================ */

import { personalInfo, socialLinks } from '../../data/portfolio';
import './Hero.css';

/* ---- Inline SVG Icons ---- */
const icons = {
  github: (
    <svg className="hero__social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="hero__social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  code: (
    <svg className="hero__social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
    </svg>
  ),
  twitter: (
    <svg className="hero__social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  mail: (
    <svg className="hero__social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
};

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero__container">
        <div className="hero__content">
          {/* System label */}
          <div className="hero__label reveal">
            <span className="hero__label-dot" aria-hidden="true" />
            <span>// SYSTEM ONLINE</span>
          </div>

          {/* Name with glitch on hover */}
          <h1 className="hero__name reveal">
            <span className="hero__name-text">
              {personalInfo.name.toUpperCase()}
              <span className="hero__name-glitch--before" aria-hidden="true">
                {personalInfo.name.toUpperCase()}
              </span>
              <span className="hero__name-glitch--after" aria-hidden="true">
                {personalInfo.name.toUpperCase()}
              </span>
            </span>
          </h1>

          {/* Subtitle with typing cursor */}
          <div className="hero__subtitle reveal">
            <span className="hero__subtitle-text">
              {personalInfo.tagline}
            </span>
          </div>

          {/* Tagline */}
          <p className="hero__tagline reveal">
            {personalInfo.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="hero__cta-group reveal">
            <a href="#projects" className="cyber-btn">
              <span>[ EXPLORE PROJECTS ]</span>
            </a>
            <a
              href={personalInfo.resumeLink}
              className="cyber-btn cyber-btn--magenta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>[ DOWNLOAD RESUME ]</span>
            </a>
          </div>

          {/* Social links */}
          <nav className="hero__socials reveal" aria-label="Social links">
            {socialLinks.map((link, index) => (
              <span key={link.name} style={{ display: 'contents' }}>
                <a
                  href={link.url}
                  className="hero__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  title={link.name}
                >
                  {icons[link.icon]}
                  <span>{link.name}</span>
                </a>
                {index < socialLinks.length - 1 && (
                  <span className="hero__social-divider" aria-hidden="true" />
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Profile Photo */}
        <div className="hero__photo-wrapper reveal-scale">
          <div className="hero__photo-frame">
            {/* HUD corners */}
            <span className="hero__photo-corner hero__photo-corner--tl" />
            <span className="hero__photo-corner hero__photo-corner--tr" />
            <span className="hero__photo-corner hero__photo-corner--bl" />
            <span className="hero__photo-corner hero__photo-corner--br" />

            {/* Scanning line animation */}
            <span className="hero__photo-scanline" aria-hidden="true" />

            <img
              src="/images/soham-profile.png"
              alt="Soham Kolhe — Full-Stack Developer & Cloud Engineer"
              className="hero__photo"
              loading="eager"
            />

            {/* Neon glow behind image */}
            <span className="hero__photo-glow" aria-hidden="true" />
          </div>

          {/* HUD data below photo */}
          <div className="hero__photo-hud" aria-hidden="true">
            <span className="hero__photo-hud-line">◈ OPERATOR_ID: SK-2027</span>
            <span className="hero__photo-hud-line hero__photo-hud-line--cyan">◈ STATUS: AVAILABLE</span>
          </div>
        </div>
      </div>

      {/* HUD decoration on right side */}
      <div className="hero__hud-accent" aria-hidden="true">
        <span className="hero__hud-line">SYS.STATUS: ACTIVE</span>
        <span className="hero__hud-line">GRID: CONNECTED</span>
        <span className="hero__hud-line">LAT: 22.3072° N</span>
        <span className="hero__hud-line">LNG: 73.1812° E</span>
        <span className="hero__hud-line">UPTIME: 99.97%</span>
      </div>

      {/* Scroll down indicator */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line" />
        <span className="hero__scroll-chevron" />
      </div>
    </section>
  );
};

export default Hero;
