// store/index.ts
import { create } from "zustand";
import { createTreeSlice, type TreeSlice } from "./entry-point/tree-slice";

type StoreState = TreeSlice; // & OtherSlice if you add more later

export const useStore = create<StoreState>()((...args) => ({
  ...createTreeSlice(args[0]),
}));
