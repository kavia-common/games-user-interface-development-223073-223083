import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Footer with minimal, on-brand styling. */
  return (
    <footer className="footer" role="contentinfo">
      <div className="container" style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'var(--color-text-muted)' }}>
          © {new Date().getFullYear()} Games UI. All rights reserved.
        </div>
        <nav aria-label="Footer">
          <a href="#privacy" className="nav-link">Privacy</a>
          <a href="#terms" className="nav-link">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
