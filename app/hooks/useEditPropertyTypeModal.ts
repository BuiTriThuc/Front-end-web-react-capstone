import { create } from 'zustand';

interface EditPropertyTypeModalStore {
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
const useEditPropertyTypeModal = create<EditPropertyTypeModalStore>((set) => ({
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

export default useEditPropertyTypeModal;
