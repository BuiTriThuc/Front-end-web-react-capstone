import { create } from 'zustand';

interface DeletePropertyTypeModalStore {
  isOpen: boolean;
  item: IPropertyType;
  onOpen: () => void;
  onClose: () => void;
  isSuccess: boolean;
}
interface IPropertyType {
  id: number;
  propertyTypeName: string;
  propertyTypeDescription: string;
  deleted: boolean;
}
const useDeletePropertyTypeModal = create<DeletePropertyTypeModalStore>((set) => ({
  isOpen: false,
  item: {
    id: 0,
    propertyTypeName: '',
    propertyTypeDescription: '',
    deleted: false,
  },
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isSuccess: false,
}));

export default useDeletePropertyTypeModal;
