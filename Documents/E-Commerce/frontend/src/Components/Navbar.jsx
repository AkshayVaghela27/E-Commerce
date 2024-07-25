import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(" ");
  const navigate = useNavigate();
  const location = useLocation();

  const { setfilterData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const filterbyCategory = (cat) => {
    setfilterData(products.filter((data) => data.category.toLowerCase() === cat.toLowerCase())
    );
  };

  const filterbyPrice = (price) => {
    setfilterData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm(" ");
  };

  return (
    <div className="bg-gray-800 text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to={"/"} className="text-white text-xl font-bold">
            Tech_World
          </Link>
          <form onSubmit={submitHandler} className="ml-4">
            <span className="material-symbols-outlined text-white mr-2">search</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none"
              placeholder="Search Products..."
            />
          </form>
        </div>
        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <Link
                to={"/cart"}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2 flex items-center"
              >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
</svg>

                {cart?.items?.length > 0 && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full ml-1">
                    {cart?.items?.length}
                  </span>
                )}
              </Link>
              <Link
                to={"/profile"}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
              >
                Profile
              </Link>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {location.pathname === "/" && (
        <div className="container mx-auto mt-2 flex justify-center">
          <div className="grid grid-cols-10 gap-4">
            <div className="cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-md text-white" onClick={() => setfilterData(products)}>No Filter</div>
            <div className="cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-md text-white" onClick={() => filterbyCategory("mobiles")}>Mobiles</div>
            <div className="cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-md text-white" onClick={() => filterbyCategory("laptops")}>Laptops</div>
            <div className="cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-md text-white" onClick={() => filterbyCategory("cameras")}>Cameras</div>
            <div className="cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-md text-white" onClick={() => filterbyCategory("headphones")}>Headphones</div>
            <div className="cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-md text-white" onClick={() => filterbyPrice(15999)}>15999</div>
            <div className="cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-md text-white" onClick={() => filterbyPrice(25999)}>25999</div>
            <div className="cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-md text-white" onClick={() => filterbyPrice(49999)}>49999</div>
            <div className="cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-md text-white" onClick={() => filterbyPrice(69999)}>69999</div>
            <div className="cursor-pointer hover:bg-gray-700 py-2 px-4 rounded-md text-white" onClick={() => filterbyPrice(89999)}>89999</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
