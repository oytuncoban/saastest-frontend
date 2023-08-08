import { useState } from 'react';

function useUser() {
  const [user, setUser] = useState(localStorage.getItem('user'));

  if (user) {
    const userWithMethods = JSON.parse(user);
    userWithMethods.logout = () => {
      setUser(null);
      localStorage.removeItem('user');
    };
    return userWithMethods;
  }

  return null;
}

export default useUser;
