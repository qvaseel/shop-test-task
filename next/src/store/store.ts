import { create } from "zustand";
import { User, Manufacturer, AuthStoreState, ManufacturerStoreState } from "@/types/types";

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  token: null,
  productsCounter: 100,
  setUser: (user: User | null) => set({ user }),
  setToken: (token: string | null) => set({ token }),
  logout: () => set({ user: null, token: null }),
  incrementCounter: () => set((state) => ({ productsCounter: state.productsCounter + 1 })),
  decrementCounter: () => set((state) => ({ productsCounter: state.productsCounter - 1 })),

}));


export const useManufacturesStore = create<ManufacturerStoreState>((set) => ({
  manufacturers: [],
  setManufacturers: (manufacturers) => set({ manufacturers }),
}));