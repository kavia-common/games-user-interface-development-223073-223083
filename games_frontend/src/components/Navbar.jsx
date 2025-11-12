import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useTheme } from '../hooks/useTheme';
import classNames from '../utils/classNames';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="btn btn-ghost"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
      <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>
  );
}

// PUBLIC_INTERFACE
export default function Navbar() {
  /** Top navigation bar with brand and links. */
  return (
    <nav className="navbar" role="navigation" aria-label="Primary">
      <div className="container navbar-inner">
        <Link to="/" className="nav-brand" aria-label="Games Home">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/*
              Placeholder logo. Replace with Figma-exported asset:
              - Drop the new svg/png into src/assets/
              - Update import path above.
            */}
            <img src={logo} alt="" width="28" height="28" />
            <strong style={{ fontSize: '18px' }}>games</strong>
          </div>
        </Link>
        <div className={classNames('nav-links')}>
          <NavLink to="/" className="nav-link">Home</NavLink>
          <a href="#about" className="nav-link">About</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
