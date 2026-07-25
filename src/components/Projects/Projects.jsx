/* ============================================
   Projects — Mission Briefings
   Cyberpunk HUD-styled project showcase
   ============================================ */

import { projects } from '../../data/portfolio.js';
import './Projects.css';

const Projects = () => {
  const primaryProjects = projects.slice(0, 2);
  const otherProjects = projects.slice(2);

  const handleTiltMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 14;
    const rotateY = ((x - centerX) / centerX) * 14;

    container.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
    container.style.transition = 'transform 0.1s ease-out';
  };

  const handleTiltMouseLeave = (e) => {
    const container = e.currentTarget;
    container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    container.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
  };

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

        {/* Spotlight Projects (First two) */}
        <div className="projects__spotlight-list">
          {primaryProjects.map((project) => (
            <article
              key={project.id}
              id={`project-${project.id}`}
              className="projects__spotlight-window hud-corners reveal"
              data-color={project.color}
            >
              {/* Header Bar */}
              <div className="projects__window-header">
                <div className="projects__window-dots">
                  <span className="projects__window-dot projects__window-dot--red" />
                  <span className="projects__window-dot projects__window-dot--yellow" />
                  <span className="projects__window-dot projects__window-dot--green" />
                </div>
                <div className="projects__window-title">PROJECT_SPOTLIGHT // {project.codename}</div>
                <span className="projects__window-status">
                  <span className="projects__window-pulse" />
                  {project.status}
                </span>
              </div>

              {/* Window content */}
              <div className="projects__window-body">
                {/* Left Side: Mockup, stats, tech stack & actions */}
                <div className="projects__window-left">
                  <div
                    className="projects__image-container"
                    onMouseMove={handleTiltMouseMove}
                    onMouseLeave={handleTiltMouseLeave}
                  >
                    <span className="projects__image-corner projects__image-corner--tl" />
                    <span className="projects__image-corner projects__image-corner--tr" />
                    <span className="projects__image-corner projects__image-corner--bl" />
                    <span className="projects__image-corner projects__image-corner--br" />
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="projects__image"
                    />
                  </div>
                  <div className="projects__stats-row">
                    {project.stats.map((stat, i) => (
                      <div key={i} className="projects__stat-badge" data-color={project.color}>
                        <span className="projects__stat-value">{stat.value}</span>
                        <span className="projects__stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="projects__tech-block">
                    <span className="projects__tech-label">TECH_STACK //</span>
                    <div className="projects__tech-chips">
                      {project.tech.map((t, i) => (
                        <span key={i} className="projects__tech-chip" data-color={project.color}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="projects__actions">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="cyber-btn">
                      <span>[ VIEW CODE ]</span>
                    </a>
                    <a href={project.live || project.github} target="_blank" rel="noopener noreferrer" className="cyber-btn cyber-btn--magenta">
                      <span>[ GO LIVE ]</span>
                    </a>
                  </div>
                </div>

                {/* Right Side: Details & Key Capabilities */}
                <div className="projects__window-right">
                  <span className="projects__classification">CLASSIFICATION: {project.classification}</span>
                  <h3 className="projects__title">{project.title}</h3>
                  <p className="projects__type">{project.type}</p>
                  
                  <div className="projects__case">
                    <p className="projects__case-block">
                      <strong className={`text-${project.color}`}>PROBLEM //</strong>{' '}
                      <span className="projects__case-text" dangerouslySetInnerHTML={{ __html: project.problem }} />
                    </p>
                    <p className="projects__case-block">
                      <strong className={`text-${project.color}`}>APPROACH //</strong>{' '}
                      <span className="projects__case-text" dangerouslySetInnerHTML={{ __html: project.approach }} />
                    </p>
                    <p className="projects__case-block">
                      <strong className={`text-${project.color}`}>RESULT //</strong>{' '}
                      <span className="projects__case-text" dangerouslySetInnerHTML={{ __html: project.outcome }} />
                    </p>
                  </div>

                  <div className="projects__features-block">
                    <span className={`projects__features-label text-${project.color}`}>KEY_CAPABILITIES //</span>
                    <ul className="projects__features-list">
                      {project.features.map((feature, i) => (
                        <li key={i} className="projects__feature-item" dangerouslySetInnerHTML={{ __html: feature }} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Secondary/In Progress Projects */}
        {otherProjects.length > 0 && (
          <div className="projects__secondary-section reveal">
            <h3 className="projects__secondary-heading">
              <span className="projects__secondary-heading-icon">◈</span> AUXILIARY OPERATIONS // IN DEVELOPMENT
            </h3>
            <div className="projects__secondary-grid">
              {otherProjects.map((project) => (
                <article key={project.id} id={`project-${project.id}`} className="projects__secondary-card glass-card hud-corners" data-color={project.color}>
                  <div className="projects__card-top">
                    <span className="projects__card-classification">{project.classification}</span>
                    <span className="projects__card-badge projects__card-badge--working">WORKING</span>
                  </div>
                  <h4 className="projects__card-title">{project.title}</h4>
                  <p className="projects__card-desc">{project.description}</p>

                  <div className="projects__card-stats">
                    {project.stats.map((stat, i) => (
                      <div key={i} className="projects__card-stat">
                        <span className="projects__card-stat-val">{stat.value}</span>
                        <span className="projects__card-stat-lbl">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="projects__card-tech">
                    {project.tech.map((t, i) => (
                      <span key={i} className="projects__card-tech-chip" data-color={project.color}>{t}</span>
                    ))}
                  </div>

                  <div className="projects__card-actions">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="cyber-btn projects__card-btn">
                      <span>[ VIEW CODE ]</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;