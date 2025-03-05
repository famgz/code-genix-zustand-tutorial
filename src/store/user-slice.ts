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
});
