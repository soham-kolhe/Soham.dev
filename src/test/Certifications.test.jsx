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

  it('renders credential verification links for cards with verifyUrl', () => {
    render(<Certifications />);
    const certWithLink = certifications.find((c) => c.verifyUrl);
    const links = screen.getAllByRole('link', { name: new RegExp(certWithLink.title, 'i') });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', certWithLink.verifyUrl);
    expect(links[0]).toHaveAttribute('target', '_blank');
  });
});
