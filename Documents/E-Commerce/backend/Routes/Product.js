import express from 'express'
import { addProduct, deleteProductsById, getProducts, getProductsById, updateProductsById } from '../Controllers/Product.js'

const router = express.Router()

//add product
router.post('/add',addProduct)

//all product
router.get('/all',getProducts)

//get product by id
router.get('/:id',getProductsById)

//update product by id
router.put('/:id',updateProductsById)

//delete product by id
router.delete('/:id',deleteProductsById)

export default router