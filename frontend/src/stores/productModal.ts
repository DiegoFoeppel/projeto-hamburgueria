// stores/productModal.ts
import { create } from "zustand";
import type { Product } from "../types/types";

type State = {
  // null = fechado; { } = criar; { product } = editar
  modal: { product?: Product } | null;
  openCreate: () => void;
  openEdit: (productId: Product) => void;
  close: () => void;
};

export const useProductModal = create<State>((set) => ({
  modal: null,
  openCreate: () => set({ modal: {} }),
  openEdit: (product) => set({ modal: { product } }),
  close: () => set({ modal: null }),
}));
