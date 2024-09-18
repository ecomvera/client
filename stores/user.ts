import { IAddress, IUser } from "@/types";
import { create } from "zustand";

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  token: {
    access: string | null;
    refresh: string | null;
  };
  setToken: (token: { access: string; refresh: string }) => void;
  addAddress: (address: IAddress) => void;
  updateAddress: (address: IAddress) => void;
  deleteAddress: (id: string) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  token: { access: null, refresh: null },
  setToken: (token) => set({ token }),
  addAddress: (address) =>
    set((state) => {
      if (!state.user) return { user: null };
      const updatedUser = { ...state.user, addresses: [...(state.user?.addresses || []), address] };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    }),
  updateAddress: (address) =>
    set((state) => {
      if (!state.user) return { user: null };
      const updatedUser = {
        ...state.user,
        addresses: state.user?.addresses?.map((a) => (a.id === address.id ? address : a)),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    }),
  deleteAddress: (id) =>
    set((state) => {
      if (!state.user) return { user: null };
      const updatedUser = {
        ...state.user,
        addresses: state.user?.addresses?.filter((a) => a.id !== id),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    }),
}));
