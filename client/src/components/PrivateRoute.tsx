import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';

import { useAuth } from '../contexts/AuthContext';
export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading..</p>;
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}
