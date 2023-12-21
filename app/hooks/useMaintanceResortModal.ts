import { create } from 'zustand';

interface MaintanceResortModalStore {
  isOpen: boolean;
  resortId: string;
  resortStatus: string;
  isSuccess: boolean;
  onSuccess: () => void;
  onSuccessReset: () => void;
  onOpen: (resortId: string, resortStatus: string) => void;
  onClose: () => void;
}

const useMaintanceResortModal = create<MaintanceResortModalStore>((set) => ({
  isOpen: false,
  resortId: '',
  resortStatus: '',
  isSuccess: false,
  onSuccess: () => set({ isSuccess: true }),
  onSuccessReset: () => set({ isSuccess: false }),
  onOpen: (resortId: string, resortStatus: string) =>
    set({ isOpen: true, resortId: resortId, resortStatus: resortStatus }),
  onClose: () => set({ isOpen: false }),
}));

export default useMaintanceResortModal;
