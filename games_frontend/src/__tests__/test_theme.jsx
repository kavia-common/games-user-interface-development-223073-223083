import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Utility to read data-theme on <html>
const getHtmlTheme = () => document.documentElement.getAttribute('data-theme');

describe('Theme toggle', () => {
  beforeEach(() => {
    // Clean storage and reset document attribute before each test
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    // Mock matchMedia to a deterministic value (light)
    window.matchMedia = window.matchMedia || function () {
      return { matches: false, addListener: () => {}, removeListener: () => {} };
    };
  });

  test('toggles theme and persists to localStorage', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Toggle button is inside Navbar
    const toggle = screen.getByRole('button', { name: /switch to dark theme/i });
    // Initially "light" chosen, so html should be set to light after effect
    // Effects run immediately in RTL + jsdom
    expect(getHtmlTheme()).toBe('light');

    // Click to switch to dark
    fireEvent.click(toggle);
    expect(getHtmlTheme()).toBe('dark');
    expect(window.localStorage.getItem('ui-theme')).toBe('dark');

    // Button label updates to allow switching back to light
    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument();

    // Click again to switch back to light
    fireEvent.click(screen.getByRole('button', { name: /switch to light theme/i }));
    expect(getHtmlTheme()).toBe('light');
    expect(window.localStorage.getItem('ui-theme')).toBe('light');
  });

  test('reads persisted theme from localStorage on mount', () => {
    window.localStorage.setItem('ui-theme', 'dark');

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Should apply dark directly from storage
    expect(getHtmlTheme()).toBe('dark');
    // Button should indicate ability to switch to light
    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument();
  });
});
