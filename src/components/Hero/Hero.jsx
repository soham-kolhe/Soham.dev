/* ============================================
   Hero Section — Cyberpunk Landing
   Full-viewport intro with glitch title,
   typed subtitle, CTAs, and social links.
   ============================================ */

import { personalInfo, socialLinks } from '../../data/portfolio';
import { SocialIcons } from '../Icons/SocialIcons.jsx';
import './Hero.css';

const Hero = ({ onImageLoad }) => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero__container">
        <div className="hero__content">
          {/* System label & Status */}
          <div className="hero__label-container reveal">
            <div className="hero__label">
              <span className="hero__label-dot" aria-hidden="true" />
              <span>// SYSTEM ONLINE</span>
            </div>
            <div className="hero__status">
              <span className="hero__status-dot" aria-hidden="true" />
              <span>STATUS: OPEN TO OPPORTUNITIES</span>
            </div>
            <div className="hero__grad-timeline">
              <span>// B.TECH CSE • PARUL UNIVERSITY • GRADUATING JUNE 2027</span>
            </div>
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
              {personalInfo.role}
            </span>
          </div>

          {/* Tagline */}
          <p className="hero__tagline reveal">
            {personalInfo.tagline}
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
              <span>[ VIEW RESUME ]</span>
            </a>
          </div>

          {/* Social Links Row */}
          <div className="hero__social-chips reveal">
            {socialLinks.map((link, idx) => {
              const Icon = SocialIcons[link.icon];
              const isEmail = link.icon === 'mail';
              const isCyanColor = idx % 2 === 0;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  className={`cyber-chip-btn ${isCyanColor ? 'cyber-chip-btn--cyan' : 'cyber-chip-btn--magenta'}`}
                  target={isEmail ? '_self' : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                  aria-label={link.name}
                  title={link.name}
                >
                  {Icon && <Icon className="cyber-chip-icon" />}
                </a>
              );
            })}
          </div>
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
              src="/images/soham-profile.jpg"
              alt="Soham Kolhe — Full-Stack Developer & Cloud Engineer"
              className="hero__photo"
              loading="eager"
              onLoad={onImageLoad}
            />

            {/* Neon glow behind image */}
            <span className="hero__photo-glow" aria-hidden="true" />
          </div>

          {/* HUD data below photo */}
          <div className="hero__photo-hud" aria-hidden="true">
            <span className="hero__photo-hud-line">◈ OPERATOR_ID: SK-2027</span>
            <span className="hero__photo-hud-line hero__photo-hud-line--cyan">◈ STATUS: OPEN TO OPPORTUNITIES</span>
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

      {/* Hero Bottom Bar */}
      <div className="hero__bottom-bar">
        {/* Scroll down indicator */}
        <div className="hero__scroll-indicator" aria-hidden="true">
          <span className="hero__scroll-text">Scroll</span>
          <span className="hero__scroll-line" />
          <span className="hero__scroll-chevron" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
