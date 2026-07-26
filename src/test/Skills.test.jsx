import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Skills from '../components/Skills/Skills';
import { skills } from '../data/portfolio';

describe('Skills Component', () => {
  it('renders terminal shell with title, filter prompt, and skills categories', () => {
    render(<Skills />);
    expect(screen.getByText(/soham@grid:~\/skills.sh/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Filter skills by keyword/i)).toBeInTheDocument();
    expect(screen.getByText(/Indexed \d+ of \d+ technologies/i)).toBeInTheDocument();

    Object.values(skills).forEach((cat) => {
      expect(screen.getByText(new RegExp(cat.label, 'i'))).toBeInTheDocument();
    });
  });

  it('filters skills based on user input query and clears filter on clear click', async () => {
    const user = userEvent.setup();
    render(<Skills />);

    const input = screen.getByLabelText(/Filter skills by keyword/i);

    await user.type(input, 'docker');

    expect(screen.getByText(/Indexed \d+ of \d+ technologies/i)).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.queryByText('Java')).not.toBeInTheDocument();

    const clearBtn = screen.getByRole('button', { name: /CLEAR/i });
    await user.click(clearBtn);

    expect(input.value).toBe('');
    expect(screen.getByText(/Indexed \d+ of \d+ technologies/i)).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });

  it('displays no skills message when query has no matches', async () => {
    const user = userEvent.setup();
    render(<Skills />);

    const input = screen.getByLabelText(/Filter skills by keyword/i);
    await user.type(input, 'nonexistentxyz');

    expect(screen.getByText(/grep: no skills found matching "nonexistentxyz"/i)).toBeInTheDocument();
  });
});

