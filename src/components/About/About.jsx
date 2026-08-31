/* ============================================
   About Component
   Cyberpunk-styled about section with info cards
   ============================================ */
import { personalInfo } from '../../data/portfolio.js';
import './About.css';
import Achievements from './Achievements';

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-label">ABOUT</p>
          <h2 className="section-title">
            <span className="highlight">ABOUT</span> ME
          </h2>
        </div>

        {/* Console window */}
        <div className="about__console hud-corners glass-card reveal">
          {/* Header Bar */}
          <div className="about__console-header">
            <div className="about__console-dots">
              <span className="about__console-dot about__console-dot--red" />
              <span className="about__console-dot about__console-dot--yellow" />
              <span className="about__console-dot about__console-dot--green" />
            </div>
            <div className="about__console-title">
              about.md
              <span className="about__console-scanner" />
            </div>
            <div className="about__console-status">
              <span className="about__console-pulse" />
              <span>CONNECTED</span>
            </div>
          </div>

          <div className="about__console-body">
            {/* Left Column: Bio */}
            <div className="about__console-pane about__console-pane--bio">
              <div className="about__bio-tag">
                <span className="about__bio-tag-dot" />
                <span className="about__bio-tag-text">bio.md</span>
              </div>
              <div className="about__bio-paragraphs">
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
              </div>
            </div>

            {/* Right Column: Merged facts + achievements grid */}
            <div className="about__console-pane about__console-pane--facts">
              <Achievements compact />
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