import { create } from 'zustand';

interface EditPropertyTypeModalStore {
  isOpen: boolean;
  id?: number;
  onOpen: () => void;
  onClose: () => void;
  callBack?: () => void;
}

const useEditPropertyTypeModal = create<EditPropertyTypeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditPropertyTypeModal;
