import { create } from "zustand";
import { StoreState } from "./interfaces";

export const useStore = create<StoreState>((set) => ({
  selectedCollection: undefined,
  setSelectedCollection: (selectedCollection) =>
    set(() => ({ selectedCollection: selectedCollection })),
}));
