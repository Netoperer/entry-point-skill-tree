import { create } from "zustand";
import {
  createPersistentSlice,
  type PersistentSlice,
} from "./persistent-slice";
import { immer } from "zustand/middleware/immer";
import { createSelectionSlice, type SelectionSlice } from "./selection-slice";
// import { createShareSlice, type ShareSlice } from "./share-slice";

export type StoreState = PersistentSlice & SelectionSlice; //& ShareSlice;

export const useFreelancersCutStore = create<StoreState>()(
  immer((...args) => ({
    ...createPersistentSlice(...args),
    ...createSelectionSlice(...args),
    // ...createShareSlice(...args),
  })),
);

