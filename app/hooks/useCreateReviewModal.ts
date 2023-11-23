import { create } from 'zustand';

interface CreateReviewStore {
  isOpen: boolean;
  availableId: any;
  userId: any;
  bookingId: any;
  onOpen: (availableId: any, userId: any, bookingId: any) => void;
  onClose: () => void;
}

const useCreateReviewModal = create<CreateReviewStore>((set) => ({
  isOpen: false,
  availableId: null,
  userId: null,
  bookingId: null,
  onOpen: (availableId: any, userId: any, bookingId: any) =>
    set({ isOpen: true, availableId: availableId, userId: userId, bookingId: bookingId }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateReviewModal;
