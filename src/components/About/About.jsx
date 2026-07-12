/* ============================================
   About Component — Operator Profile
   Cyberpunk-styled about section with info cards
   ============================================ */
import { personalInfo } from '../../data/portfolio.js';
import './About.css';

const infoCards = [
  {
    icon: '🎓',
    label: 'Education',
    value: `${personalInfo.education.degree}`,
    sub: `${personalInfo.education.university} — CGPA: ${personalInfo.education.cgpa}`,
    accent: 'cyan',
  },
  {
    icon: '📍',
    label: 'Location',
    value: personalInfo.location,
    sub: null,
    accent: 'magenta',
  },
  {
    icon: '🟢',
    label: 'Status',
    value: 'Open to Opportunities',
    sub: null,
    accent: 'green',
  },
  {
    icon: '⚡',
    label: 'Interests',
    value: 'Full-Stack, Cloud, DevOps, AI',
    sub: null,
    accent: 'cyan',
  },
];

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-label">ABOUT</p>
          <h2 className="section-title">
            OPERATOR <span className="highlight">PROFILE</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="about__grid">
          {/* Left Column — Bio */}
          <div className="about__bio reveal-left">
            <div className="about__bio-tag">
              <span className="about__bio-tag-dot" />
              <span className="about__bio-tag-text">sys.operator.bio</span>
            </div>

            {personalInfo.bio.map((paragraph, index) => (
              <p key={index} className="about__bio-paragraph">
                {paragraph}
              </p>
            ))}

            <div className="about__bio-meta">
              <span className="about__meta-item">
                <span className="about__meta-key">Name:</span>
                <span className="about__meta-value">{personalInfo.name}</span>
              </span>
              <span className="about__meta-item">
                <span className="about__meta-key">Role:</span>
                <span className="about__meta-value">{personalInfo.tagline}</span>
              </span>
              <span className="about__meta-item">
                <span className="about__meta-key">Year:</span>
                <span className="about__meta-value">{personalInfo.education.year}</span>
              </span>
            </div>

            <hr className="neon-line" />
          </div>

          {/* Right Column — Info Cards */}
          <div className="about__cards reveal-right">
            {infoCards.map((card) => (
              <div
                key={card.label}
                className={`about__card glass-card hud-corners about__card--${card.accent}`}
              >
                <div className="about__card-icon">{card.icon}</div>
                <div className="about__card-content">
                  <span className="about__card-label">{card.label}</span>
                  <span className="about__card-value">{card.value}</span>
                  {card.sub && (
                    <span className="about__card-sub">{card.sub}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
