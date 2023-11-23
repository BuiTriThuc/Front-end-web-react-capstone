import { create } from 'zustand';

interface AparmentReviewModalStore {
  isOpen: boolean;
  rating: any;
  apartment: any;
  onOpen: (rating: any, apartment: any) => void;
  onClose: () => void;
}

const useAparmentReviewModal = create<AparmentReviewModalStore>((set) => ({
  isOpen: false,
  rating: null,
  apartment: null,
  onOpen: (rating: any, apartment: any) =>
    set({ isOpen: true, rating: rating, apartment: apartment }),
  onClose: () => set({ isOpen: false }),
}));

export default useAparmentReviewModal;
