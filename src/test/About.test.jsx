import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../components/About/About';
import { personalInfo, certifications } from '../data/portfolio';

describe('About Component', () => {
  it('renders operator dossier title and biography text', () => {
    render(<About />);
    expect(screen.getByText(/SYS.OPERATOR_DOSSIER/i)).toBeInTheDocument();
    expect(screen.getByText(/operator_bio.txt/i)).toBeInTheDocument();

    const firstBioSegment = personalInfo.bio[0][0].text;
    expect(screen.getByText(firstBioSegment)).toBeInTheDocument();
  });

  it('renders achievements grid and education details', () => {
    render(<About />);
    expect(screen.getByText(/operator_achievements.log/i)).toBeInTheDocument();
    expect(screen.getByText(/Open to Opportunities/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${certifications.length} Certifications`, 'i'))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`CGPA ${personalInfo.education.cgpa.split(' ')[0]}`, 'i'))
    ).toBeInTheDocument();
  });

  it('renders call to action link to shipped projects', () => {
    render(<About />);
    const ctaLink = screen.getByRole('link', { name: /Explore Shipped Projects/i });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink.getAttribute('href')).toBe('#projects');
  });
});

