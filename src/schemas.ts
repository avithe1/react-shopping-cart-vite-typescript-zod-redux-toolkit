import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string().url(),
  price: z.number(),
  description: z.string(),
  brand: z.string(),
  model: z.string(),
  color: z.string().optional(),
  category: z.string(),
  discount: z.number().optional(),
  quantity: z.number().positive().optional(),
});

export const ProductsResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  products: z.array(ProductSchema),
});

export const ProductArraySchema = z.array(ProductSchema);
