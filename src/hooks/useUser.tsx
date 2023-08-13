import { useState } from 'react';
import network from '@/services/network';

function useUser() {
  const [user, setUser] = useState(localStorage.getItem('user'));

  if (user) {
    const userWithMethods = JSON.parse(user);
    userWithMethods.logout = async () => {
      network.get('/auth/logout');
    };
    return { user: userWithMethods, setUser };
  }

  return { user: null, setUser };
}

export default useUser;
