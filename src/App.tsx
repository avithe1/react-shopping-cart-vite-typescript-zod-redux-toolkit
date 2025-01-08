import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "./hooks/cartHooks";
import { useEffect } from "react";
import { fetchCart } from "./features/shopcart/cartSlice";
import { rootPath } from "./utils/constsants";

const queryClient = new QueryClient();

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={rootPath}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
