import { useState } from 'react';
import { Loader2, Lock, Mail, User as UserIcon } from 'lucide-react';
import { COLORS, SEED_USERS } from '../data/titles';
import { hashPassword, sanitizeText } from '../utils/security';

function safeAsync(op, fallbackMessage) {
  try {
    const result = op();
    if (result && typeof result.then === 'function') {
      return result.catch(() => {
        throw new Error(fallbackMessage);
      });
    }
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(new Error(fallbackMessage));
  }
}

export default function AuthScreen({ users, onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    const safeEmail = sanitizeText(email, 80).toLowerCase();
    const safeName = sanitizeText(name, 80);
    const safePassword = sanitizeText(password, 120);

    if (!safeEmail || !safePassword || (mode === 'signup' && !safeName)) {
      setError('Fill in every field to continue.');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 650));

      if (mode === 'login') {
        const match = users.find((u) => u.email.toLowerCase() === safeEmail);
        const hashedInput = await hashPassword(safePassword);
        if (!match || match.password !== hashedInput) {
          setError('Invalid email or password.');
          setLoading(false);
          return;
        }
        setLoading(false);
        onAuthenticated(match, false);
      } else {
        const exists = users.find((u) => u.email.toLowerCase() === safeEmail);
        if (exists) {
          setError('An account already exists with that email.');
          setLoading(false);
          return;
        }
        if (safePassword.length < 6) {
          setError('Password should be at least 6 characters.');
          setLoading(false);
          return;
        }
        const newUser = {
          id: 'u' + (users.length + 1) + '-' + Date.now().toString(36).slice(-4),
          name: safeName,
          email: safeEmail,
          password: await hashPassword(safePassword),
          avatarColor: ['#4C7BD9', '#D9748C', '#3EC9A7', '#E8A33D', '#8B7FD1'][users.length % 5],
        };
        setLoading(false);
        onAuthenticated(newUser, true);
      }
    } catch (error) {
      setError('We could not complete that request.');
      setLoading(false);
    }
  };

  const quickLogin = async (user) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setLoading(false);
      onAuthenticated(user, false);
    } catch (error) {
      setError('We could not sign you in right now.');
      setLoading(false);
    }
  };

  return (
    <div className="page-shell" style={{ display: 'grid', placeItems: 'center', padding: '1.5rem' }}>
      <div className="auth-card">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-7 h-7 rounded" style={{ background: COLORS.gold }} />
          <span className="font-bold text-2xl tracking-tight">Sift</span>
        </div>

        <div className="auth-switcher">
          {['login', 'signup'].map((m) => (
            <button key={m} className={mode === m ? 'active' : ''} onClick={() => { setMode(m); resetFields(); }}>
              {m === 'login' ? 'Log in' : 'Sign up'}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3">
          {mode === 'signup' && (
            <label className="form-field">
              <UserIcon size={15} color={COLORS.mutedDim} />
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            </label>
          )}
          <label className="form-field">
            <Mail size={15} color={COLORS.mutedDim} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" aria-label="Email" />
          </label>
          <label className="form-field">
            <Lock size={15} color={COLORS.mutedDim} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" aria-label="Password" />
          </label>

          {error && <p role="alert" aria-live="polite" style={{ color: '#E8697D', fontSize: '0.75rem' }}>{error}</p>}

          <button type="submit" className="primary-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
            {loading && <Loader2 size={14} className="animate-spin" style={{ marginRight: '0.4rem' }} />}
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${COLORS.border}` }}>
          <p className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            Or try a demo account
          </p>
          <div className="flex flex-col gap-2">
            {users.filter((u) => SEED_USERS.some((s) => s.id === u.id)).map((u) => (
              <button key={u.id} onClick={() => quickLogin(u)} disabled={loading} className="secondary-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left' }}>
                <div className="avatar" style={{ background: u.avatarColor }}>
                  {u.name.split(' ').map((p) => p[0]).join('')}
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{u.name}</p>
                  <p className="text-muted" style={{ fontSize: '0.68rem' }}>Pre-rated viewing history</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-muted" style={{ textAlign: 'center', fontSize: '0.7rem', marginTop: '1.25rem' }}>
          Simulated authentication — accounts and ratings live only in this session.
        </p>
      </div>
    </div>
  );
}
