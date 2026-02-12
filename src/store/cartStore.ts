import { create } from "zustand";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,

  addItem: (item: CartItem) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        // Si ya existe, solo aumenta cantidad
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      } else {
        // Si no existe, lo agrega
        return {
          items: [...state.items, item],
        };
      }
    });

    // Recalcula total
    set({ total: get().getTotal() });
  },

  removeItem: (id: number) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
    set({ total: get().getTotal() });
  },

  updateQuantity: (id: number, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      ),
    }));
    set({ total: get().getTotal() });
  },

  clearCart: () => {
    set({ items: [], total: 0 });
  },

  getTotal: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));
