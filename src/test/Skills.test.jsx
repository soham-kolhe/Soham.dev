import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Skills from '../components/Skills/Skills';
import { skills } from '../data/portfolio';

describe('Skills Component', () => {
  it('renders terminal scan view by default', () => {
    render(<Skills />);
    expect(screen.getByText(/soham@grid/i)).toBeInTheDocument();
    expect(screen.getByText(/soham.skills.scan\(\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Scanning tech stack/i)).toBeInTheDocument();
  });

  it('toggles to quick scan view on button click', async () => {
    const user = userEvent.setup();
    render(<Skills />);
    
    const toggleBtn = screen.getByRole('button', { name: /VIEW QUICK SCAN/i });
    await user.click(toggleBtn);
    
    expect(screen.getByText(/Quick Scan/i)).toBeInTheDocument();
    
    // Check that skills items are rendered
    const flatSkills = Object.values(skills).flatMap((cat) => cat.items);
    flatSkills.forEach((skill) => {
      const elements = screen.getAllByText(new RegExp(skill.name, 'i'));
      expect(elements.length).toBeGreaterThan(0);
    });
    
    // Toggle back
    const toggleBackBtn = screen.getByRole('button', { name: /VIEW TERMINAL SCAN/i });
    await user.click(toggleBackBtn);
    
    expect(screen.getByText(/soham@grid/i)).toBeInTheDocument();
  });
});
