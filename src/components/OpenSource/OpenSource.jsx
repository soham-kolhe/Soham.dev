/* ============================================
   Open Source — Contribution Logs
   Hierarchical Mac Folder Screen Showcase
   ============================================ */

import { useState } from 'react';
import { openSourceContributions } from '../../data/portfolio.js';
import './OpenSource.css';

const OpenSource = () => {
  const [activeRepoId, setActiveRepoId] = useState(openSourceContributions[0]?.id || '');
  // activeSubFolderId: null means main project folder view; string means viewing specific merge sub-folder
  const [activeSubFolderId, setActiveSubFolderId] = useState(null);

  const activeRepo = openSourceContributions.find((r) => r.id === activeRepoId) || openSourceContributions[0];
  const activeSubFolder = activeRepo?.contributions?.find((item) => item.id === activeSubFolderId);

  const handleSelectRepo = (repoId) => {
    setActiveRepoId(repoId);
    setActiveSubFolderId(null);
  };

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
            <div className="oss__console-title">
              ~/open-source/{activeRepo?.repo}
              {activeSubFolder ? `/${activeSubFolder.folderName}` : ''}/
            </div>
            <div className="oss__console-status">
              <span className="oss__console-pulse" />
              <span>ACTIVE_REPOS: {openSourceContributions.length}</span>
            </div>
          </div>

          <div className="oss__console-body">
            {/* Sidebar list of Repositories & Sub-Folders */}
            <div className="oss__console-sidebar">
              {openSourceContributions.map((repo) => {
                const isRepoSelected = activeRepoId === repo.id;

                return (
                  <div key={repo.id} className="oss__tree-group">
                    {/* Main Project Folder Button */}
                    <button
                      className={`oss__repo-btn ${
                        isRepoSelected && !activeSubFolderId ? 'oss__repo-btn--active' : ''
                      }`}
                      onClick={() => handleSelectRepo(repo.id)}
                      data-color={repo.color}
                    >
                      <span className="oss__repo-icon">📂</span>
                      <div className="oss__repo-info">
                        <span className="oss__repo-name">{repo.repo}</span>
                        <span className="oss__repo-pr-count">[{repo.prCount} Sub-Folders]</span>
                      </div>
                    </button>

                    {/* Sub-Folders (Merge PRs) Tree */}
                    {isRepoSelected && (
                      <div className="oss__tree-subfolders">
                        {repo.contributions.map((item) => {
                          const isSubSelected = activeSubFolderId === item.id;
                          return (
                            <button
                              key={item.id}
                              className={`oss__subfolder-btn ${
                                isSubSelected ? 'oss__subfolder-btn--active' : ''
                              }`}
                              onClick={() => {
                                setActiveRepoId(repo.id);
                                setActiveSubFolderId(item.id);
                              }}
                              data-color={repo.color}
                            >
                              <span className="oss__subfolder-icon">📁</span>
                              <span className="oss__subfolder-name">{item.folderName}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Main File Viewer Content Panel */}
            <div className="oss__console-content" data-color={activeRepo.color}>
              {/* Breadcrumb Navigation Header */}
              <div className="oss__breadcrumb">
                <div className="oss__breadcrumb-path">
                  <button
                    type="button"
                    className={`oss__breadcrumb-item ${!activeSubFolder ? 'oss__breadcrumb-item--active' : ''}`}
                    onClick={() => setActiveSubFolderId(null)}
                  >
                    📂 {activeRepo.repo}
                  </button>
                  {activeSubFolder && (
                    <>
                      <span className="oss__breadcrumb-sep">/</span>
                      <span className="oss__breadcrumb-item oss__breadcrumb-item--active">
                        📁 {activeSubFolder.folderName}
                      </span>
                    </>
                  )}
                </div>

                {/* Right-aligned Return Button */}
                {activeSubFolder && (
                  <button
                    type="button"
                    className="oss__back-btn"
                    onClick={() => setActiveSubFolderId(null)}
                  >
                    [ ← RETURN ]
                  </button>
                )}
              </div>

              {/* VIEW 1: Main Project Folder View */}
              {!activeSubFolder && (
                <div className="oss__view oss__view--project">
                  <div className="oss__content-header">
                    <div className="oss__header-meta">
                      <span className="oss__classification">◆ {activeRepo.classification}</span>
                      <span className="oss__pr-status oss__pr-status--merged">
                        ● {activeRepo.contributions.length} MERGED
                      </span>
                    </div>
                    <p className={`oss__codename text-${activeRepo.color}`}>{activeRepo.codename}</p>
                    <h3 className="oss__title">{activeRepo.repo}</h3>
                    <p className="oss__description">{activeRepo.description}</p>
                  </div>

                  {/* Project Repo Link Button */}
                  <div className="oss__actions">
                    <a
                      href={activeRepo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-btn"
                    >
                      <span>[ VISIT REPOSITORY ↗ ]</span>
                    </a>
                  </div>

                  {/* Compiled Tech Stack */}
                  <div className="oss__tech-section">
                    <span className="oss__tech-label">COMPILED_TECH</span>
                    <div className="oss__tech-chips">
                      {activeRepo.tech.map((t, i) => (
                        <span key={i} className="oss__tech-chip" data-color={activeRepo.color}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: Specific Merge Sub-Folder View */}
              {activeSubFolder && (
                <div className="oss__view oss__view--merge">
                  <div className="oss__subfolder-header">
                    <div className="oss__subfolder-meta">
                      <span className="oss__pr-status oss__pr-status--merged">
                        ● {activeSubFolder.status.toUpperCase()}
                      </span>
                      <span className="oss__issue-tag">
                        RESOLVED ISSUE {activeSubFolder.issue}
                      </span>
                    </div>
                    <h3 className="oss__title">📁 {activeSubFolder.title}</h3>
                  </div>

                  <div className="oss__divider" data-color={activeRepo.color} />

                  {/* Resolution Detail / About Section */}
                  <div className="oss__about-section">
                    <p className={`oss__section-label text-${activeRepo.color}`}>
                      {'>'} ABOUT THIS RESOLUTION
                    </p>
                    <p className="oss__about-text">{activeSubFolder.about}</p>
                  </div>

                  {/* Resolve Issue Link Button */}
                  <div className="oss__actions">
                    <a
                      href={activeSubFolder.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-btn"
                    >
                      <span>[ RESOLVE ISSUE {activeSubFolder.issue} ↗ ]</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
