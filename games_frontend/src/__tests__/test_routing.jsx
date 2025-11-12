import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';

// Helper to render App at a given initial route
function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Routing', () => {
  test('renders Home on root path "/"', async () => {
    renderAt('/');
    // Home header shows 'games'
    expect(await screen.findByRole('heading', { name: /games/i })).toBeInTheDocument();
    // And a description text
    expect(screen.getByText(/discover and explore/i)).toBeInTheDocument();
  });

  test('renders GameDetails shell on /games/:id', async () => {
    renderAt('/games/1');
    // Suspense fallback first, then details title should appear
    expect(screen.getByRole('status')).toHaveTextContent(/loading/i);
    const title = await screen.findByRole('heading', { name: /ocean strategy/i });
    expect(title).toBeInTheDocument();
    // A tab button "Overview" exists in details page
    expect(screen.getByRole('button', { name: /overview/i })).toBeInTheDocument();
  });

  test('renders NotFound on unknown route', async () => {
    renderAt('/some/unknown/route');
    const heading = await screen.findByRole('heading', { name: /404 - page not found/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument();
  });
});
