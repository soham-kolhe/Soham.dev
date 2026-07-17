/* ============================================
   Contact — Comm Link Section
   ============================================ */
import { useState } from 'react';
import { personalInfo, socialLinks } from '../../data/portfolio.js';
import { SocialIcons } from '../Icons/SocialIcons.jsx';
import './Contact.css';

/*
  Submission strategy is now explicit and honest:

  - If a Formspree ID is configured, we actually POST to it and only show
    "TRANSMITTING" while that network request is genuinely in flight.
  - If no Formspree ID is configured, we skip the fake network step
    entirely and tell the user directly that this will open their email
    client instead — no fabricated loading state.
*/
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  // idle | transmitting | success | error
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const hasBackend = Boolean(personalInfo.formspreeId);
  const MailIcon = SocialIcons.mail;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Callsign (name) is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Frequency (email) is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Transmission (message) is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const buildMailto = () => {
    const subject = encodeURIComponent(`Comm Link: Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Callsign: ${formData.name}\nFrequency: ${formData.email}\n\nTransmission:\n${formData.message}`
    );
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const resetAfterDelay = (delay = 4000) => {
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setHoneypot('');
      setErrors({});
      setStatus('idle');
      setErrorMessage('');
    }, delay);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot spam trap
    if (honeypot) {
      setStatus('success');
      resetAfterDelay();
      return;
    }

    // Validate fields before proceeding
    if (!validateForm()) {
      return;
    }

    // No backend configured: don't fake a network call. Be upfront that
    // this opens the visitor's email client, then do it immediately.
    if (!hasBackend) {
      window.location.href = buildMailto();
      setStatus('success');
      resetAfterDelay();
      return;
    }

    // Backend configured: this is a real request, so a "transmitting"
    // state is accurate here.
    setStatus('transmitting');

    try {
      const response = await fetch(`https://formspree.io/f/${personalInfo.formspreeId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Formspree responded with ${response.status}`);
      }

      setStatus('success');
      resetAfterDelay();
    } catch (error) {
      console.error('Formspree transmission failed:', error);
      setStatus('error');
      setErrorMessage(
        'Transmission failed. You can retry, or reach out directly at ' + personalInfo.email
      );
    }
  };

  const statusLabel = {
    idle: hasBackend ? 'ONLINE' : 'ONLINE (opens email client)',
    transmitting: 'TRANSMITTING',
    success: hasBackend ? 'SECURE_LINK_ESTABLISHED' : 'EMAIL_CLIENT_OPENED',
    error: 'TRANSMISSION_FAILED',
  }[status];

  const submitLabel = {
    idle: hasBackend ? '[ TRANSMIT_MESSAGE ]' : '[ OPEN_EMAIL_CLIENT ]',
    transmitting: '[ ROUTING_PACKETS... ]',
    success: hasBackend ? '[ TRANSMISSION_SUCCESS ]' : '[ EMAIL_CLIENT_OPENED ]',
    error: '[ RETRY_TRANSMISSION ]',
  }[status];

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

            <div className="contact__meta-reminder">
              <span className="contact__meta-badge">AVAILABILITY // SDE &amp; DEVOPS ROLES + INTERNSHIPS</span>
              <span className="contact__meta-response">TYPICAL RESPONSE TIME // WITHIN 24–48 HOURS</span>
            </div>

            <div className="contact__direct-links">
              <a
                href={`mailto:${personalInfo.email}`}
                className="contact__direct-link"
              >
                <span className="contact__link-icon">
                  {MailIcon ? <MailIcon /> : null}
                </span>
                <span className="contact__link-label">&gt; EMAIL</span>
                <span className="contact__link-value">{personalInfo.email}</span>
              </a>

              {socialLinks
                .filter((s) => s.icon === 'github' || s.icon === 'linkedin')
                .map((link) => {
                  const Icon = SocialIcons[link.icon];
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__direct-link"
                    >
                      <span className="contact__link-icon">
                        {Icon ? <Icon /> : null}
                      </span>
                      <span className="contact__link-label">
                        &gt; {link.name.toUpperCase()}
                      </span>
                      <span className="contact__link-value">{link.url}</span>
                    </a>
                  );
                })}
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
                  ● {statusLabel}
                </span>
                <span className="contact__form-label">SECURE_CHANNEL</span>
              </div>

              {!hasBackend && (
                <p className="contact__form-note">
                  Note: no message backend is configured yet, so submitting
                  this form will open your email client with the message
                  pre-filled instead of sending directly.
                </p>
              )}

              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot spam trap */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="_comm_honeypot"
                    tabIndex="-1"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-name" className="contact__label">
                    &gt; CALLSIGN // name:
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    className={`contact__input ${errors.name ? 'contact__input--error' : ''}`}
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'transmitting'}
                    required
                    autoComplete="name"
                  />
                  {errors.name && (
                    <span className="contact__field-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-email" className="contact__label">
                    &gt; FREQUENCY // email:
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className={`contact__input ${errors.email ? 'contact__input--error' : ''}`}
                    placeholder="Enter your email..."
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'transmitting'}
                    required
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="contact__field-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-message" className="contact__label">
                    &gt; TRANSMISSION // message:
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={`contact__input contact__textarea ${errors.message ? 'contact__input--error' : ''}`}
                    placeholder="Enter your message..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'transmitting'}
                    required
                  />
                  {errors.message && (
                    <span className="contact__field-error" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {status === 'error' && (
                  <p className="contact__form-error" role="alert">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className={`cyber-btn contact__submit-btn ${status === 'success' ? 'cyber-btn--magenta' : ''}`}
                  disabled={status === 'transmitting'}
                >
                  {submitLabel}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Social links row */}
        <div className="contact__socials reveal">
          {socialLinks.map((link) => {
            const Icon = SocialIcons[link.icon];
            return (
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
                  {Icon ? <Icon /> : null}
                </span>
                <span className="contact__social-name">{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;