import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setOtpSent: (sent: boolean) => void;
  logout: () => void;
  login: (phoneNumber: string, countryCode: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      otpSent: false,
      
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
      setOtpSent: (sent) => set({ otpSent: sent }),
      
      logout: () => set({ user: null, otpSent: false }),
      
      login: (phoneNumber, countryCode) => {
        const user: User = {
          id: Date.now().toString(),
          phoneNumber,
          countryCode,
          isAuthenticated: true,
        };
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);