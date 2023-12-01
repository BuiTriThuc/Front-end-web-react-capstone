import { create } from 'zustand';

interface CreatePublicTimeModalStore {
  isOpen: boolean;
  detailCoOwner: any;
  isCreated: boolean;
  onCreated: () => void;
  onCreatedReset: () => void;
  onOpen: (detailCoOwner: any) => void;
  onClose: () => void;
}

const useCreatePublicTimeModal = create<CreatePublicTimeModalStore>((set) => ({
  isOpen: false,
  detailCoOwner: null,
  isCreated: false,
  onCreated: () => set({ isCreated: true }),
  onCreatedReset: () => set({ isCreated: false}),
  onOpen: (detailCoOwner: any) => set({ isOpen: true, detailCoOwner: detailCoOwner }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreatePublicTimeModal;
