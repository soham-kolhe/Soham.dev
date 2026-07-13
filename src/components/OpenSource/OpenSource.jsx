/* ============================================
   Open Source — Contribution Logs
   Cyberpunk-styled open-source contribution showcase
   ============================================ */

import { openSourceContributions } from '../../data/portfolio.js';
import './OpenSource.css';

const OpenSource = () => {
  return (
    <section id="opensource" className="section opensource">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-label">COMMUNITY</p>
          <h2 className="section-title">
            OPEN SOURCE <span className="highlight">CONTRIBUTIONS</span>
          </h2>
        </div>

        {/* Contribution Cards */}
        <div className="oss__list">
          {openSourceContributions.map((entry) => (
            <article
              key={entry.id}
              className="oss-card hud-corners reveal"
              data-color={entry.color}
            >
              {/* Top Status Bar */}
              <div className="oss-card__topbar">
                <span className="oss-card__classification">
                  ◆ {entry.classification}
                </span>
                <span className="oss-card__pr-count">
                  {entry.prCount} PRs MERGED
                </span>
              </div>

              {/* Codename */}
              <p className={`oss-card__codename text-${entry.color}`}>
                {entry.codename}
              </p>

              {/* Repo Name */}
              <h3 className="oss-card__title">{entry.repo}</h3>

              {/* Description */}
              <p className="oss-card__description">{entry.description}</p>

              {/* Divider */}
              <div className="oss-card__divider" data-color={entry.color} />

              {/* Contributions List */}
              <div className="oss-card__contributions">
                <p className={`oss-card__contributions-label text-${entry.color}`}>
                  {'>'} CONTRIBUTION LOG
                </p>
                <ul className="oss-card__contributions-list">
                  {entry.contributions.map((item, i) => (
                    <li key={i} className="oss-card__contribution-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="oss-card__tech">
                <p className="oss-card__tech-label">TECH STACK</p>
                <div className="oss-card__tech-chips">
                  {entry.tech.map((t, i) => (
                    <span key={i} className="oss-card__chip" data-color={entry.color}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="oss-card__actions">
                <a
                  href={entry.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn"
                >
                  <span className="cyber-btn__icon">◈</span>
                  VIEW REPO
                </a>
                <a
                  href={entry.contributionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn cyber-btn--magenta"
                >
                  <span className="cyber-btn__icon">⚡</span>
                  VIEW MY COMMITS
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
