import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../components/Contact/Contact';
import { personalInfo } from '../data/portfolio';

/*
  These tests exist specifically to lock in the "no fake loading state"
  fix: when no Formspree ID is configured, submitting must NOT show
  "SENDING" — it should go straight to opening the mail client.
*/

describe('Contact form submission honesty', () => {
  beforeEach(() => {
    // jsdom doesn't implement navigation; stub it so we can assert on it
    delete window.location;
    window.location = { href: '' };
  });

  it('does not show a fake "transmitting" state when no backend is configured', async () => {
    const user = userEvent.setup();
    const originalFormspreeId = personalInfo.formspreeId;
    personalInfo.formspreeId = '';

    render(<Contact />);

    await user.type(screen.getByLabelText(/Name/i), 'Test User');
    await user.type(screen.getByRole('textbox', { name: /Email/i }), 'test@example.com');
    await user.type(screen.getByLabelText(/Message/i), 'Hello there');

    const submitButton = screen.getByRole('button', { name: /OPEN EMAIL CLIENT|SEND MESSAGE/i });
    await user.click(submitButton);

    // Should never render the "SENDING" status label for the no-backend path
    expect(screen.queryByText(/● SENDING/)).not.toBeInTheDocument();

    // Should have redirected to a mailto: link
    await waitFor(() => {
      expect(window.location.href).toContain('mailto:');
    });

    personalInfo.formspreeId = originalFormspreeId;
  }, 10000);
});

describe('Contact Formspree backend integration', () => {
  it('handles successful Formspree transmission correctly', async () => {
    const user = userEvent.setup();
    const originalFetch = global.fetch;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true }),
    });

    render(<Contact />);

    await user.type(screen.getByLabelText(/Name/i), 'Soham Tester');
    await user.type(screen.getByRole('textbox', { name: /Email/i }), 'soham@example.com');
    await user.type(screen.getByLabelText(/Message/i), 'Test transmission message');

    const submitButton = screen.getByRole('button', { name: /SEND MESSAGE/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/MESSAGE SENT/i)).toBeInTheDocument();
      expect(screen.getByText(/MESSAGE_SENT/i)).toBeInTheDocument();
    });

    global.fetch = originalFetch;
  }, 10000);

  it('handles Formspree transmission failure correctly', async () => {
    const user = userEvent.setup();
    const originalFetch = global.fetch;

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Form not found' }),
    });

    render(<Contact />);

    await user.type(screen.getByLabelText(/Name/i), 'Soham Tester');
    await user.type(screen.getByRole('textbox', { name: /Email/i }), 'soham@example.com');
    await user.type(screen.getByLabelText(/Message/i), 'Test error transmission');

    const submitButton = screen.getByRole('button', { name: /SEND MESSAGE/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/TRY AGAIN/i)).toBeInTheDocument();
      expect(screen.getByText(/SEND_FAILED/i)).toBeInTheDocument();
      expect(screen.getByText(/Message failed to send/i)).toBeInTheDocument();
    });

    global.fetch = originalFetch;
  }, 10000);
});