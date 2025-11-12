import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// PUBLIC_INTERFACE
export default function Layout() {
  /** Shared layout wrapping pages with navbar and footer. */
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--gradient-subtle)' }}>
      <Navbar />
      <main id="main" className="container" style={{ flex: 1, width: '100%' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
