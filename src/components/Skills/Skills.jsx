/* ============================================
   Skills Component — Tech Arsenal
   Pure Terminal Shell with Live Grep & Hover Proof
   ============================================ */
import { useState } from 'react';
import { skills } from '../../data/portfolio.js';
import './Skills.css';

/* Category list derived from data */
const categories = Object.keys(skills).map((key) => ({
  key,
  label: skills[key].label.toUpperCase(),
  items: skills[key].items,
}));

/* Helper to handle smooth scroll to project proof */
function handleProofClick(projectId, e) {
  e.preventDefault();
  e.stopPropagation();
  const target = document.getElementById(`project-${projectId}`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    target.classList.remove('project-highlight');
    void target.offsetWidth; // trigger reflow for animation restart
    target.classList.add('project-highlight');
    setTimeout(() => {
      target.classList.remove('project-highlight');
    }, 1500);
  }
}

function Skills() {
  const [filterQuery, setFilterQuery] = useState('');

  // Total skills count
  const allItems = Object.values(skills).flatMap((cat) => cat.items);
  const totalSkills = allItems.length;

  // Filter items per category
  const query = filterQuery.toLowerCase().trim();
  const filteredCategories = categories
    .map((cat) => {
      const matchingItems = cat.items.filter((item) => {
        if (!query) return true;
        return (
          item.name.toLowerCase().includes(query) ||
          (item.proof && item.proof.toLowerCase().includes(query))
        );
      });
      return { ...cat, items: matchingItems };
    })
    .filter((cat) => cat.items.length > 0);

  const matchedCount = filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <section id="skills" className="section skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-label">SKILLS</p>
          <h2 className="section-title">
            TECH <span className="highlight">ARSENAL</span>
          </h2>
        </div>

        {/* Terminal Window */}
        <div className="skills-term reveal">
          {/* Terminal Title Bar */}
          <div className="skills-term__titlebar">
            <div className="skills-term__dots">
              <span className="skills-term__dot skills-term__dot--close" />
              <span className="skills-term__dot skills-term__dot--min" />
              <span className="skills-term__dot skills-term__dot--max" />
            </div>
            <span className="skills-term__title">soham@grid:~/skills.sh</span>
            <span className="skills-term__status">STATUS: ACTIVE</span>
          </div>

          {/* Terminal Body */}
          <div className="skills-term__body">
            {/* Terminal Command Line / Live Filter Input */}
            <div className="skills-term__filter-bar">
              <div className="skills-term__prompt">
                <span className="skills-term__prompt-user">soham@grid:~$</span>
                <span className="skills-term__prompt-cmd">grep -i</span>
              </div>
              <input
                type="text"
                className="skills-term__filter-input"
                placeholder='type keyword to filter (e.g. react, docker, sql)...'
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                aria-label="Filter skills by keyword"
              />
              {filterQuery && (
                <button
                  type="button"
                  className="skills-term__filter-clear"
                  onClick={() => setFilterQuery('')}
                >
                  [CLEAR]
                </button>
              )}
            </div>

            {/* Terminal Output Info Line */}
            <div className="skills-term__output-info">
              <span className="skills-term__info-line">
                {'>> '}Indexed {matchedCount} of {totalSkills} technologies
                {filterQuery && ` for query "${filterQuery}"`}
              </span>
              <span className="skills-term__hint-line">
                {'>> '}Hover skill to view proof &amp; project links
              </span>
            </div>

            {/* Terminal Categories & Skills List */}
            {matchedCount > 0 ? (
              <div className="skills-term__content">
                {filteredCategories.map((cat) => (
                  <div key={cat.key} className="skills-term__category">
                    <div className="skills-term__cat-header">
                      <span className="skills-term__cat-prefix">//</span> {cat.label}
                    </div>

                    <div className="skills-term__chips">
                      {cat.items.map((item) => (
                        <div
                          key={item.name}
                          className="skills-term__chip"
                          tabIndex={0}
                        >
                          <span className="skills-term__chip-symbol">&gt;</span>
                          <span className="skills-term__chip-name">{item.name}</span>

                          {/* Hover Proof Tooltip */}
                          {item.proof && (
                            <div className="skills-term__tooltip">
                              <span className="skills-term__tooltip-label">PROOF // </span>
                              {item.proofProjectId ? (
                                <a
                                  href={`#project-${item.proofProjectId}`}
                                  onClick={(e) => handleProofClick(item.proofProjectId, e)}
                                  className="skills-proof-link"
                                  aria-label={`View project: ${item.proof}`}
                                >
                                  {item.proof} <span className="skills-proof-link__icon">↗</span>
                                </a>
                              ) : (
                                <span className="skills-term__tooltip-text">{item.proof}</span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="skills-term__no-matches">
                <span className="skills-term__error-line">
                  {`>> grep: no skills found matching "${filterQuery}"`}
                </span>
              </div>
            )}

            {/* Terminal End Prompt */}
            <div className="skills-term__prompt skills-term__prompt--end">
              <span className="skills-term__prompt-user">soham@grid:~$</span>
              <span className="skills-term__cursor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
