import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import { SEED_RATINGS, SEED_USERS, SEED_WATCHED } from './data/titles';

export default function App() {
  const [users, setUsers] = useState(SEED_USERS);
  const [usersRatings, setUsersRatings] = useState(SEED_RATINGS);
  const [usersWatched, setUsersWatched] = useState(SEED_WATCHED);
  const [currentUser, setCurrentUser] = useState(null);
  const [appError, setAppError] = useState('');

  const handleAuthenticated = (user, isNew) => {
    try {
      if (isNew) {
        setUsers((prev) => [...prev, user]);
        setUsersRatings((prev) => ({ ...prev, [user.id]: {} }));
        setUsersWatched((prev) => ({ ...prev, [user.id]: [] }));
      }
      setCurrentUser(user);
      setAppError('');
    } catch (error) {
      setAppError('We could not sign you in right now.');
    }
  };

  const rate = (titleId, stars) => {
    if (!currentUser) {
      setAppError('Please sign in before rating titles.');
      return;
    }
    try {
      setUsersRatings((prev) => ({
        ...prev,
        [currentUser.id]: { ...(prev[currentUser.id] || {}), [titleId]: stars },
      }));
      setAppError('');
    } catch (error) {
      setAppError('We could not save that rating.');
    }
  };

  const markWatched = (titleId) => {
    if (!currentUser) {
      setAppError('Please sign in before opening a title.');
      return;
    }
    try {
      setUsersWatched((prev) => {
        const existing = (prev[currentUser.id] || []).filter((w) => w.id !== titleId);
        const updated = [{ id: titleId, watchedAt: Date.now() }, ...existing].slice(0, 20);
        return { ...prev, [currentUser.id]: updated };
      });
      setAppError('');
    } catch (error) {
      setAppError('We could not update your watch history.');
    }
  };

  if (!currentUser) {
    return <AuthScreen users={users} onAuthenticated={handleAuthenticated} />;
  }

  return (
    <>
      {appError && (
        <div role="status" aria-live="polite" style={{ position: 'fixed', top: '0.8rem', left: '50%', transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 0.9rem', borderRadius: '999px', background: '#171D33', border: '1px solid #E8697D', color: '#F1EEE6', fontSize: '0.8rem' }}>
          <AlertCircle size={14} color="#E8697D" />
          <span>{appError}</span>
        </div>
      )}
      <Dashboard
        user={currentUser}
        ratings={usersRatings[currentUser.id] || {}}
        rate={rate}
        watched={usersWatched[currentUser.id] || []}
        onWatch={markWatched}
        onLogout={() => { setCurrentUser(null); setAppError(''); }}
      />
    </>
  );
}
