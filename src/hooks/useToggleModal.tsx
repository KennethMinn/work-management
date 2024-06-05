import { create } from "zustand";

type TToggleModal = {
  open: boolean;
  setOpen: (boolean: boolean) => void;
};

export const useToggleModal = create<TToggleModal>()((set) => ({
  open: false,
  setOpen: (boolean) => set({ open: boolean }),
}));
