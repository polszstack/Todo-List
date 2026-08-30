// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export function useAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      // Check if user is authenticated by fetching current user
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<User> => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
    }

    const data = await res.json() as AuthResponse;
    if (data.user) {
      setUser(data.user);
      return data.user;
    }
    throw new Error('Login failed');
  };

  const register = async (data: RegisterData): Promise<void> => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
    }
  };

  const logout = async (): Promise<void> => {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
  };

  useEffect(() => {
    void (async () => {
      await checkAuth();
    })();
  }, []);

  return {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
  };
}
