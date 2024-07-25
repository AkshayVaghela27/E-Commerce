import { User } from "../Models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// user register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) return res.json({ message: "User already exists", success: false })

        const hashpass = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashpass });
        res.json({ message: "User register successfully .. !", user ,success: true })
    } catch (err) {
        res.json({ message: err.message })
    }
}

// user login
export const login = async (req,res) => {
    const {email,password} = req.body
    try{
        let user = await User.findOne({email});
        if(!user) res.json({message:"User Not Found",success:false});
        const validpassword = await bcrypt.compare(password,user.password);
        if(!validpassword) return res.json({message:"Invalid password",success:false})

        const token = jwt.sign({userId:user._id},"!@#$%^&*()",{expiresIn:'365d'})
        
        res.json({message:`Welcome ${user.name}`,token,success:true})
    }catch(err){
        res.json({message:err.message})
    }
}

// get all users
export const users = async (req,res) => {
    try{
        let users = await User.find().sort({createdAt:-1})
        res.json(users)
    }catch(err)
    {
        res.json(err.message)
    }
}

//get profile
export const profile = async (req,res)=>{
    res.json({user:req.user})
}