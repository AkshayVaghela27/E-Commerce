import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const [realtedProduct, setRealtedProduct] = useState([]);
  
  useEffect(() => {
    setRealtedProduct(
      products.filter(
        (data) => data?.category?.toLowerCase() === category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <div className="container  bg-black mx-auto text-center py-10">
      <h1 className="text-3xl font-bold mb-6">Related Product</h1>
      <div className="flex flex-wrap justify-center items-center">
        {realtedProduct?.map((product) => (
          <div key={product._id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div className="bg-gray-8   00 text-white text-center rounded-lg shadow-lg p-5">
              <Link to={`/product/${product._id}`} className="flex justify-center p-3">
                <img
                  src={product.imgSrc}
                  alt="Product"
                  className="w-48 h-48 rounded-lg border-2 border-yellow-500"
                />
              </Link>
              <div className="mt-5">
                <h5 className="text-xl font-semibold mb-3">{product.title}</h5>
                <div className="flex justify-center items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {"₹"} {product.price}
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
