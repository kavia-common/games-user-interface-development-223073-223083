import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import GameCard from '../components/GameCard';
import Tile from '../components/Tile';
import classNames from '../utils/classNames';
import gamesData from '../data/games.json';

const CATEGORIES = ['All', 'Strategy', 'Arcade', 'Puzzle', 'Adventure'];

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page for listing games with search and categories. */
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);

  useEffect(() => {
    // simulate loading
    const t = setTimeout(() => {
      setGames(gamesData);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return games.filter((g) => {
      const matchQ = !needle || g.title.toLowerCase().includes(needle) || (g.category || '').toLowerCase().includes(needle);
      const matchC = category === 'All' || (g.category || '') === category;
      return matchQ && matchC;
    });
  }, [q, category, games]);

  return (
    <section aria-labelledby="page-title">
      <header className="page-header">
        <h1 id="page-title" className="page-title">games</h1>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
          Discover and explore featured games.
        </p>
      </header>

      <div className="main-surface" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
          <SearchBar value={q} onChange={setQ} />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} role="tablist" aria-label="Categories">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                className={classNames('pill', category === c && 'btn')}
                onClick={() => setCategory(c)}
                style={{ border: 'none', cursor: 'pointer' }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid cards">
            {Array.from({ length: 8 }).map((_, i) => (
              <Tile key={i} aria-busy="true" style={{ height: 220, background: 'var(--color-hover)' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            No games found. Try adjusting your search or filters.
          </div>
        ) : (
          <div className="grid cards" aria-live="polite">
            {filtered.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
