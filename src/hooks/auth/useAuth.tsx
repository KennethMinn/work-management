import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
  username: string;
  accessToken: string;
  role: string;
};

type AuthStore = {
  auth: User | null;
  setAuth: (user: User | null) => void;
};

export const useAuth = create(
  persist<AuthStore>(
    (set) => ({
      auth: null,
      setAuth: (user) => set({ auth: user }),
    }),
    { name: "user-auth", storage: createJSONStorage(() => localStorage) }
  )
);
