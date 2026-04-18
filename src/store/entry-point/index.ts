import { create } from "zustand";
import {
  createPersistentSlice,
  type PersistentSlice,
} from "./persistent-slice";
import { immer } from "zustand/middleware/immer";

type StoreState = PersistentSlice;

export const useEntryPointStore = create<StoreState>()(
  immer((...args) => ({
    ...createPersistentSlice(...args),
  })),
);
