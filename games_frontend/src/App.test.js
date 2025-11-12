import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders home title', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const title = screen.getByText(/games/i);
  expect(title).toBeInTheDocument();
});
