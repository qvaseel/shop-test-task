import axios from 'axios';
import { useAuthStore } from '@/store/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();
  const { user, token, setUser, setToken, logout } = useAuthStore();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken && !token) {
      setToken(savedToken);
      axios.get("http://localhost:3002/me", {
        headers: { Authorization: `Bearer ${savedToken}` }
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem('token');
        logout();
      });
    }
  }, [setUser, setToken, token, logout]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/')
    logout();
  };

  return { user, token, handleLogout };
};

export default useAuth;
