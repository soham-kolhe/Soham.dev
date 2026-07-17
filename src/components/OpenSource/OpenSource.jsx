/* ============================================
   Open Source — Contribution Logs
   Cyberpunk-styled open-source contribution showcase
   ============================================ */

import { useState } from 'react';
import { openSourceContributions } from '../../data/portfolio.js';
import './OpenSource.css';

const OpenSource = () => {
  const [activeRepoId, setActiveRepoId] = useState(openSourceContributions[0]?.id || '');

  return (
    <section id="open-source" className="section opensource">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-label">COMMUNITY</p>
          <h2 className="section-title">
            OPEN SOURCE <span className="highlight">CONTRIBUTIONS</span>
          </h2>
        </div>

        {/* Viewport Explorer Console */}
        <div className="oss__console hud-corners glass-card reveal">
          {/* Header Bar */}
          <div className="oss__console-header">
            <div className="oss__console-dots">
              <span className="oss__console-dot oss__console-dot--red" />
              <span className="oss__console-dot oss__console-dot--yellow" />
              <span className="oss__console-dot oss__console-dot--green" />
            </div>
            <div className="oss__console-title">SYS.CONTRIBUTION_EXPLORER // MERGED_PRs</div>
            <div className="oss__console-status">
              <span className="oss__console-pulse" />
              <span>ACTIVE_REPOS: {openSourceContributions.length}</span>
            </div>
          </div>

          <div className="oss__console-body">
            {/* Sidebar list of Repositories */}
            <div className="oss__console-sidebar">
              {openSourceContributions.map((repo) => (
                <button
                  key={repo.id}
                  className={`oss__repo-btn ${activeRepoId === repo.id ? 'oss__repo-btn--active' : ''}`}
                  onClick={() => setActiveRepoId(repo.id)}
                  data-color={repo.color}
                >
                  <span className="oss__repo-icon">◈</span>
                  <div className="oss__repo-info">
                    <span className="oss__repo-name">📂 {repo.repo}</span>
                    <span className="oss__repo-pr-count">[{repo.prCount} PRs]</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Main File Viewer Content Panels */}
            {openSourceContributions.map((repo) => {
              const isActive = repo.id === activeRepoId;
              return (
                <div
                  key={repo.id}
                  className="oss__console-content"
                  data-color={repo.color}
                  style={{ display: isActive ? 'flex' : 'none' }}
                >
                  <div className="oss__content-header">
                    <span className="oss__classification">◆ {repo.classification}</span>
                    <span className="oss__pr-merged-count" style={{ display: 'none' }}>
                      {repo.prCount} PRs MERGED
                    </span>
                    <p className={`oss__codename text-${repo.color}`}>{repo.codename}</p>
                    <h3 className="oss__title">{repo.repo}</h3>
                    <p className="oss__description">{repo.description}</p>
                  </div>

                  <div className="oss__divider" data-color={repo.color} />

                  {/* PR log lists */}
                  <div className="oss__pr-section">
                    <p className={`oss__section-label text-${repo.color}`}>
                      {'>'} MERGED PR TRANSMISSIONS
                    </p>
                    <div className="oss__pr-list">
                      {repo.contributions.map((item, i) => (
                        <div key={i} className="oss__pr-item">
                          <div className="oss__pr-item-top">
                            <span className={`oss__pr-status oss__pr-status--${item.status.toLowerCase()}`}>
                              {item.status}
                            </span>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="oss__pr-link"
                            >
                              PR {item.issue} ↗
                            </a>
                          </div>
                          <p className="oss__pr-text">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech chips */}
                  <div className="oss__tech-section">
                    <span className="oss__tech-label">COMPILED_TECH</span>
                    <div className="oss__tech-chips">
                      {repo.tech.map((t, i) => (
                        <span key={i} className="oss__tech-chip" data-color={repo.color}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Repo Actions */}
                  <div className="oss__actions">
                    <a
                      href={repo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-btn"
                    >
                      <span>[ VISIT REPOSITORY ]</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
