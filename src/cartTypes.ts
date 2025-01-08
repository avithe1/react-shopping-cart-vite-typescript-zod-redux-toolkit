import {
  ProductSchema,
  ProductsResponseSchema,
} from "./schemas";
import { z } from "zod";

export type Product = z.infer<typeof ProductSchema>;
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;

export type CartItem = Omit<Product, "quantity"> & { quantity: number };

export interface CartState {
  products: CartItem[];
  status: "idle" | "loading";
}
