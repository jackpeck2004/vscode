import { useEffect, useState } from 'react';
import type { User } from 'lib/types';
import jwtDecode from 'jwt-decode';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = window.localStorage.getItem('AuthToken');
      if (authToken) {
        const decodedUser: any = jwtDecode(authToken);
        setUser({
          name: decodedUser.name,
          picture: decodedUser.picture,
          email: decodedUser.email,
          hd: decodedUser.hd,
          id: decodedUser.sub,
        });
      }
    }
  }, []);

  return user;
};
