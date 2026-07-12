/* ============================================
   Projects — Mission Briefings
   Cyberpunk HUD-styled project showcase
   ============================================ */

import { projects } from '../../data/portfolio.js';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-label">PROJECTS</p>
          <h2 className="section-title">
            MISSION <span className="highlight">BRIEFINGS</span>
          </h2>
        </div>

        {/* Mission Cards */}
        <div className="projects__list">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`mission-card hud-corners reveal`}
              data-color={project.color}
              style={{ '--card-delay': `${index * 0.15}s` }}
            >
              {/* HUD Inner Corner Decorations */}
              <div className="mission-card__corner mission-card__corner--tl" />
              <div className="mission-card__corner mission-card__corner--tr" />
              <div className="mission-card__corner mission-card__corner--bl" />
              <div className="mission-card__corner mission-card__corner--br" />

              {/* Top Status Bar */}
              <div className="mission-card__topbar">
                <span className={`mission-card__classification mission-card__classification--${project.classification.toLowerCase().replace(' ', '-')}`}>
                  ◆ {project.classification}
                </span>
                <span className={`mission-card__status mission-card__status--${project.status === 'DEPLOYED' ? 'deployed' : 'dev'}`}>
                  <span className="mission-card__status-dot" />
                  {project.status}
                </span>
              </div>

              {/* Codename */}
              <p className={`mission-card__codename text-${project.color}`}>
                {project.codename}
              </p>

              {/* Title */}
              <h3 className="mission-card__title">{project.title}</h3>

              {/* Type Subtitle */}
              <p className="mission-card__type">{project.type}</p>

              {/* Separator */}
              <div className="mission-card__divider" data-color={project.color} />

              {/* Case Study */}
              <div className="mission-card__case-study">
                <div className="mission-card__case-block">
                  <span className={`mission-card__case-label text-${project.color}`}>
                    {'>'} PROBLEM:
                  </span>
                  <p className="mission-card__case-text">{project.problem}</p>
                </div>

                <div className="mission-card__case-block">
                  <span className={`mission-card__case-label text-${project.color}`}>
                    {'>'} APPROACH:
                  </span>
                  <p className="mission-card__case-text">{project.approach}</p>
                </div>

                <div className="mission-card__case-block">
                  <span className={`mission-card__case-label text-${project.color}`}>
                    {'>'} OUTCOME:
                  </span>
                  <p className="mission-card__case-text">{project.outcome}</p>
                </div>
              </div>

              {/* Key Features */}
              <div className="mission-card__features">
                <p className={`mission-card__features-label text-${project.color}`}>
                  KEY FEATURES
                </p>
                <ul className="mission-card__features-list" data-color={project.color}>
                  {project.features.map((feature, i) => (
                    <li key={i} className="mission-card__feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mission-card__tech">
                <p className="mission-card__tech-label">TECH STACK</p>
                <div className="mission-card__tech-chips">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="mission-card__chip"
                      data-color={project.color}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* GitHub Link */}
              <div className="mission-card__actions">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`cyber-btn ${project.color === 'magenta' ? 'cyber-btn--magenta' : ''}`}
                >
                  <span className="cyber-btn__icon">◈</span>
                  VIEW ON GITHUB
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
