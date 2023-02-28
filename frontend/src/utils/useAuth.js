import { useState, useEffect } from 'react';
import { verifyToken } from '@/services/jwt';

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      try {
        verifyToken(token);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('jwtToken', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
}
