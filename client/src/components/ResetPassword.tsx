import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../libraries/firebase';
import { useNotification } from '../contexts/NotificationContext';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      showNotification({ type: 'info', message: 'Message sent' });
      navigate('/signin', {
        replace: true,
      });
    } catch (err: any) {
      showNotification({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} className="auth__form">
        <h2 className="auth__title">Reset</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth__input"
        />
        <button type="submit" className="auth__btn">
          Send
        </button>
      </form>
    </div>
  );
}
