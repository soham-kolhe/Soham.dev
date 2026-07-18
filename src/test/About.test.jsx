import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import About from '../components/About/About';
import { personalInfo } from '../data/portfolio';

describe('About Component', () => {
  it('shows the biography tab by default', () => {
    render(<About />);
    expect(screen.getByText(personalInfo.name)).toBeInTheDocument();
  });

  it('switches to the timeline tab and shows education details', async () => {
    const user = userEvent.setup();
    render(<About />);

    await user.click(screen.getByRole('button', { name: /TIMELINE/i }));

    expect(screen.getByText(personalInfo.education.degree)).toBeInTheDocument();
    expect(screen.getByText(personalInfo.education.university)).toBeInTheDocument();
  });

  it('switches to the diagnostics tab and shows the status card', async () => {
    const user = userEvent.setup();
    render(<About />);

    await user.click(screen.getByRole('button', { name: /DIAGNOSTICS/i }));

    expect(screen.getByText(/OPEN TO OPPORTUNITIES/i)).toBeInTheDocument();
  });
});
