import { useEffect, useState } from "react";
import { getProductList } from "../services/api";
import Navbar from "./Navbar";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../hooks/cartHooks";
import { addToCart } from "../features/shopcart/cartSlice";

const ProductList = () => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProductList(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <Navbar />

      {data && data.products ? (
        <main>
          <div className="product-list-wrapper">
            <div className="product-list">
              {data.products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.title} />
                  <h2>
                    {product.title.length > 20
                      ? `${product.title.slice(0, 20)}...`
                      : product.title}
                  </h2>
                  <p>Price : ${product.price.toFixed(2)}</p>
                  <button onClick={() => dispatch(addToCart(product))}>
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() =>
                  setPage((prev) => (prev - 1 > 0 ? prev - 1 : prev))
                }
              >
                Prev
              </button>
              <button
                disabled={page === 3}
                onClick={() =>
                  setPage((prev) => (prev + 1 < 4 ? prev + 1 : prev))
                }
              >
                Next
              </button>
            </div>
          </div>
        </main>
      ) : isLoading ? (
        <p>Fetching products...</p>
      ) : isError ? (
        <p>Failed to fetch products</p>
      ) : (
        <p>No products available</p>
      )}
    </>
  );
};

export default ProductList;
