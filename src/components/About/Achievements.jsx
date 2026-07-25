/* ============================================
   Achievements Strip Component
   Merged facts + achievements: a compact grid of
   the 6 things worth knowing at a glance. Cards
   backed by proof elsewhere on the page are
   clickable; pure facts are static.
   ============================================ */
import './Achievements.css';
import { personalInfo } from '../../data/portfolio.js';

const achievementsList = [
  {
    icon: '🎓',
    title: personalInfo.education.degree.replace('in Computer Science & Engineering', 'CSE'),
    subtitle: `CGPA ${personalInfo.education.cgpa.split(' ')[0]} · Graduating June 2027`,
    accent: 'cyan',
  },
  {
    icon: '🟢',
    title: 'Open to Opportunities',
    subtitle: personalInfo.location,
    accent: 'green',
  },
  {
    icon: '⚡',
    title: 'Interests',
    subtitle: 'Cloud, CI/CD, Distributed Systems, Applied AI',
    accent: 'magenta',
  },
  {
    icon: '🧩',
    title: '160+ DSA Solved',
    subtitle: 'LeetCode platform',
    accent: 'magenta',
    link: { type: 'external', target: personalInfo.social?.leetcode || '#' },
  },
  {
    icon: '🏆',
    title: '6 Certifications',
    subtitle: '5x Azure (AZ-104 Associate) + NPTEL Elite',
    accent: 'cyan',
    link: { type: 'scroll', target: '#certifications' },
  },
  {
    icon: '🔀',
    title: '3 Merged PRs',
    subtitle: 'PrivateBoard (Open-Source contributions)',
    accent: 'green',
    link: { type: 'scroll', target: '#open-source' },
  },
];

export default function Achievements({ compact = false }) {
  const handleClick = (item) => (e) => {
    if (!item.link) return;
    const { type, target } = item.link;
    if (type === 'scroll') {
      e.preventDefault();
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // type === 'external' -> let the anchor's native href/target behavior run
  };

  return (
    <div className={`achievements-strip ${compact ? 'achievements-strip--compact' : ''}`}>
      <div className="about__bio-tag">
        <span className="about__bio-tag-dot" />
        <span className="about__bio-tag-text">operator_achievements.log</span>
      </div>
      <div className="achievements-strip__list">
        {achievementsList.map((item, idx) => {
          const isLink = Boolean(item.link);
          const isExternal = item.link?.type === 'external';
          const Tag = isLink ? 'a' : 'div';
          const extraProps = isLink
            ? {
                href: item.link.target,
                onClick: handleClick(item),
                target: isExternal ? '_blank' : undefined,
                rel: isExternal ? 'noopener noreferrer' : undefined,
              }
            : {};

          return (
            <Tag
              key={idx}
              className={`achievement-card achievement-card--${item.accent} ${
                isLink ? '' : 'achievement-card--static'
              } hud-corners`}
              aria-label={isLink ? `${item.title} — view proof` : item.title}
              {...extraProps}
            >
              <div className="achievement-card__left">
                <div className="achievement-card__icon" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="achievement-card__content">
                  <h3 className="achievement-card__title">{item.title}</h3>
                  <p className="achievement-card__subtitle">{item.subtitle}</p>
                </div>
              </div>
              {isLink && (
                <span className="achievement-card__proof" aria-hidden="true">
                  VIEW PROOF →
                </span>
              )}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}