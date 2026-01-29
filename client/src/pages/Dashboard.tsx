import { useAuth } from '../contexts/AuthContext';
import SignOutButton from '../components/SignOutButton';
export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Personal account</h2>
      <p>You are logged in as: {user?.email}</p>
      <SignOutButton />
    </div>
  );
}
