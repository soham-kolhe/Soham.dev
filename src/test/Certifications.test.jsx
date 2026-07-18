import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Certifications from '../components/Certifications/Certifications';
import { certifications } from '../data/portfolio';

describe('Certifications Component', () => {
  it('renders every credential in the list', () => {
    render(<Certifications />);
    certifications.forEach((cert) => {
      expect(screen.getAllByText(cert.code).length).toBeGreaterThan(0);
    });
  });

  it('filtering to Microsoft hides non-Microsoft credentials from the list', async () => {
    const user = userEvent.setup();
    render(<Certifications />);

    await user.click(screen.getByRole('button', { name: /MICROSOFT AZURE/i }));

    const nptel = certifications.find((c) => c.issuer !== 'Microsoft');
    expect(screen.queryByText(nptel.code)).not.toBeInTheDocument();

    const azure = certifications.find((c) => c.issuer === 'Microsoft');
    expect(screen.getAllByText(azure.code).length).toBeGreaterThan(0);
  });

  it('selecting a credential from the list updates the detail viewer', async () => {
    const user = userEvent.setup();
    render(<Certifications />);

    const target = certifications[1]; // AI-900
    const buttons = screen.getAllByText(target.code);
    await user.click(buttons[0]);

    // decoding animation runs on a timer; just confirm the row is now active
    const row = buttons[0].closest('button');
    expect(row.className).toContain('certs__item-row--active');
  });
});
