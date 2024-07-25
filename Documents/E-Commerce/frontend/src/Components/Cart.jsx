import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <>
      {cart?.items?.length === 0 ? (
        <div className="text-center my-5">
          <button
            className="bg-yellow-500 text-white px-4 py-2 mx-3 rounded-lg font-bold text-lg"
            onClick={() => navigate("/")}
          >
            Continue Shopping...
          </button>
        </div>
      ) : (
        <div className="my-5 text-center">
          <button className="bg-blue-500 text-white px-4 py-2 mx-3 rounded-lg font-bold text-lg">
            Total Qty: {qty}
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 mx-3 rounded-lg font-bold text-lg">
            Total Price: {price}
          </button>
        </div>
      )}

      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container p-3 bg-gray-800 my-5 text-center rounded-lg"
        >
          <div className="flex justify-around items-center">
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt=""
                className="w-24 h-24 rounded-lg"
              />
            </div>
            <div className="cart_des text-white">
              <h2 className="text-xl font-bold">{product.title}</h2>
              <h4 className="text-lg">{product.price}</h4>
              <h4 className="text-lg">Qty: {product.qty}</h4>
            </div>
            <div className="cart_action">
              <button
                className="bg-yellow-500 text-white px-4 py-2 mx-3 rounded-lg font-bold"
                onClick={() => decreaseQty(product?.productId, 1)}
              >
                Qty--
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 mx-3 rounded-lg font-bold"
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )
                }
              >
                Qty++
              </button>
              <button
                className="bg-red-500 text-   white px-4 py-2 mx-3 rounded-lg font-bold"
                onClick={() => {
                  if (window.confirm("Are you sure you want to remove this item from the cart?")) {
                    removeFromCart(product?.productId);
                  }
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="container text-center my-3">
          <button
            className="bg-yellow-500 text-white px-4 py-2 mx-3 rounded-lg font-bold"
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 mx-3 rounded-lg font-bold"
            onClick={() => {
              if (window.confirm("Are you sure you want to clear the cart?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
