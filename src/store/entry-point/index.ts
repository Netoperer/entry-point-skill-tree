import { create } from "zustand";
import {
  createPersistentSlice,
  type PersistentSlice,
} from "./persistent-slice";
import { immer } from "zustand/middleware/immer";
import { createSelectionSlice, type SelectionSlice } from "./selection-slice";

type StoreState = PersistentSlice & SelectionSlice;

export const useEntryPointStore = create<StoreState>()(
  immer((...args) => ({
    ...createPersistentSlice(...args),
    ...createSelectionSlice(...args),
  })),
);
