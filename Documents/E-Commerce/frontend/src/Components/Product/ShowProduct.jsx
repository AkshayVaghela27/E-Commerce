import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'
const ShowProduct = () => {
  const { products, filterData, addToCart } = useContext(AppContext)

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filterData?.map((product) => (
          <div key={product._id} className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-auto">

            <Link to={`/product/${product._id}`}>
              <img className="p-4 rounded-t-lg w-full h-48 object-contain" src={product.imgSrc} alt="product image" />
            </Link>
            <div className="px-5 pb-5">

              <h5 className="text-xl font-semibold tracking-tight text-center text-gray-900 dark:text-white">{product.title}</h5>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{"₹"} {product.price}</span>
                <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => addToCart(product._Id, product.title, product.price, 1, product.imgSrc)}
                >
                  Add to Cart</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowProduct
