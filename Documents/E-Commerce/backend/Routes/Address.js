import express from 'express'
import { addaddress, getAddress } from '../Controllers/Address.js'
import { Authenticated } from '../Middlewares/Auth.js'

const router = express.Router()

//add address
router.post('/add',Authenticated,addaddress)

//get address
router.get('/get',Authenticated,getAddress)

export default router