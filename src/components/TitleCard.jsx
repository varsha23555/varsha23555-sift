import StarRating from './StarRating';
import Poster from './Poster';
import { Clock } from 'lucide-react';

export default function TitleCard({ t, rating, onRate, onOpen, compact, watched, meta }) {
  return (
    <div
      onClick={() => onOpen(t)}
      className={`card title-card ${compact ? 'title-card--compact' : ''}`}
    >
      <Poster t={t} height={compact ? 84 : 100} watched={watched} />
      <div className="title-card__body">
        <h3 className="title-card__title">{t.title}</h3>
        {meta ? (
          <p className="title-card__meta title-card__meta--muted flex items-center gap-2">
            <Clock size={10} /> {meta}
          </p>
        ) : (
          <p className="title-card__meta">
            {t.genres.join(' / ')} · {t.year}
          </p>
        )}
        <StarRating value={rating || 0} onRate={(n) => onRate(t.id, n)} size={14} />
      </div>
    </div>
  );
}
