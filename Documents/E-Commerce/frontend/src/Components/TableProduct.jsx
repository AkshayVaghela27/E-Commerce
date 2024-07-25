import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const TableProduct = ({ cart }) => {
  const { decreaseQty, addToCart, removeFromCart, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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
      <table className="table-auto w-full border-collapse border border-gray-800">
        <thead>
          <tr>
            <th className="border border-gray-600 bg-gray-900 text-white px-4 py-2">Product Img</th>
            <th className="border border-gray-600 bg-gray-900 text-white px-4 py-2">Title</th>
            <th className="border border-gray-600 bg-gray-900 text-white px-4 py-2">Price</th>
            <th className="border border-gray-600 bg-gray-900 text-white px-4 py-2">Qty</th>
            <th className="border border-gray-600 bg-gray-900 text-white px-4 py-2">Qty++</th>
            <th className="border border-gray-600 bg-gray-900 text-white px-4 py-2">Qty--</th>
            <th className="border border-gray-600 bg-gray-900 text-white px-4 py-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2">
                <img src={product.imgSrc} alt={product.title} className="w-12 h-12" />
              </td>
              <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2">{product.title}</td>
              <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2">{product.price}</td>
              <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2">{product.qty}</td>
              <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2">
                <span
                  className="material-symbols-outlined cursor-pointer"
                  onClick={() => addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )}
                >
                  add_circle
                </span>
              </td>
              <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2">
                <span
                  className="material-symbols-outlined cursor-pointer"
                  onClick={() => decreaseQty(product?.productId, 1)}
                >
                  do_not_disturb_on
                </span>
              </td>
              <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2">
                <span
                  className="material-symbols-outlined cursor-pointer"
                  onClick={() => {
                    if (window.confirm("Are you sure, want remove from cart")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                >
                  delete
                </span>
              </td>
            </tr>
          ))}

          <tr>
            <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2" colSpan="2">
              <button className="btn btn-primary font-bold bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Total
              </button>
            </td>
            <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2">
              <button className="btn btn-warning font-bold bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded">
                {price}
              </button>
            </td>
            <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2">
              <button className="btn btn-info font-bold bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded">
                {qty}
              </button>
            </td>
            <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2"></td>
            <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2"></td>
            <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2"></td>
          </tr>

          {cart?.shippingAddress && (
            <tr>
              <td className="border border-gray-600 bg-gray-800 text-white px-4 py-2" colSpan="7">
                <div>
                  <h3 className="font-bold">Shipping Address</h3>
                  <p>{cart.shippingAddress.name}</p>
                  <p>{cart.shippingAddress.address}</p>
                  <p>{cart.shippingAddress.city}, {cart.shippingAddress.zip}</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableProduct;
