import { create } from 'zustand';

interface DrawerTemplateOpenState {
  open: boolean;
  setOpen: (open: boolean) => void;
  openDashboard: boolean;
  setOpenDashboard: (openDashboard: boolean) => void;
}

const useDrawerTemplateOpen = create<DrawerTemplateOpenState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  openDashboard: false,
  setOpenDashboard: (openDashboard) => set({ openDashboard }),
}));

export default useDrawerTemplateOpen;
