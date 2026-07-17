import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OpenSource from '../components/OpenSource/OpenSource';
import { openSourceContributions } from '../data/portfolio';

describe('OpenSource Component', () => {
  it('renders the open source section and all listed repositories', () => {
    render(<OpenSource />);
    
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('OPEN SOURCE CONTRIBUTIONS');

    openSourceContributions.forEach((entry) => {
      expect(screen.getByText(entry.repo)).toBeInTheDocument();
      expect(screen.getByText(entry.description)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${entry.prCount} PRs MERGED`, 'i'))).toBeInTheDocument();
    });
  });

  it('renders individual contribution logs with status badges and PR links', () => {
    render(<OpenSource />);
    
    openSourceContributions.forEach((entry) => {
      entry.contributions.forEach((contrib) => {
        // Check that the contribution text is rendered
        expect(screen.getByText(contrib.text)).toBeInTheDocument();
        
        // Check that the status badge is rendered
        const statusBadges = screen.getAllByText(new RegExp(contrib.status, 'i'));
        expect(statusBadges.length).toBeGreaterThan(0);
        
        // Check that the PR link is rendered
        const prLink = screen.getByRole('link', { name: new RegExp(`PR ${contrib.issue}`, 'i') });
        expect(prLink).toBeInTheDocument();
        expect(prLink.getAttribute('href')).toBe(contrib.url);
      });
    });
  });
});
