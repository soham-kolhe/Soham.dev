/* ============================================
   Footer — Minimal Cyberpunk Footer
   ============================================ */
import { socialLinks, personalInfo } from '../../data/portfolio.js';
import { SocialIcons } from '../Icons/SocialIcons.jsx';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Neon line divider */}
      <div className="footer__neon-line" />

      <div className="container footer__inner">
        {/* Footer CTA */}
        <div className="footer__cta">
          <span className="footer__cta-badge">SYSTEM STATUS: OPEN TO OPPORTUNITIES</span>
          <p className="footer__cta-text">
            Open to full-time SDE &amp; DevOps roles — <a href="#contact" className="footer__cta-link">let's connect</a> or <a href={personalInfo.resumeLink} target="_blank" rel="noopener noreferrer" className="footer__cta-link">[ view resume ]</a>
          </p>
        </div>

        <div className="footer__bottom">
          {/* Attribution */}
          <div className="footer__attribution">
            <p className="footer__designed">
              Designed &amp; Built by{' '}
              <span className="footer__name">Soham Kolhe</span>
            </p>
            <p className="footer__copy">
              © {new Date().getFullYear()} Soham Kolhe — Open to Opportunities
            </p>
          </div>

          {/* Social icons */}
          <div className="footer__socials">
            {socialLinks.map((link) => {
              const Icon = SocialIcons[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.icon === 'mail' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label={link.name}
                  title={link.name}
                >
                  {Icon ? <Icon /> : null}
                </a>
              );
            })}
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
      </div>
    </footer>
  );
};

export default Footer;
