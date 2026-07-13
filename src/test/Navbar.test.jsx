import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar/Navbar';
import { navItems } from '../data/portfolio';

describe('Navbar', () => {
  it('renders a link for every nav item', () => {
    render(<Navbar />);
    navItems.forEach((item) => {
      // Desktop and mobile-overlay both render the label, so use getAllByText
      const matches = screen.getAllByText(item.label);
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  it('marks the hero link active by default', () => {
    render(<Navbar />);
    const homeLinks = screen.getAllByText('Home');
    const activeHomeLink = homeLinks.find(
      (el) => el.closest('a')?.getAttribute('aria-current') === 'page'
    );
    expect(activeHomeLink).toBeTruthy();
  });
});