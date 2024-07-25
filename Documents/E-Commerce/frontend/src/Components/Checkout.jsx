import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
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

  const handlePayment = async () => {
    try {
      const orderRepons = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      const { orderId, amount: orderAmount } = orderRepons.data;

      var options = {
        key: "rzp_test_m8mkcKrmzK0IXv", 
        amount: orderAmount * 100, 
        currency: "INR",
        name: "Web Dev Mastery",
        description: "Web Dev Mastery",

        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData
          );

          if (api.data.success) {
            clearCart();
            navigate("/oderconfirmation");
          }
        }
        // },
        // prefill: {
        //   name: "Web Dev Mastery",
        //   email: "webdevmastery@gmail.com",
        //   contact: "9000090000",
        // },
        // notes: {
        //   address: "Vijay Nagar Indore",
        // },
        // theme: {
        //   color: "#3399cc",
        // },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto my-6 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-yellow-500 mb-6">Order Summary</h1>

        <div className="overflow-x-auto">
          <table className="w-full bg-gray-900 rounded-md overflow-hidden">
            <thead>
              <tr>
                <th className="py-4 px-6 text-left text-white font-medium bg-gray-700">Product Details</th>
                <th className="py-4 px-6 text-left text-white font-medium bg-gray-700">Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-6 text-white">
                  <TableProduct cart={cart} />
                </td>
                <td className="py-4 px-6 text-white">
                  <ul className="font-bold space-y-2">
                    <li>Name: {userAddress?.fullName}</li>
                    <li>Phone: {userAddress?.phoneNumber}</li>
                    <li>Country: {userAddress?.country}</li>
                    <li>State: {userAddress?.state}</li>
                    <li>PinCode: {userAddress?.pincode}</li>
                    <li>Near By: {userAddress?.address}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="container mx-auto text-center my-6">
        <button
          className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onClick={handlePayment}
        >
          Proceed To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
