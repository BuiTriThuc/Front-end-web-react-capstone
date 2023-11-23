import { create } from 'zustand';

interface CreateReviewStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateReviewModal = create<CreateReviewStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateReviewModal;
