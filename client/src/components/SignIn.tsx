import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../libraries/firebase';
import { useNotification } from '../contexts/NotificationContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await auth.currentUser?.reload();
      const updatedUser = auth.currentUser;

      if (!updatedUser?.emailVerified) {
        showNotification({ type: 'error', message: 'Please confirm your email. Or press reset password.' });
        setLoading(false);
        return;
      }

      showNotification({ type: 'success', message: 'Login successful!' });
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
          placeholder="Password"
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
