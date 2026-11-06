import { create } from "zustand";
import { Shade, SHADES, DEFAULT_SHADE } from "./shades";

export interface BagItem {
  shade: Shade;
  quantity: number;
}

interface VernisState {
  activeShade: Shade;
  mode: "browse" | "tryon";
  bag: BagItem[];
  isBagOpen: boolean;
  lastAddedTimestamp: number | null;
  
  // Actions
  setActiveShade: (shade: Shade) => void;
  setMode: (mode: "browse" | "tryon") => void;
  toggleMode: () => void;
  openBag: () => void;
  closeBag: () => void;
  toggleBag: () => void;
  addToBag: (shade: Shade, quantity?: number) => void;
  updateQuantity: (shadeId: string, delta: number) => void;
  removeFromBag: (shadeId: string) => void;
  
  // Selectors
  totalCount: () => number;
  subtotal: () => number;
}

export const useVernisStore = create<VernisState>((set, get) => ({
  activeShade: DEFAULT_SHADE,
  mode: "browse",
  bag: [],
  isBagOpen: false,
  lastAddedTimestamp: null,

  setActiveShade: (shade) => {
    set({ activeShade: shade });
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--shade", shade.hex);
      root.style.setProperty("--shade-deep", shade.hexDeep);
      root.style.setProperty("--shade-soft", shade.hexSoft);
    }
  },

  setMode: (mode) => set({ mode }),

  toggleMode: () => set((state) => ({ mode: state.mode === "browse" ? "tryon" : "browse" })),

  openBag: () => set({ isBagOpen: true }),
  closeBag: () => set({ isBagOpen: false }),
  toggleBag: () => set((state) => ({ isBagOpen: !state.isBagOpen })),

  addToBag: (shade, quantity = 1) => {
    set((state) => {
      const existingIndex = state.bag.findIndex((item) => item.shade.id === shade.id);
      let newBag: BagItem[];
      if (existingIndex > -1) {
        newBag = state.bag.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newBag = [...state.bag, { shade, quantity }];
      }
      return {
        bag: newBag,
        lastAddedTimestamp: Date.now(),
      };
    });
  },

  updateQuantity: (shadeId, delta) => {
    set((state) => {
      const newBag = state.bag
        .map((item) => {
          if (item.shade.id === shadeId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is BagItem => item !== null);
      return { bag: newBag };
    });
  },

  removeFromBag: (shadeId) => {
    set((state) => ({
      bag: state.bag.filter((item) => item.shade.id !== shadeId),
    }));
  },

  totalCount: () => {
    return get().bag.reduce((sum, item) => sum + item.quantity, 0);
  },

  subtotal: () => {
    return get().bag.reduce((sum, item) => sum + item.shade.price * item.quantity, 0);
  },
}));

