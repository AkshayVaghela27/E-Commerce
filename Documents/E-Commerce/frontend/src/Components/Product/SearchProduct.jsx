import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const [searchProduct, setSearchProduct] = useState([]);
  const { term } = useParams();

  useEffect(() => {
    setSearchProduct(
      products.filter((data) =>
        data.title.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [term, products]);

  return (
    <div className="bg-black min-h-screen">
    <div className="container mx-auto my-5 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {searchProduct.map((product) => (
          <div key={product._id} className="flex justify-center items-center">
            <div className="bg-gray-800 text-white text-center rounded-lg shadow-lg p-6 w-72">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.imgSrc}
                  className="w-full h-48 object-contain rounded-lg border-2 border-yellow-500 mx-auto mb-4"
                  alt={product.title}
                />
              </Link>
              <h5 className="text-xl font-bold mb-2">{product.title}</h5>
              <div className="mb-4">
                <span className="text-gray-600">₹ {product.price}</span>
              </div>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SearchProduct;
