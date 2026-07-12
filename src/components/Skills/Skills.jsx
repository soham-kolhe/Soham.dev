/* ============================================
   Skills Component — Tech Arsenal
   Terminal-style skills display
   ============================================ */
import { useState } from 'react';
import { skills } from '../../data/portfolio.js';
import './Skills.css';

/* Rotating accent colors for each category */
const accentCycle = ['cyan', 'magenta', 'green', 'cyan', 'magenta', 'green', 'cyan', 'magenta'];

/* Build the category entries from the skills data */
const categories = Object.keys(skills).map((key, idx) => ({
  key,
  label: skills[key].label.toUpperCase(),
  items: skills[key].items,
  accent: accentCycle[idx % accentCycle.length],
}));

function TerminalLine({ accent, label, items }) {
  /* Build box-drawing lines that scale to the label width */
  const headerPad = 30;
  const topRule = `┌─ ${label} ${'─'.repeat(Math.max(0, headerPad - label.length))}┐`;
  const bottomRule = `└${'─'.repeat(headerPad + 3)}┘`;

  return (
    <div className={`skills-term__block skills-term__block--${accent}`}>
      <span className="skills-term__rule">{topRule}</span>
      <span className="skills-term__items">
        {'│ '}
        {items.map((item, i) => (
          <span key={item} className="skills-term__skill">
            {item}
            {i < items.length - 1 && <span className="skills-term__bullet"> • </span>}
          </span>
        ))}
      </span>
      <span className="skills-term__rule">{bottomRule}</span>
    </div>
  );
}

function Skills() {
  const [view, setView] = useState('chips');

  return (
    <section id="skills" className="section skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <p className="section-label">SKILLS</p>
            <h2 className="section-title">
              TECH <span className="highlight">ARSENAL</span>
            </h2>
          </div>
          <button
            onClick={() => setView(v => v === 'chips' ? 'terminal' : 'chips')}
            className={`cyber-btn ${view === 'terminal' ? 'cyber-btn--magenta' : ''}`}
            style={{ marginBottom: '4px' }}
          >
            <span>{view === 'chips' ? '[ VIEW TERMINAL SCAN ]' : '[ VIEW QUICK SCAN ]'}</span>
          </button>
        </div>

        {view === 'terminal' ? (
          /* Terminal Window */
          <div className="skills-term reveal">
            {/* Title bar */}
            <div className="skills-term__titlebar">
              <div className="skills-term__dots">
                <span className="skills-term__dot skills-term__dot--close" />
                <span className="skills-term__dot skills-term__dot--min" />
                <span className="skills-term__dot skills-term__dot--max" />
              </div>
              <span className="skills-term__title">soham@grid:~$</span>
              <div className="skills-term__titlebar-spacer" />
            </div>

            {/* Terminal body */}
            <div className="skills-term__body">
              {/* Command prompt */}
              <div className="skills-term__prompt">
                <span className="skills-term__prompt-symbol">&gt; </span>
                <span className="skills-term__prompt-cmd">soham.skills.scan()</span>
                <span className="skills-term__cursor" />
              </div>

              {/* Scan output header */}
              <div className="skills-term__output-header">
                <span className="skills-term__output-line">
                  {'// '}Scanning tech stack...
                </span>
                <span className="skills-term__output-line skills-term__output-line--result">
                  {'>> '}Found {Object.values(skills).reduce((a, c) => a + c.items.length, 0)} technologies across {Object.keys(skills).length} categories
                </span>
              </div>

              {/* Category blocks */}
              <div className="skills-term__categories">
                {categories.map((cat) => (
                  <TerminalLine
                    key={cat.key}
                    accent={cat.accent}
                    label={cat.label}
                    items={cat.items}
                  />
                ))}
              </div>

              {/* Ending prompt */}
              <div className="skills-term__prompt skills-term__prompt--end">
                <span className="skills-term__prompt-symbol">&gt; </span>
                <span className="skills-term__cursor" />
              </div>
            </div>
          </div>
        ) : (
          /* Skill Chips Grid — Quick Scan */
          <div className="skills-chips reveal" style={{ marginTop: '0' }}>
            <p className="skills-chips__label">
              <span className="skills-chips__label-icon">◆</span> Quick Scan
            </p>
            <div className="skills-chips__grid">
              {Array.from(
                new Set(Object.values(skills).flatMap((cat) => cat.items))
              ).map((item) => (
                <span key={item} className="skills-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;
