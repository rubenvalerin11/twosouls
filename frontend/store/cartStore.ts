"use client";

import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    const items = get().items;
    const exists = items.find((i) => i.id === item.id);

    if (exists) {
      return set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    }

    set({
      items: [...items, { ...item, quantity: 1 }],
    });
  },

  removeItem: (id) =>
    set({
      items: get().items.filter((i) => i.id !== id),
    }),

  clearCart: () => set({ items: [] }),
}));
