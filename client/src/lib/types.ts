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

export const shippingFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  address: z.string().min(5, "Please enter your address"),
  city: z.string().min(2, "Please enter your city"),
  postcode: z.string().min(5, "Please enter your postcode"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;
