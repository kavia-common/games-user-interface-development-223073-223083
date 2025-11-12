import React from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange, placeholder = 'Search games…', label = 'Search', autoFocus = false }) {
  /** Accessible search input with icon. */
  const id = 'search-input';
  return (
    <div role="search" aria-label="Site">
      <label htmlFor={id} className="hidden">{label}</label>
      <div style={{ position: 'relative' }}>
        <div aria-hidden="true" style={{ position: 'absolute', insetInlineStart: 10, insetBlockStart: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
          🔎
        </div>
        <input
          id={id}
          className="input"
          style={{ paddingInlineStart: 36 }}
          type="search"
          inputMode="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
}
