import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders home title', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Prefer accessible, unique selector: the page title is an <h1> "games"
  const title = await screen.findByRole('heading', { name: /games/i, level: 1 });
  expect(title).toBeInTheDocument();
});
