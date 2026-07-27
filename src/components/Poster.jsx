import { Check, Play } from 'lucide-react';
import { GENRE_COLOR } from '../data/titles';

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function Poster({ t, height = 108, watched, children }) {
  const c1 = GENRE_COLOR[t.genres[0]];
  const c2 = GENRE_COLOR[t.genres[1] || t.genres[0]];
  const seed = slugify(t.title);
  const fallbackImage = `/poster-fallback-${(t.id % 4) + 1}.png`;

  return (
    <div className="poster" style={{ height }}>
      <img
        src={fallbackImage}
        alt={t.title}
        loading="lazy"
        className="poster__image"
        onError={(event) => {
          event.currentTarget.src = '/poster-fallback-1.png';
        }}
      />
      <div className="poster__overlay" style={{ background: `linear-gradient(165deg, ${c1}b3 0%, ${c2}40 55%, rgba(11,14,26,0.85) 100%)` }} />
      <div className="poster__badge">{t.genres[0]}</div>
      {watched && (
        <span className="poster__watched" title="Watched">
          <Check size={12} color="#0B0E1A" strokeWidth={3} />
        </span>
      )}
      <div className="poster__play">
        <Play size={26} color="#fff" fill="#fff" />
      </div>
      {children}
    </div>
  );
}
