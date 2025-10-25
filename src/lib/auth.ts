import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  adminLogin: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAdmin: false,
      login: () => set({ isAuthenticated: true, isAdmin: false }),
      logout: () => set({ isAuthenticated: false, isAdmin: false }),
      adminLogin: () => set({ isAuthenticated: true, isAdmin: true }),
    }),
    {
      name: 'auth-storage',
    }
  )
);