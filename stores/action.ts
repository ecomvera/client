import { create } from "zustand";

interface IActionStore {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (openSidebar: boolean) => void;
}

export const useAction = create<IActionStore>((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (openSidebar) => set({ isSidebarOpen: openSidebar }),
}));
