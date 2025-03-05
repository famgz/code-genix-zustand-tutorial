import { createCartSlice } from '@/store/cart-slice';
import { createUserSlice } from '@/store/user-slice';
import { Store } from '@/types/store';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useStore = create<Store>()(
  immer((...x) => ({
    ...createUserSlice(...x),
    ...createCartSlice(...x),
  }))
);
