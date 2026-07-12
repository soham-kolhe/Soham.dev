/* ============================================
   Certifications — Decoded Credentials
   Badge collection / achievement showcase
   ============================================ */

import { certifications } from '../../data/portfolio.js';
import './Certifications.css';

const Certifications = () => {
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

        {/* Certifications Grid */}
        <div className="certs__grid">
          {certifications.map((cert, index) => {
            const isHighlight = cert.code === 'AZ-104';

            return (
              <article
                key={index}
                className={`cert-badge ${isHighlight ? 'cert-badge--highlight' : ''}`}
                data-color={cert.color}
                style={{ '--badge-delay': `${index * 0.1}s` }}
              >
                {/* Glow ring behind icon for highlight card */}
                {isHighlight && <div className="cert-badge__glow-ring" />}

                {/* Icon */}
                <div className={`cert-badge__icon ${isHighlight ? 'cert-badge__icon--highlight' : ''}`}>
                  <span className="cert-badge__emoji">{cert.icon}</span>
                </div>

                {/* Title */}
                <h3 className="cert-badge__title">{cert.title}</h3>

                {/* Exam Code */}
                <p className={`cert-badge__code text-${cert.color}`}>
                  {cert.code}
                </p>

                {/* Issuer */}
                <p className="cert-badge__issuer">{cert.issuer}</p>

                {/* Level Badge */}
                <span
                  className={`cert-badge__level cert-badge__level--${cert.level.toLowerCase()}`}
                  data-color={cert.color}
                >
                  {cert.level}
                </span>

                {/* Bottom accent line */}
                <div className="cert-badge__accent" data-color={cert.color} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
