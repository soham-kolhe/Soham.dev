import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OpenSource from '../components/OpenSource/OpenSource';
import { openSourceContributions } from '../data/portfolio';

describe('OpenSource Component', () => {
  it('renders the open source section and listed repositories', () => {
    render(<OpenSource />);

    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('OPEN SOURCE CONTRIBUTIONS');

    openSourceContributions.forEach((entry) => {
      expect(screen.getAllByText(entry.repo).length).toBeGreaterThan(0);
      expect(screen.getByText(entry.description)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${entry.prCount} Sub-Folders`, 'i'))).toBeInTheDocument();
    });
  });

  it('renders contribution sub-folders and displays PR details on selection', async () => {
    const user = userEvent.setup();
    render(<OpenSource />);

    const firstRepo = openSourceContributions[0];
    const firstContrib = firstRepo.contributions[0];

    // Click the sub-folder button in the tree sidebar
    const subFolderBtn = screen.getByRole('button', {
      name: new RegExp(firstContrib.folderName, 'i'),
    });
    await user.click(subFolderBtn);

    // Verify sub-folder view details
    expect(screen.getByText(new RegExp(firstContrib.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(firstContrib.about)).toBeInTheDocument();

    // Verify PR resolve link button
    const prLink = screen.getByRole('link', {
      name: new RegExp(`RESOLVE ISSUE ${firstContrib.issue}`, 'i'),
    });
    expect(prLink).toBeInTheDocument();
    expect(prLink.getAttribute('href')).toBe(firstContrib.url);
  });
});

