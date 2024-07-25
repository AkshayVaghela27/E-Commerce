import express from 'express'
import { addToCart, clearCart, decreaseProudctQty, removeProductFromCart, userCart } from '../Controllers/Cart.js'
import { Authenticated } from '../Middlewares/Auth.js'

const router = express.Router()

//add to cart
router.post('/add',Authenticated,addToCart)

//get user cart
router.get('/user',Authenticated,userCart)

//remove product from cart
router.delete('/remove/:productId',Authenticated,removeProductFromCart)

//clear cart
router.delete('/clear',Authenticated,clearCart)

//decreased item qty
router.post('/--qty',Authenticated,decreaseProudctQty)


export default router