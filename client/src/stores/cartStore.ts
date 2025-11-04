import { create } from "zustand";
import { CartStoreStateType, CartStoreActionsType } from "@/lib/types";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.product.id === item.product.id
          );

          if (existingItem) {
            // Update quantity if item already exists
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.product.id === item.product.id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              ),
            };
          } else {
            // Add new item if it doesn't exist
            return { cart: [...state.cart, item] };
          }
        }),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.product.id !== product.product.id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export default useCartStore;
