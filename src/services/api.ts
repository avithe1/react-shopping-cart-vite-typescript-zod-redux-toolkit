import { ZodError } from "zod";
import { ProductsResponseSchema } from "../schemas";
import { Product, ProductsResponse } from "../cartTypes";

export const getProductList = async (
  page: number = 1
): Promise<{ products: Product[] } | undefined> => {
  const response = await fetch(
    "https://fakestoreapi.in/api/products?page=" + page
  );
  try {
    const data: ProductsResponse = ProductsResponseSchema.parse(
      await response.json()
    );
    return {
      products: data.products,
    };
  } catch (error) {
    if (error instanceof ZodError) {
    } else {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unknown error");
      }
    }
  }
};
