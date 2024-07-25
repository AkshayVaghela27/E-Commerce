import express from "express"
import { login, profile, register, users } from "../Controllers/User.js";
import { Authenticated } from "../Middlewares/Auth.js";

const router = express.Router();

// Register user
router.post('/register',register)


// Login user
router.post('/login',login)

//get all user router
router.get('/all',users)

//get userprofile
router.get('/profile',Authenticated,profile)

export default router