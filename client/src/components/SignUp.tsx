import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../libraries/firebase';
import { useNotification } from '../contexts/NotificationContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }
      showNotification({ type: 'success', message: 'You have registered successfully!' });
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
        <h2 className="auth__title">Sign up</h2>
        <input
          type="text"
          placeholder="Name (optional)"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="auth__input"
        />
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
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth__input"
        />
        <button type="submit" disabled={loading} className="auth__btn">
          {loading ? 'Creating...' : 'Sign up'}
        </button>
      </form>
      <Link to="/signin" className="auth__switch">
        Already have an account? Sign in
      </Link>
    </div>
  );
}
