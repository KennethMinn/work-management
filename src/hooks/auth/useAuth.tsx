import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  id: number;
  name: string;
  gender: string | null;
  email: string;
  photo_path: string;
  phone: string | null;
  nrc_number: string | null;
  role: string;
  company_id: string | null;
  department_id: string | null;
  position_id: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string | null;
  imgURL: string;
};

type AuthStore = {
  user: User | null;
  setAuth: (user: User | null) => void;
};

export const useAuth = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
    }),
    { name: "user-auth", storage: createJSONStorage(() => localStorage) }
  )
);
