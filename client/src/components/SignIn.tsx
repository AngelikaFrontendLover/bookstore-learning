import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { auth } from '../libraries/firebase';
import { useNotification } from '../contexts/NotificationContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [password, setPassword] = useState('');
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.msg) {
      setMsg(location.state.msg);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [navigate, location.state, location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showNotification({ type: 'success', message: 'Вы вошли!' });
      navigate('/', { replace: true });
    } catch (err: any) {
      showNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} className="auth__form">
        <h2 className="auth__title">Sign in</h2>
        <p className="auth__message">{msg}</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth__input"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth__input"
        />
        <Link to="/reset" className="auth__reset">
          Forgot your password? Reset
        </Link>
        <button type="submit" disabled={loading} className="auth__btn">
          {loading ? 'loading' : 'Sign in'}
        </button>
      </form>
      <Link to="/signup" className="auth__switch">
        Don't have an account? Sign up
      </Link>
    </div>
  );
}
