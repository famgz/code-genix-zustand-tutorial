import { Store } from '@/types/store';
import { StateCreator } from 'zustand';

type UserState = {
  userName: string;
  fullName: string;
  age: number;
  address: string;
};

type UserActions = {
  setAddress: (address: string) => void;
  fetchUser: () => Promise<void>;
};

export type UserSlice = UserState & UserActions;

const initialState: UserState = {
  address: '',
  age: 0,
  fullName: '',
  userName: '',
};

export const createUserSlice: StateCreator<
  Store,
  [['zustand/immer', never]],
  [],
  UserSlice
> = (set) => ({
  ...initialState,
  setAddress: (address) =>
    set((state) => {
      state.address = address;
    }),
  fetchUser: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      address: '',
      fullName: 'John Doe',
      userName: 'jodo@test.com',
      age: 32,
    });
  },
});
