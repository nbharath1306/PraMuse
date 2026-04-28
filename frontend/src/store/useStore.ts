import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  trustScore: number;
};

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, name = "New User") => 
        set({ 
          user: { 
            id: Math.random().toString(36).substr(2, 9), 
            name, 
            email, 
            avatar: `https://i.pravatar.cc/150?u=${email}`,
            trustScore: 5.0
          }, 
          isAuthenticated: true 
        }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'pramuse-storage',
    }
  )
);
