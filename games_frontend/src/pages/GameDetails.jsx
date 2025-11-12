import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import gamesData from '../data/games.json';
import Badge from '../components/Badge';
import Tile from '../components/Tile';

// PUBLIC_INTERFACE
export default function GameDetails() {
  /** Details page for an individual game (placeholder content). */
  const { id } = useParams();
  const game = useMemo(() => gamesData.find((g) => String(g.id) === String(id)), [id]);

  if (!game) {
    return (
      <section className="empty">
        <p>We couldn't find that game.</p>
        <p><Link className="nav-link" to="/">Return to Home</Link></p>
      </section>
    );
  }

  return (
    <article aria-labelledby="game-title" style={{ display: 'grid', gap: '1rem' }}>
      <div className="main-surface" style={{ overflow: 'hidden' }}>
        <div style={{ aspectRatio: '16 / 6', background: 'var(--gradient-subtle)', display: 'grid', placeItems: 'center', color: 'var(--color-text-muted)' }}>
          {/* Hero/banner placeholder - replace with real banner/cover image */}
          <span>Banner</span>
        </div>
        <div style={{ padding: '1rem' }}>
          <h1 id="game-title" className="page-title">{game.title}</h1>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <Badge variant="success">⭐ {game.rating}</Badge>
            <Badge>👥 {game.players} players</Badge>
            {game.category && <Badge>{game.category}</Badge>}
          </div>
          <p style={{ marginTop: '0.75rem', color: 'var(--color-text-muted)' }}>
            {game.description || 'No description available yet. This is a placeholder text describing the game features and storyline.'}
          </p>
        </div>
      </div>

      <Tile className="main-surface" as="section" aria-label="Tabs">
        <div style={{ borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '0.5rem', padding: '0.5rem 0.75rem' }}>
          <button className="btn btn-ghost" aria-selected="true">Overview</button>
          <button className="btn btn-ghost" aria-selected="false">Screenshots</button>
          <button className="btn btn-ghost" aria-selected="false">Reviews</button>
        </div>
        <div style={{ padding: '1rem' }}>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Tab content placeholder. Replace with real sections based on requirements.
          </p>
        </div>
      </Tile>
    </article>
  );
}
