/* ============================================
   Footer — Minimal Cyberpunk Footer
   ============================================ */
import { socialLinks } from '../../data/portfolio.js';
import './Footer.css';

const SOCIAL_ICONS = {
  github: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z" />
      <path d="M4 20l6.768 -6.768" />
      <path d="M20 4l-6.768 6.768" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  ),
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Neon line divider */}
      <div className="footer__neon-line" />

      <div className="container footer__inner">
        {/* Attribution */}
        <div className="footer__attribution">
          <p className="footer__designed">
            Designed &amp; Built by{' '}
            <span className="footer__name">Soham Kolhe</span>
          </p>
          <p className="footer__copy">
            © 2026 — All systems operational
          </p>
        </div>

        {/* Social icons */}
        <div className="footer__socials">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.icon === 'mail' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label={link.name}
              title={link.name}
            >
              {SOCIAL_ICONS[link.icon]}
            </a>
          ))}
        </div>

        {/* Back to top */}
        <button
          className="footer__back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <span>TOP</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
