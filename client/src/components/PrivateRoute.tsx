import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';

import { useAuth } from '../contexts/AuthContext';

import Loader from './Loader';
export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}
