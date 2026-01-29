import { signOut } from 'firebase/auth';

import { auth } from '../libraries/firebase';

export default function SignOutButton() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return <button onClick={handleLogout}>Log out</button>;
}
