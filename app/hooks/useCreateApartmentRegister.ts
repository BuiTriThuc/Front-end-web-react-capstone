import { create } from 'zustand';

interface CreateAparmentRegisterStore {
  user: any;
  onSetUser: (user: any) => void;
}

const useCreateApartmentRegister = create<CreateAparmentRegisterStore>((set) => ({
  user: null,
  onSetUser: (user: any) => set({ user: user }),
}));

export default useCreateApartmentRegister;
