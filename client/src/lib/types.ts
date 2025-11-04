import { z } from "zod";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  categories: string[];
  flowerTypes: string[];
  description: string;
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isSale: boolean;
  isTrending: boolean;
  isPopular: boolean;
  isRecommended: boolean;
};

export type Category = {
  id: number;
  name: string;
  image: string;
  description: string;
};

export type CartItemType = {
  product: Product;
  quantity: number;
};

export const shippingFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  address: z.string().min(5, "Please enter your address"),
  city: z.string().min(2, "Please enter your city"),
  postcode: z.string().min(5, "Please enter your postcode"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
  cardHolderName: z.string().min(2, "Please enter your card holder name"),
  cardNumber: z.string().regex(/^\d{16}$/, "Please enter a valid card number"),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, "Please enter a valid card expiry date"),
  cardCvv: z.string().regex(/^\d{3}$/, "Please enter a valid card CVV"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemType[];
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};