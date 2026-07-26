/* ============================================
   Certifications — Decoded Credentials
   Evidence Board (Desktop) + Bento Grid (Mobile)
   ============================================ */

import { useState, useRef, useCallback, useEffect } from 'react';
import { certifications } from '../../data/portfolio.js';
import './Certifications.css';

/* ---- Named Constants ---- */
const MOBILE_BREAKPOINT = 768;
const RESTING_ROTATIONS = [-3.5, 2.5, -2, 4, -3, 1.5, 3];

/* ---- Viewport Mobile Detector ---- */
const useIsMobile = (breakpoint = MOBILE_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
};

/* ---- 3D Tilt Hook for Desktop Evidence Board ---- */
const useTiltEffect = (ref, { restingDeg = 0, isMobile = false, maxTilt = 10, scale = 1.05, perspective = 800 } = {}) => {
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isMobile || prefersReducedMotion.current || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    el.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotate(${restingDeg}deg) scale3d(${scale}, ${scale}, 1)`;
    el.style.transition = 'transform 0.08s ease-out';
  }, [ref, restingDeg, isMobile, maxTilt, scale, perspective]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile || !ref.current) return;
    ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) rotate(${restingDeg}deg) scale3d(1, 1, 1)`;
    ref.current.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
  }, [ref, restingDeg, isMobile, perspective]);

  return { handleMouseMove, handleMouseLeave };
};

/* ---- Individual Cert Tile ---- */
const CertTile = ({ cert, index, isMobile }) => {
  const tileRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const restingDeg = RESTING_ROTATIONS[index % RESTING_ROTATIONS.length];

  const { handleMouseMove, handleMouseLeave } = useTiltEffect(tileRef, {
    restingDeg,
    isMobile,
  });

  const isHighlight = Boolean(cert.highlight || cert.code === 'AZ-104');
  const hasLink = Boolean(cert.verifyUrl);

  const tileContent = (
    <>
      {/* Decorative corkboard pin / tape corner */}
      <span className="cert-tile__pin" data-color={cert.color} />

      {/* Highlight ribbon */}
      {isHighlight && (
        <span className="cert-tile__ribbon">
          {cert.level === 'Elite' ? '★ ELITE' : '★ TOP LEVEL'}
        </span>
      )}

      {/* Screenshot visual or fallback placeholder */}
      <div className="cert-tile__visual">
        {cert.image && !imgError ? (
          <img
            src={cert.image}
            alt={`${cert.title} certificate — ${cert.issuer}`}
            className="cert-tile__image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="cert-tile__placeholder" data-color={cert.color}>
            <span className="cert-tile__placeholder-icon">{cert.icon}</span>
            <span className="cert-tile__placeholder-code">{cert.code}</span>
          </div>
        )}
      </div>

      {/* Info tag overlay */}
      <div className="cert-tile__info-tag">
        <div className="cert-tile__info-top">
          <span className="cert-tile__info-code">{cert.code}</span>
          <span className={`cert-badge__level cert-badge__level--${cert.level.toLowerCase()}`}>
            {cert.level}
          </span>
        </div>
        <h3 className="cert-tile__info-title">{cert.title}</h3>
        <div className="cert-tile__info-meta">
          <span>{cert.issuer}</span>
          {cert.date && (
            <>
              <span className="cert-tile__info-dot">•</span>
              <span>{cert.date}</span>
            </>
          )}
        </div>
        {hasLink ? (
          <span className="cert-tile__info-cta">[ VERIFY CREDENTIAL → ]</span>
        ) : (
          <span className="cert-tile__info-pending">Verification link pending</span>
        )}
      </div>
    </>
  );

  const sharedProps = {
    ref: tileRef,
    className: `cert-tile hud-corners ${isHighlight ? 'cert-tile--highlight' : ''}`,
    'data-color': cert.color,
    style: {
      '--tile-index': index + 1,
      transform: !isMobile ? `perspective(800px) rotate(${restingDeg}deg)` : undefined,
    },
    onMouseMove: !isMobile ? handleMouseMove : undefined,
    onMouseLeave: !isMobile ? handleMouseLeave : undefined,
  };

  if (hasLink) {
    return (
      <a
        {...sharedProps}
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {tileContent}
      </a>
    );
  }

  return (
    <div
      {...sharedProps}
      role="group"
      aria-label={`${cert.title} — Verification link coming soon`}
      tabIndex={0}
    >
      {tileContent}
    </div>
  );
};

/* ---- Category derivation ---- */
const getCategory = (cert) => {
  if (cert.issuer === 'Microsoft') return 'microsoft';
  if (cert.code === 'SIM') return 'simulation';
  return 'academic';
};

const FILTERS = [
  { key: 'all', label: '[ ALL CREDENTIALS ]' },
  { key: 'microsoft', label: '[ MICROSOFT AZURE ]' },
  { key: 'academic', label: '[ ACADEMIC ]' },
  { key: 'simulation', label: '[ SIMULATIONS ]' },
];

/* ---- Main Section ---- */
const Certifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  const filteredCerts = certifications.filter((cert) => {
    if (activeFilter === 'all') return true;
    return getCategory(cert) === activeFilter;
  });

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
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              aria-pressed={activeFilter === f.key}
              className={`cyber-tab ${activeFilter === f.key ? 'cyber-tab--active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Certificate Tile Container */}
        <div className={`certs__container ${isMobile ? 'certs__container--bento' : 'certs__container--board'} reveal`}>
          {filteredCerts.map((cert, index) => (
            <CertTile key={cert.code} cert={cert} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;