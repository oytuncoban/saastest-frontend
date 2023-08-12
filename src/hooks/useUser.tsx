import { useState } from 'react';
import network from '@/services/network';

function useUser() {
  const [user, setUser] = useState(localStorage.getItem('user'));

  if (user) {
    const userWithMethods = JSON.parse(user);
    userWithMethods.logout = async () => {
      network.get('/auth/logout').then(() => {
        setUser(null);
        localStorage.removeItem('user');
      });
    };
    return userWithMethods;
  }

  return null;
}

export default useUser;
