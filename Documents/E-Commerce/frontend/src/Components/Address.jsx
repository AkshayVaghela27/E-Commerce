import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-yellow-500 mb-6">Shipping Address</h1>
      <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-white font-medium mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={onChangeHandler}
              type="text"
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              id="fullName"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-white font-medium mb-1">
              Country
            </label>
            <input
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              type="text"
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              id="country"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-white font-medium mb-1">
              State
            </label>
            <input
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              type="text"
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              id="state"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="city" className="block text-white font-medium mb-1">
              City
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              type="text"
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              id="city"
            />
          </div>
          <div>
            <label htmlFor="pincode" className="block text-white font-medium mb-1">
              Pincode
            </label>
            <input
              name="pincode"
              value={formData.pincode}
              onChange={onChangeHandler}
              type="number"
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              id="pincode"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-white font-medium mb-1">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChangeHandler}
              type="number"
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              id="phoneNumber"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-white font-medium mb-1">
            Address/Nearby
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={onChangeHandler}
            className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            id="address"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Address;
