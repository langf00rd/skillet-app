import { create } from "zustand";
import { StoreState } from "./interfaces";
/**
 * Zustand state store with global variables, and mutator functions
 */
export const useStore = create<StoreState>((set) => ({
  selectedCollection: undefined,
  setSelectedCollection: (selectedCollection) =>
    set(() => ({ selectedCollection: selectedCollection })),
}));
