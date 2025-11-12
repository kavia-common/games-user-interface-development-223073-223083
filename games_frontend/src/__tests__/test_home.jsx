import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

// Since Home uses setTimeout 300ms, use fake timers
jest.useFakeTimers();

function renderHome() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Home grid and search filter', () => {
  test('renders game tiles after loading', async () => {
    renderHome();

    // Initially skeleton tiles shown (aria-busy)
    expect(screen.getAllByRole('generic', { hidden: true })).toBeDefined();

    // Advance timers to finish loading
    await act(async () => {
      jest.advanceTimersByTime(350);
    });

    // After load, should render a grid with cards; verify presence of known game titles
    expect(screen.getByRole('heading', { name: /games/i })).toBeInTheDocument();
    expect(await screen.findByText(/Ocean Strategy/i)).toBeInTheDocument();
    expect(screen.getByText(/Amber Rush/i)).toBeInTheDocument();
  });

  test('filters games using SearchBar input', async () => {
    renderHome();

    await act(async () => {
      jest.advanceTimersByTime(350);
    });

    // Type 'puzzle' should show "Coral Puzzle" and hide others not matching
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'puzzle' } });

    // Grid should now include Coral Puzzle
    expect(await screen.findByText(/Coral Puzzle/i)).toBeInTheDocument();
    // And should not show Amber Rush anymore
    expect(screen.queryByText(/Amber Rush/i)).toBeNull();

    // Clearing search returns items
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(await screen.findByText(/Amber Rush/i)).toBeInTheDocument();
  });

  test('category filter pills work together with search', async () => {
    renderHome();

    await act(async () => {
      jest.advanceTimersByTime(350);
    });

    // Click category "Arcade"
    const arcadeTab = screen.getByRole('tab', { name: /Arcade/i });
    fireEvent.click(arcadeTab);

    // Now only Arcade games should be present; verify an Arcade title and absence of Strategy one
    expect(await screen.findByText(/Amber Rush/i)).toBeInTheDocument();
    expect(screen.queryByText(/Ocean Strategy/i)).toBeNull();

    // Apply search that doesn't match any arcade item
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    // Expect empty state message
    expect(await screen.findByText(/No games found/i)).toBeInTheDocument();
  });
});
