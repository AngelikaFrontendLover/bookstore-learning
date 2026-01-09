import { useAuth } from '../contexts/AuthContext';
import SignOutButton from '../components/SignOutButton';
export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Личный кабинет</h2> <p>Вы вошли как: {user?.email}</p> <SignOutButton />
    </div>
  );
}
