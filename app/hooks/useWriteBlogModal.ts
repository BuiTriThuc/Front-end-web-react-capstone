import { create } from 'zustand';

interface AparmentReviewModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useWriteBlogModal = create<AparmentReviewModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useWriteBlogModal;
