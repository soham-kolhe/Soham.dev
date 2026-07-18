/* ============================================
   About Component — Operator Profile
   Cyberpunk-styled about section with info cards
   ============================================ */
import { useState } from 'react';
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
    icon: '💻',
    label: 'Production',
    value: '3 Shipped Products',
    sub: 'AI pipelines & collaborative systems — 2 deployed, 1 in progress',
    accent: 'magenta',
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
    value: 'Cloud Infrastructure, CI/CD, Distributed Systems, Applied AI',
    sub: null,
    accent: 'cyan',
  },
];

function About() {
  const [activeTab, setActiveTab] = useState('bio');

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

        {/* Console dossier window */}
        <div className="about__console hud-corners glass-card reveal">
          {/* Header Bar */}
          <div className="about__console-header">
            <div className="about__console-dots">
              <span className="about__console-dot about__console-dot--red" />
              <span className="about__console-dot about__console-dot--yellow" />
              <span className="about__console-dot about__console-dot--green" />
            </div>
            <div className="about__console-title">SYS.OPERATOR_DOSSIER // SK-2027</div>
            <div className="about__console-status">
              <span className="about__console-pulse" />
              <span>SECURE_CONN_ACTIVE</span>
            </div>
          </div>

          <div className="about__console-body">
            {/* Sidebar Tabs */}
            <div className="about__console-sidebar">
              <button
                className={`about__tab-btn ${activeTab === 'bio' ? 'about__tab-btn--active' : ''}`}
                onClick={() => setActiveTab('bio')}
              >
                <span className="about__tab-num">01 //</span> BIOGRAPHY
              </button>
              <button
                className={`about__tab-btn ${activeTab === 'timeline' ? 'about__tab-btn--active' : ''}`}
                onClick={() => setActiveTab('timeline')}
              >
                <span className="about__tab-num">02 //</span> TIMELINE
              </button>
              <button
                className={`about__tab-btn ${activeTab === 'diagnostics' ? 'about__tab-btn--active' : ''}`}
                onClick={() => setActiveTab('diagnostics')}
              >
                <span className="about__tab-num">03 //</span> DIAGNOSTICS
              </button>
            </div>

            {/* Main Panel Content */}
            <div className="about__console-content">
              {activeTab === 'bio' && (
                <div className="about__panel-bio">
                  <div className="about__bio-tag">
                    <span className="about__bio-tag-dot" />
                    <span className="about__bio-tag-text">operator_bio.txt</span>
                  </div>
                  {personalInfo.bio.map((paragraph, index) => (
                    <p key={index} className="about__bio-paragraph">
                      {paragraph.map((segment, i) =>
                        segment.bold ? (
                          <strong key={i}>{segment.text}</strong>
                        ) : (
                          <span key={i}>{segment.text}</span>
                        )
                      )}
                    </p>
                  ))}
                  <div className="about__bio-meta">
                    <span className="about__meta-item">
                      <span className="about__meta-key">Operator Name:</span>
                      <span className="about__meta-value">{personalInfo.name}</span>
                    </span>
                    <span className="about__meta-item">
                      <span className="about__meta-key">Focus Stack:</span>
                      <span className="about__meta-value">{personalInfo.focus}</span>
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="about__panel-timeline">
                  <div className="about__bio-tag">
                    <span className="about__bio-tag-dot" />
                    <span className="about__bio-tag-text">academic_timeline.log</span>
                  </div>
                  <div className="about__timeline-item">
                    <div className="about__timeline-marker" />
                    <div className="about__timeline-content">
                      <h4 className="about__timeline-title">{personalInfo.education.degree}</h4>
                      <p className="about__timeline-uni">{personalInfo.education.university}</p>
                      <p className="about__timeline-year">{personalInfo.education.year}</p>
                      <span className="about__timeline-badge">CGPA: {personalInfo.education.cgpa}</span>
                    </div>
                  </div>
                  <div className="about__timeline-item">
                    <div className="about__timeline-marker about__timeline-marker--secondary" />
                    <div className="about__timeline-content">
                      <h4 className="about__timeline-title">Applied AI &amp; Cloud Architectures</h4>
                      <p className="about__timeline-uni">Self-Directed Systems Development &amp; DevOps Labs</p>
                      <p className="about__timeline-year">Ongoing</p>
                      <span className="about__timeline-badge about__timeline-badge--secondary">5x Microsoft Certified</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'diagnostics' && (
                <div className="about__panel-diagnostics">
                  <div className="about__bio-tag">
                    <span className="about__bio-tag-dot" />
                    <span className="about__bio-tag-text">operator_metrics.sys</span>
                  </div>
                  <div className="about__diagnostics-grid">
                    {infoCards.map((card) => (
                      <div
                        key={card.label}
                        className={`about__diag-card about__diag-card--${card.accent}`}
                      >
                        <div className="about__diag-header">
                          <span className="about__diag-icon">{card.icon}</span>
                          <span className="about__diag-label">{card.label.toUpperCase()}</span>
                        </div>
                        <span className="about__diag-value">{card.value}</span>
                        {card.sub && <span className="about__diag-sub">{card.sub}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="about__cta reveal">
          <span className="about__cta-text">Curious what I've built?</span>
          <a href="#projects" className="about__cta-link">
            Explore Shipped Projects <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
