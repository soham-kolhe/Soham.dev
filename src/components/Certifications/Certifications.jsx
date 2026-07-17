/* ============================================
   Certifications — Decoded Credentials
   Badge collection / achievement showcase
   ============================================ */

import { useState, useEffect } from 'react';
import { certifications } from '../../data/portfolio.js';
import './Certifications.css';

const Certifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCertId, setActiveCertId] = useState(certifications[0]?.code || '');
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodeProgress, setDecodeProgress] = useState(0);

  const filteredCerts = certifications.filter((cert) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'microsoft') return cert.issuer === 'Microsoft';
    if (activeFilter === 'academic') return cert.issuer !== 'Microsoft';
    return true;
  });

  // Ensure active cert is updated if the filtered list changes
  useEffect(() => {
    if (filteredCerts.length > 0) {
      const isStillVisible = filteredCerts.some(c => c.code === activeCertId);
      if (!isStillVisible) {
        setActiveCertId(filteredCerts[0].code);
      }
    }
  }, [activeFilter, filteredCerts, activeCertId]);

  const activeCert = certifications.find((c) => c.code === activeCertId) || certifications[0];

  // Trigger decoding animation when changing active credential
  const handleSelectCert = (code) => {
    if (code === activeCertId) return;
    setIsDecoding(true);
    setDecodeProgress(0);
    setActiveCertId(code);
  };

  useEffect(() => {
    if (!isDecoding) return;

    const interval = setInterval(() => {
      setDecodeProgress((prev) => {
        if (prev >= 100) {
          setIsDecoding(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 25; // 4 steps to 100%
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isDecoding]);

  return (
    <section id="certifications" className="section certifications">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-label">ACHIEVEMENTS</p>
          <h2 className="section-title">
            DECODED <span className="highlight">CREDENTIALS</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="certs__filters reveal">
          <button
            onClick={() => setActiveFilter('all')}
            className={`cyber-tab ${activeFilter === 'all' ? 'cyber-tab--active' : ''}`}
          >
            [ ALL CREDENTIALS ]
          </button>
          <button
            onClick={() => setActiveFilter('microsoft')}
            className={`cyber-tab ${activeFilter === 'microsoft' ? 'cyber-tab--active' : ''}`}
          >
            [ MICROSOFT AZURE ]
          </button>
          <button
            onClick={() => setActiveFilter('academic')}
            className={`cyber-tab ${activeFilter === 'academic' ? 'cyber-tab--active' : ''}`}
          >
            [ ACADEMIC & SIMS ]
          </button>
        </div>

        {/* Interactive Decryption Console */}
        <div className="certs__console hud-corners glass-card reveal">
          {/* Left panel: List of certificates */}
          <div className="certs__console-list">
            <div className="certs__list-header">CREDENTIALS_DATABASE</div>
            <div className="certs__list-items">
              {filteredCerts.map((cert) => (
                <button
                  key={cert.code}
                  className={`certs__item-row ${activeCertId === cert.code ? 'certs__item-row--active' : ''}`}
                  onClick={() => handleSelectCert(cert.code)}
                  data-color={cert.color}
                >
                  <span className="certs__status-light" />
                  <span className="certs__item-code">{cert.code}</span>
                  <span className="certs__item-title">{cert.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel: Live Decryptor Card Display */}
          <div className="certs__console-viewer">
            {isDecoding ? (
              <div className="certs__decrypting-screen">
                <div className="certs__decrypting-scanner" />
                <p className="certs__decrypting-text">DECODING_ENCRYPTED_CREDENTIAL...</p>
                <div className="certs__progress-bar">
                  <div
                    className="certs__progress-fill"
                    style={{ width: `${decodeProgress}%` }}
                  />
                </div>
                <span className="certs__progress-text">{decodeProgress}% DECRYPTED</span>
              </div>
            ) : (
              activeCert && (
                <article
                  className={`cert-badge certs__detail-card ${
                    activeCert.level === 'Associate' || activeCert.level === 'Elite'
                      ? 'cert-badge--highlight'
                      : ''
                  }`}
                  data-color={activeCert.color}
                  data-badge-label={
                    activeCert.level === 'Elite' ? '★ ELITE TIER' : '★ HIGHEST LEVEL'
                  }
                >
                  {/* Glow ring behind icon for highlight card */}
                  {(activeCert.level === 'Associate' || activeCert.level === 'Elite') && (
                    <div className="cert-badge__glow-ring" />
                  )}

                  {/* Icon */}
                  <div
                    className={`cert-badge__icon ${
                      activeCert.level === 'Associate' || activeCert.level === 'Elite'
                        ? 'cert-badge__icon--highlight'
                        : ''
                    }`}
                  >
                    <span className="cert-badge__emoji">{activeCert.icon}</span>
                  </div>

                  {/* Issuer dossier tag */}
                  <span className="cert-badge__issuer-tag">{activeCert.issuer.toUpperCase()}</span>

                  {/* Title */}
                  <h3 className="cert-badge__title">{activeCert.title}</h3>

                  {/* Exam Code */}
                  <p className={`cert-badge__code text-${activeCert.color}`}>
                    {activeCert.code}
                  </p>

                  {/* Meta Row: Date & Level */}
                  <div className="cert-badge__meta">
                    <span className="cert-badge__date">{activeCert.date}</span>
                    <span className="cert-badge__meta-dot">•</span>
                    <span
                      className={`cert-badge__level cert-badge__level--${activeCert.level.toLowerCase()}`}
                      data-color={activeCert.color}
                    >
                      {activeCert.level}
                    </span>
                  </div>

                  {/* Verification link */}
                  {activeCert.verifyUrl && (
                    <a
                      href={activeCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-badge__verify-link"
                    >
                      [ VERIFY CREDENTIAL ]
                    </a>
                  )}

                  {/* Bottom accent line */}
                  <div className="cert-badge__accent" data-color={activeCert.color} />
                </article>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
