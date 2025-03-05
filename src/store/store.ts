import { createCartSlice } from '@/store/cart-slice';
import { createUserSlice } from '@/store/user-slice';
import { Store } from '@/types/store';
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useStore = create<Store>()(
  devtools(
    subscribeWithSelector(
      persist(
        immer((...x) => ({
          ...createUserSlice(...x),
          ...createCartSlice(...x),
        })),
        { name: 'zustand-exercise' }
      )
    )
  )
);
