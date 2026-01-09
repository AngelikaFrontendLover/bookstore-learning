import { signOut } from 'firebase/auth';

import { auth } from '../libraries/firebase';
export default function SignOutButton() {
  return <button onClick={() => signOut(auth)}>Выйти</button>;
}
