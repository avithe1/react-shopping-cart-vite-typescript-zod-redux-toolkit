import { useAppSelector, useAppDispatch } from "../hooks/cartHooks";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  emptyCart,
  updateItem,
} from "../features/shopcart/cartSlice";
import React, { useEffect, useState } from "react";
import { rootPath } from "../utils/constsants";

const Cart = () => {
  const { products, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalValue = products.reduce(
    (sum, product) => (product.quantity || 1) * product.price + sum,
    0
  );
  const [quantities, setQuantities] = useState<
    { id: number; quantity: number }[]
  >([]);

  useEffect(() => {
    if (products.length) {
      setQuantities(
        products.map((product) => {
          return { id: product.id, quantity: product.quantity || 1 };
        })
      );
    } else {
      setQuantities([]);
    }
  }, [products]);

  const handleQuantityChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = Number(e.target.value);
    setQuantities([
      ...quantities.filter((q) => q.id !== id),
      { id, quantity: newQuantity },
    ]);
  };

  const updateCartQuantity = (id: number) => {
    let p = { ...products.filter((product) => product.id === id)[0] };
    const newQuantity = quantities.filter((q) => q.id === id)[0].quantity;
    p.quantity = newQuantity;
    dispatch(updateItem(p));
  };

  return (
    <div className="wrapper">
      <div className="cart-page-container">
        <div className="cart-container">
          <div className="cart-header">
            <h2>Your cart</h2>
            <div>
              {products.length ? (
                <button onClick={() => dispatch(emptyCart())}>
                  Empty cart
                </button>
              ) : null}
            </div>
          </div>
          {products.length ? (
            products.map((product) => (
              <div key={product.id} className="cart-item">
                <img src={product.image} alt={product.title} />
                <div className="cart-item-details">
                  <h3>{product.title}</h3>
                  <p>Price : ${product.price}</p>
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={
                        quantities.length
                          ? quantities.filter((q) => q.id === product.id)[0]
                              .quantity
                          : 1
                      }
                      onChange={(e) => handleQuantityChange(product.id, e)}
                    />
                    <button onClick={() => updateCartQuantity(product.id)}>
                      Update
                    </button>
                    <button onClick={() => dispatch(removeFromCart(product))}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : status != "loading" ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
            </div>
          ) : null}

          {products.length ? (
            <div className="cart-total">
              <p>Total : ${totalValue.toFixed(2)}</p>
            </div>
          ) : null}

          <button className="back-button" onClick={() => navigate(rootPath)}>
            Back to shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
