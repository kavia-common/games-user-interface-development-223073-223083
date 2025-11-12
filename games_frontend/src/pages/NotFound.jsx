import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFound() {
  /** 404 page with link back home. */
  return (
    <section className="empty" role="alert">
      <h1 style={{ marginTop: 0 }}>404 - Page not found</h1>
      <p>We can't seem to find the page you're looking for.</p>
      <p><Link className="btn" to="/">Go Home</Link></p>
    </section>
  );
}
