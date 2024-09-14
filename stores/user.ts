import { IUser } from "@/types";
import { create } from "zustand";

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  token: {
    access: string | null;
    refresh: string | null;
  };
  setToken: (token: { access: string; refresh: string }) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  token: { access: null, refresh: null },
  setToken: (token) => set({ token }),
}));
