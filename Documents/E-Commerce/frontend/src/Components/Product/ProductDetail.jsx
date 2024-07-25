import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import RelatedProduct from './RelatedProduct'

const ProductDetail = () => {
  const { id } = useParams()
  const url = "http://localhost:8088/api"
  const [product, setProduct] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      setProduct(api.data.product)
    }

    fetchProduct()
  }, [id])

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto my-5 flex justify-evenly items-center text-center bg-gray-800 p-4 rounded-lg mb-2">
        <div className="left">
          <img
            src={product?.imgSrc}
            alt=""
            className="w-64 h-64 rounded-lg border-2 border-yellow-500"
          />
        </div>
        <div className="right">
          <h1 className="text-2xl font-bold">{product?.title}</h1>
          <p className="text-lg my-4">{product?.description}</p>
          <h1 className="text-xl font-bold">
            {"₹"} {product?.price}
          </h1>
          <div className="my-5">
            <button className="btn bg-red-600 hover:bg-red-700 text-white mx-3 font-bold py-2 px-4 rounded">
              Buy Now
            </button>
            <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <RelatedProduct category={product?.category} className="mt-2" />
    </div>
  )
}

export default ProductDetail
