import { create } from "zustand";

interface IActionStore {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (openSidebar: boolean) => void;
  showLoadingScreen: boolean;
  setShowLoadingScreen: (showLoadingScreen: boolean) => void;
}

export const useAction = create<IActionStore>((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (openSidebar) => set({ isSidebarOpen: openSidebar }),
  showLoadingScreen: false,
  setShowLoadingScreen: (showLoadingScreen) => set({ showLoadingScreen }),
}));
