import { useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { Film, X } from 'lucide-react';
import Poster from './Poster';
import Carousel from './Carousel';
import TitleCard from './TitleCard';
import { TITLES } from '../data/titles';
import StarRating from './StarRating';

function overlapScore(a, b) {
  const g = a.genres.filter((x) => b.genres.includes(x)).length;
  const m = a.moods.filter((x) => b.moods.includes(x)).length;
  return g * 2 + m;
}

export default function TitleModal({ title, ratings, onRate, onClose, onSelect }) {
  const similar = useMemo(() => {
    return TITLES.filter((t) => t.id !== title.id)
      .map((t) => ({ t, score: overlapScore(title, t) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((x) => x.t);
  }, [title]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="poster" style={{ height: 160 }}>
          <Poster t={title} height={160}>
            <button onClick={onClose} aria-label="Close title details" className="poster__play" style={{ justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0.7rem', opacity: 1, background: 'transparent' }}>
              <X size={16} color="#fff" />
            </button>
          </Poster>
        </div>
        <div style={{ padding: '1.25rem' }}>
          <div className="flex justify-between gap-3">
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{title.title}</h2>
              <p className="text-muted mt-1" style={{ fontSize: '0.75rem' }}>
                {title.genres.join(' / ')} · {title.moods.join(' · ')} · {title.year}
              </p>
            </div>
          </div>
          <p className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>{title.logline}</p>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-2" style={{ color: '#E8697D', fontSize: '0.75rem' }}>
              <AlertCircle size={14} />
              <span>Ratings are saved locally for this session.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-dim" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Your rating</span>
            <StarRating value={ratings[title.id] || 0} onRate={(n) => onRate(title.id, n)} size={20} />
          </div>

          <div className="mt-4" style={{ borderTop: '1px solid #2A3150', paddingTop: '1rem' }}>
            <h3 className="flex items-center gap-2" style={{ color: '#E8A33D', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <Film size={13} /> More Like This
            </h3>
            <div className="mt-3">
              <Carousel>
                {similar.map((t) => (
                  <TitleCard key={t.id} t={t} rating={ratings[t.id]} onRate={onRate} onOpen={onSelect} compact />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
