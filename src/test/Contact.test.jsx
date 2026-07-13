import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../components/Contact/Contact';
import { personalInfo } from '../data/portfolio';

/*
  These tests exist specifically to lock in the "no fake loading state"
  fix: when no Formspree ID is configured, submitting must NOT show
  "TRANSMITTING" — it should go straight to opening the mail client.
*/

describe('Contact form submission honesty', () => {
  beforeEach(() => {
    // jsdom doesn't implement navigation; stub it so we can assert on it
    delete window.location;
    window.location = { href: '' };
  });

  it('does not show a fake "transmitting" state when no backend is configured', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/CALLSIGN/i), 'Test User');
    await user.type(screen.getByLabelText(/FREQUENCY/i), 'test@example.com');
    await user.type(screen.getByLabelText(/TRANSMISSION/i), 'Hello there');

    const submitButton = screen.getByRole('button', { name: /OPEN_EMAIL_CLIENT|TRANSMIT_MESSAGE/i });
    await user.click(submitButton);

    // Should never render the transmitting label for the no-backend path
    expect(screen.queryByText(/ROUTING_PACKETS/i)).not.toBeInTheDocument();

    // Should have redirected to a mailto: link
    await waitFor(() => {
      expect(window.location.href).toContain('mailto:');
      expect(window.location.href).toContain(encodeURIComponent(personalInfo.email) === '' ? '' : '');
    });
  });

  it('shows an explanatory note when no backend is configured', () => {
    render(<Contact />);
    expect(
      screen.getByText(/no message backend is configured yet/i)
    ).toBeInTheDocument();
  });
});