import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

import { auth } from '../libraries/firebase';
import { useAuth } from '../contexts/AuthContext';

import Loader from './Loader';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [ready, setReady] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const check = async () => {
      const current = auth.currentUser;

      if (!current) {
        setVerified(false);
        setReady(true);
        return;
      }

      await current.reload();
      setVerified(current.emailVerified);
      setReady(true);
    };

    check();
  }, [user]);

  if (loading || !ready) return <Loader />;

  if (!user) return <Navigate to="/signin" replace />;
  if (!verified) return <Navigate to="/signin" replace />;

  return <>{children}</>;
}
