import React from 'react';
import { Link } from 'react-router-dom';
import Tile from './Tile';
import Badge from './Badge';

// PUBLIC_INTERFACE
export default function GameCard({ game }) {
  /** Displays a game's image, title, and metadata badges. */
  const { id, title, image, rating, players, category } = game;

  return (
    <Tile as="article" className="game-card">
      <Link to={`/games/${id}`} style={{ display: 'block', color: 'inherit' }}>
        <div style={{ aspectRatio: '16 / 9', overflow: 'hidden', borderTopLeftRadius: 'var(--radius-12)', borderTopRightRadius: 'var(--radius-12)' }}>
          {/* placeholder image block if missing */}
          {image ? (
            <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'var(--color-hover)', display: 'grid', placeItems: 'center', color: 'var(--color-text-muted)' }}>
              No image
            </div>
          )}
        </div>
        <div style={{ padding: '0.75rem 0.875rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem' }}>{title}</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <Badge variant="success">⭐ {rating}</Badge>
            <Badge>👥 {players} players</Badge>
            {category ? <Badge>{category}</Badge> : null}
          </div>
        </div>
      </Link>
    </Tile>
  );
}
