import { create } from 'zustand';

interface NewDateRangeStore {
  isNew: boolean;
  isReload: boolean;
  isBack: boolean;
  setBack: () => void;
  setBackReset: () => void;
  setIsReload: () => void;
  setIsReloadReset: () => void;
  setNew: () => void;
  setNewReset: () => void;
}

const useNewDateRange = create<NewDateRangeStore>((set) => ({
  isNew: false,
  isReload: false,
  isBack: false,
  setIsReload: () => set({ isReload: true }),
  setBack: () => set({ isBack: true }),
  setBackReset: () => set({ isBack: false }),
  setIsReloadReset: () => set({ isReload: false }),
  setNew: () => set({ isNew: true }),
  setNewReset: () => set({ isNew: false }),
}));

export default useNewDateRange;
