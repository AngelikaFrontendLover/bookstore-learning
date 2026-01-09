import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../libraries/firebase';
import { useNotification } from '../contexts/NotificationContext';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg('Письмо для восстановления отправлено.');
    } catch (err: any) {
      showNotification({ type: 'error', message: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Восстановление пароля</h2>
      {msg && <p>{msg}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Отправить</button>
    </form>
  );
}
