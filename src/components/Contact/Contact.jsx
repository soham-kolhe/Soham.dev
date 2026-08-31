/* ============================================
   Contact Section
   ============================================ */
import { useState } from 'react';
import { personalInfo, socialLinks } from '../../data/portfolio.js';
import { SocialIcons } from '../Icons/socialIconsMap.js';
import './Contact.css';

const SUBJECT_OPTIONS = [
  'Project inquiry',
  'Job opportunity',
  'Just saying hi',
];

const MAX_CHARS = 1000;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project inquiry',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  // idle | transmitting | success | error
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const hasBackend = Boolean(personalInfo.formspreeId);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());

  // Signal Strength Meter Channels
  const signalChannels = [
    Boolean(formData.name.trim()),
    isEmailValid,
    Boolean(formData.subject),
    Boolean(formData.message.trim()),
  ];
  const validSignalCount = signalChannels.filter(Boolean).length;
  const isSignalLocked = validSignalCount === 4;

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!isEmailValid) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
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

  const handleTextareaChange = (e) => {
    handleChange(e);
    // Auto-resize height dynamically to fit content
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const buildMailto = () => {
    const subject = encodeURIComponent(`[${formData.subject}] Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const resetAfterDelay = (delay = 4000) => {
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: 'Project inquiry',
        message: '',
      });
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

    // No backend configured: open email client with pre-filled content
    if (!hasBackend) {
      window.location.href = buildMailto();
      setStatus('success');
      resetAfterDelay();
      return;
    }

    // Backend configured: submit POST to Formspree
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
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Formspree responded with ${response.status}`);
      }

      setStatus('success');
      resetAfterDelay();
    } catch {
      setStatus('error');
      setErrorMessage(
        'Message failed to send. You can retry, or reach out directly at ' + personalInfo.email
      );
    }
  };

  const statusLabel = {
    idle: hasBackend ? 'ONLINE' : 'ONLINE (opens email client)',
    transmitting: 'SENDING',
    success: hasBackend ? 'MESSAGE_SENT' : 'EMAIL_CLIENT_OPENED',
    error: 'SEND_FAILED',
  }[status];

  const submitLabel = {
    idle: hasBackend ? '[ SEND MESSAGE ]' : '[ OPEN EMAIL CLIENT ]',
    transmitting: '[ SENDING... ]',
    success: hasBackend ? '[ MESSAGE SENT ]' : '[ EMAIL CLIENT OPENED ]',
    error: '[ TRY AGAIN ]',
  }[status];

  return (
    <section id="contact" className="section contact" data-status={status}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-label">CONTACT</p>
          <h2 className="section-title">
            GET IN <span className="highlight">TOUCH</span>
          </h2>
        </div>

        {/* Availability & Response-time Meta Bar */}
        <div className="contact__meta-bar reveal">
          <span className="contact__meta-item contact__meta-item--green">
            <span className="contact__meta-dot" />
            AVAILABILITY // SDE &amp; DEVOPS ROLES + INTERNSHIPS
          </span>
          <span className="contact__meta-divider">•</span>
          <span className="contact__meta-item">
            TYPICAL RESPONSE TIME // WITHIN 24–48 HOURS
          </span>
        </div>

        {/* Quick-links strip: direct email, resume, socials — placed above form */}
        <div className="contact__links-strip reveal">
          <div className="contact__direct-email-box">
            <div className="contact__direct-email-header">
              <span className="contact__label">Email</span>
              {copied && (
                <span className="contact__copy-badge">✓ COPIED</span>
              )}
            </div>
            <div className="contact__direct-email-body">
              <a
                href={`mailto:${personalInfo.email}`}
                className="contact__direct-email-link"
              >
                {personalInfo.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`cyber-btn contact__copy-btn ${
                  copied ? 'cyber-btn--magenta' : ''
                }`}
                aria-label="Copy email address to clipboard"
              >
                {copied ? '[ COPIED ]' : '[ COPY EMAIL ]'}
              </button>
            </div>
          </div>

          <a
            href={personalInfo.resumeLink}
            download
            className="cyber-btn contact__resume-btn"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="contact__btn-icon"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            DOWNLOAD RESUME
          </a>

          <div className="contact__socials">
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

        {/* Form */}
        <div className="contact__form-card glass-card hud-corners reveal">
          <div className="contact__form-header">
            <span
              className={`contact__form-status ${
                status !== 'idle' ? 'contact__form-status--active' : ''
              }`}
            >
              ● {statusLabel}
            </span>
            <span className="contact__form-label">CONTACT FORM</span>
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

            {/* Name */}
            <div className="contact__field">
              <label htmlFor="contact-name" className="contact__label">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                className={`contact__input ${
                  errors.name ? 'contact__input--error' : ''
                }`}
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

            {/* Email */}
            <div className="contact__field">
              <div className="contact__label-row">
                <label htmlFor="contact-email" className="contact__label">
                  Email
                </label>
                {isEmailValid && (
                  <span className="contact__email-valid" title="Valid email format">
                    ✓ Valid email
                  </span>
                )}
              </div>
              <input
                id="contact-email"
                type="email"
                name="email"
                className={`contact__input ${
                  errors.email ? 'contact__input--error' : ''
                } ${isEmailValid ? 'contact__input--valid' : ''}`}
                placeholder="Enter your email address..."
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

            {/* Subject */}
            <div className="contact__field">
              <label className="contact__label">
                Subject
              </label>
              <div className="contact__chips" role="radiogroup" aria-label="Select subject">
                {SUBJECT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={formData.subject === opt}
                    className={`contact__chip ${
                      formData.subject === opt ? 'contact__chip--active' : ''
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, subject: opt }))
                    }
                    disabled={status === 'transmitting'}
                  >
                    [ {opt} ]
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="contact__field">
              <div className="contact__label-row">
                <label htmlFor="contact-message" className="contact__label">
                  Message
                </label>
                <span className="contact__char-counter">
                  {formData.message.length} / {MAX_CHARS}
                </span>
              </div>
              <textarea
                id="contact-message"
                name="message"
                className={`contact__input contact__textarea ${
                  errors.message ? 'contact__input--error' : ''
                }`}
                placeholder="Type your message here..."
                rows="4"
                maxLength={MAX_CHARS}
                value={formData.message}
                onChange={handleTextareaChange}
                disabled={status === 'transmitting'}
                required
              />
              {errors.message && (
                <span className="contact__field-error" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Signal-Strength Meter */}
            <div className="contact__signal-meter">
              <div className="contact__signal-header">
                <span
                  className={`contact__signal-label ${
                    isSignalLocked ? 'contact__signal-label--locked' : ''
                  }`}
                >
                  {isSignalLocked
                    ? 'All fields complete'
                    : `${validSignalCount} of 4 fields complete`}
                </span>
              </div>
              <div className="contact__signal-bars" aria-hidden="true">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`contact__signal-bar ${
                      idx < validSignalCount ? 'contact__signal-bar--active' : ''
                    } ${isSignalLocked ? 'contact__signal-bar--locked' : ''}`}
                  />
                ))}
              </div>
              <span className="contact__sr-only" aria-live="polite">
                {validSignalCount} of 4 fields complete
              </span>
            </div>

            {status === 'error' && (
              <p className="contact__form-error" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className={`cyber-btn contact__submit-btn ${
                status === 'success' ? 'cyber-btn--magenta' : ''
              }`}
              disabled={status === 'transmitting'}
            >
              {submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;