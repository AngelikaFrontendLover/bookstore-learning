import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Loader from './Loader';

export default function GuestRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    if (user) return <Navigate to="/" replace />;

    return <>{children}</>;
}
