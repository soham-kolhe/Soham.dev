/* ============================================
   Contact — Comm Link Section
   ============================================ */
import { useState } from 'react';
import { personalInfo, socialLinks } from '../../data/portfolio.js';
import './Contact.css';

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | transmitting | success

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('transmitting');

    setTimeout(() => {
      setStatus('success');

      // Prefill and trigger mailto redirect
      const subject = encodeURIComponent(`Comm Link: Message from ${formData.name}`);
      const body = encodeURIComponent(`Callsign: ${formData.name}\nFrequency: ${formData.email}\n\nTransmission:\n${formData.message}`);
      window.location.href = `mailto:sohamkolhe20@gmail.com?subject=${subject}&body=${body}`;

      // Reset form after sequence
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('idle');
      }, 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-label">CONTACT</p>
          <h2 className="section-title">
            OPEN <span className="highlight">COMM LINK</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="contact__grid">
          {/* Left — Info */}
          <div className="contact__info reveal-left">
            <p className="contact__intro">
              Ready to connect? Whether it's about a project, opportunity, or
              just to say hello — my comm link is always open.
            </p>

            <div className="contact__direct-links">
              <a
                href={`mailto:${personalInfo.email}`}
                className="contact__direct-link"
              >
                <span className="contact__link-icon">{SOCIAL_ICONS.mail}</span>
                <span className="contact__link-label">&gt; EMAIL</span>
                <span className="contact__link-value">{personalInfo.email}</span>
              </a>

              {socialLinks
                .filter((s) => s.icon === 'github' || s.icon === 'linkedin')
                .map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__direct-link"
                  >
                    <span className="contact__link-icon">
                      {SOCIAL_ICONS[link.icon]}
                    </span>
                    <span className="contact__link-label">
                      &gt; {link.name.toUpperCase()}
                    </span>
                    <span className="contact__link-value">{link.url}</span>
                  </a>
                ))}
            </div>

            {/* Resume download */}
            <a
              href={personalInfo.resumeLink}
              download
              className="cyber-btn contact__resume-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact__btn-icon">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              DOWNLOAD_RESUME.PDF
            </a>
          </div>

          {/* Right — Form */}
          <div className="contact__form-wrapper reveal-right">
            <div className="contact__form-card glass-card hud-corners">
              <div className="contact__form-header">
                <span className={`contact__form-status ${status !== 'idle' ? 'contact__form-status--active' : ''}`}>
                  ● {status === 'idle' ? 'ONLINE' : status === 'transmitting' ? 'TRANSMITTING' : 'SECURE_LINK_ESTABLISHED'}
                </span>
                <span className="contact__form-label">SECURE_CHANNEL</span>
              </div>

              <form
                className="contact__form"
                onSubmit={handleSubmit}
              >
                <div className="contact__field">
                  <label htmlFor="contact-name" className="contact__label">
                    &gt; CALLSIGN:
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    className="contact__input"
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status !== 'idle'}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-email" className="contact__label">
                    &gt; FREQUENCY:
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="contact__input"
                    placeholder="Enter your email..."
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status !== 'idle'}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-message" className="contact__label">
                    &gt; TRANSMISSION:
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="contact__input contact__textarea"
                    placeholder="Enter your message..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status !== 'idle'}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className={`cyber-btn contact__submit-btn ${status === 'success' ? 'cyber-btn--magenta' : ''}`}
                  disabled={status !== 'idle'}
                >
                  {status === 'idle' ? '[ TRANSMIT_MESSAGE ]' : status === 'transmitting' ? '[ ROUTING_PACKETS... ]' : '[ TRANSMISSION_SUCCESS ]'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Social links row */}
        <div className="contact__socials reveal">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.icon === 'mail' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="contact__social-link"
              aria-label={link.name}
              title={link.name}
            >
              <span className="contact__social-icon">
                {SOCIAL_ICONS[link.icon]}
              </span>
              <span className="contact__social-name">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
