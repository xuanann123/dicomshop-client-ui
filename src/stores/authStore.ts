import { create } from 'zustand';
import type { User } from '../types/user';
import { storage } from '../utils/storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: storage.getUser<User>(),
  token: storage.getToken(),
  isAuthenticated: !!storage.getToken(),
  isLoading: false,

  login: (user, token) => {
    storage.setUser(user);
    storage.setToken(token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    storage.clear();
    set({ user: null, token: null, isAuthenticated: false });
  },

  setLoading: (isLoading) => set({ isLoading }),
}));
