import { useMemo, useState } from 'react';
import { AlertCircle, LogOut } from 'lucide-react';
import Carousel from './Carousel';
import TitleCard from './TitleCard';
import TitleModal from './TitleModal';
import { TITLES } from '../data/titles';

function timeAgo(ts) {
  const diffMin = Math.floor((Date.now() - ts) / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

function overlapScore(a, b) {
  const g = a.genres.filter((x) => b.genres.includes(x)).length;
  const m = a.moods.filter((x) => b.moods.includes(x)).length;
  return g * 2 + m;
}

export default function Dashboard({ user, ratings, rate, watched, onWatch, onLogout }) {
  const [selected, setSelected] = useState(null);
  const [activeGenre, setActiveGenre] = useState('All');
  const [statusMessage, setStatusMessage] = useState('');

  const openTitle = (t) => {
    try {
      onWatch(t.id);
      setSelected(t);
      setStatusMessage('');
    } catch (error) {
      setStatusMessage('We could not open that title right now.');
    }
  };

  const handleRate = (titleId, stars) => {
    try {
      rate(titleId, stars);
      setStatusMessage('');
    } catch (error) {
      setStatusMessage('We could not save that rating.');
    }
  };

  const handleGenreChange = (genre) => {
    try {
      setActiveGenre(genre);
      setStatusMessage('');
    } catch (error) {
      setStatusMessage('We could not change the genre filter.');
    }
  };

  const genres = useMemo(() => {
    const s = new Set();
    TITLES.forEach((t) => s.add(t.genres[0]));
    return Array.from(s);
  }, []);

  const genreGroups = useMemo(() => {
    const map = {};
    TITLES.forEach((t) => {
      const g = t.genres[0];
      if (!map[g]) map[g] = [];
      map[g].push(t);
    });
    return map;
  }, []);

  const recommended = useMemo(() => {
    const ratedIds = new Set(Object.keys(ratings).map(Number));
    const candidates = TITLES.filter((t) => !ratedIds.has(t.id));
    const positives = Object.entries(ratings).filter(([, s]) => s >= 4).map(([id]) => Number(id));
    const negatives = Object.entries(ratings).filter(([, s]) => s > 0 && s <= 2).map(([id]) => Number(id));

    if (positives.length === 0) {
      return [...candidates].sort((a, b) => b.pop - a.pop).slice(0, 6);
    }

    const scored = candidates.map((t) => {
      let score = 0;
      positives.forEach((id) => {
        const liked = TITLES.find((x) => x.id === id);
        const w = (ratings[id] - 3) / 2;
        score += overlapScore(liked, t) * w;
      });
      negatives.forEach((id) => {
        const disliked = TITLES.find((x) => x.id === id);
        const w = (3 - ratings[id]) / 2;
        score -= overlapScore(disliked, t) * w * 0.6;
      });
      return { t, score };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, 6).map((s) => s.t);
  }, [ratings]);

  const recentlyWatched = useMemo(() => {
    return watched.slice(0, 10).map((w) => ({ t: TITLES.find((x) => x.id === w.id), watchedAt: w.watchedAt })).filter((w) => w.t);
  }, [watched]);

  const ratedCount = Object.values(ratings).filter((v) => v > 0).length;
  const visibleGenres = activeGenre === 'All' ? genres : [activeGenre];

  return (
    <div className="page-shell">
      <header className="header">
        <div className="header__inner">
          <div className="header__brand">
            <div className="w-6 h-6 rounded" style={{ background: '#E8A33D' }} />
            <span>Sift</span>
          </div>
          <div className="header__actions">
            <span className="text-muted" style={{ fontSize: '0.72rem' }}>
              {ratedCount} title{ratedCount === 1 ? '' : 's'} rated
            </span>
            <div className="flex items-center gap-2">
              <div className="avatar" style={{ background: user.avatarColor }}>
                {user.name.split(' ').map((p) => p[0]).join('')}
              </div>
              <span className="text-muted" style={{ fontSize: '0.8rem', display: 'none' }}>
                {user.name}
              </span>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2" style={{ border: `1px solid #2A3150`, borderRadius: '0.7rem', padding: '0.45rem 0.7rem', background: 'transparent', color: '#8B93AC' }}>
              <LogOut size={12} /> Log out
            </button>
          </div>
        </div>
      </header>

      <main className="app-shell" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {statusMessage && (
          <div role="status" aria-live="polite" className="panel" style={{ padding: '0.9rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#F1EEE6' }}>
            <AlertCircle size={16} color="#E8697D" />
            <span style={{ fontSize: '0.85rem' }}>{statusMessage}</span>
          </div>
        )}
        <section>
          <h2 className="section-title">Recommended for You</h2>
          <p className="section-subtitle">
            {ratedCount === 0 ? 'Popular picks to get started — rate a few titles and this updates for you.' : 'Based on the titles you\'ve rated highly.'}
          </p>
          <Carousel>
            {recommended.map((t) => (
              <TitleCard key={t.id} t={t} rating={ratings[t.id]} onRate={rate} onOpen={openTitle} watched={watched.some((w) => w.id === t.id)} />
            ))}
          </Carousel>
        </section>

        <section>
          <h2 className="section-title">Recently Watched</h2>
          <p className="section-subtitle">
            {recentlyWatched.length === 0 ? 'Nothing watched yet — open a title to add it here.' : 'Pick up where you left off.'}
          </p>
          {recentlyWatched.length === 0 ? (
            <div className="panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
              Your viewing history will show up here.
            </div>
          ) : (
            <Carousel>
              {recentlyWatched.map(({ t, watchedAt }) => (
                <TitleCard key={t.id + '-' + watchedAt} t={t} rating={ratings[t.id]} onRate={handleRate} onOpen={openTitle} watched meta={timeAgo(watchedAt)} />
              ))}
            </Carousel>
          )}
        </section>

        <section>
          <h2 className="section-title">Browse by Genre</h2>
          <div className="flex gap-2 wrap mt-2" style={{ marginBottom: '1rem' }}>
            {['All', ...genres].map((g) => (
              <button key={g} onClick={() => handleGenreChange(g)} className={`filter-chip ${activeGenre === g ? 'active' : ''}`}>
                {g}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {visibleGenres.map((g) => (
              <div key={g}>
                <h3 className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  {g}
                </h3>
                <Carousel>
                  {genreGroups[g].map((t) => (
                    <TitleCard key={t.id} t={t} rating={ratings[t.id]} onRate={handleRate} onOpen={openTitle} watched={watched.some((w) => w.id === t.id)} />
                  ))}
                </Carousel>
              </div>
            ))}
          </div>
        </section>
      </main>

      {selected && (
        <TitleModal title={selected} ratings={ratings} onRate={rate} onClose={() => setSelected(null)} onSelect={openTitle} />
      )}
    </div>
  );
}
