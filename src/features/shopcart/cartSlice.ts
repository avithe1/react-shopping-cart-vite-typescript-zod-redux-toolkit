import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  CartState,
  Product,
  CartItem,
} from "../../cartTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductsResponseSchema } from "../../schemas";

const initialState: CartState = {
  products: [],
  status: "idle",
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  //console.log("Fetching cart....");
  const response = await fetch(
    "https://fakestoreapi.in/api/products?page=2&limit=2"
  );
  const data = ProductsResponseSchema.parse(await response.json());
  return data.products;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (state.products.find((product) => product.id === action.payload.id)) {
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          } else {
            return product;
          }
        });
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    emptyCart: (state) => {
      state.products = [];
    },
    updateItem: (state, action: PayloadAction<{id:number,quantity:number}>) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: action.payload.quantity,
          };
        } else {
          return product;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCart.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          let p: CartItem[] = [];
          action.payload.forEach((product) => {
            p.push({ ...product, quantity: product.quantity || 1 });
          });

          state.products = [...p];
          state.status = "idle";
        }
      )
      .addCase(fetchCart.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const { addToCart, removeFromCart, emptyCart, updateItem } =
  cartSlice.actions;
export default cartSlice.reducer;
