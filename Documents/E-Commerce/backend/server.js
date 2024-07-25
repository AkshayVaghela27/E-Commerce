import express from "express"
import mongoose from "mongoose"
import bodyParser from "express"
import cors from 'cors'
import userRouter from './Routes/User.js'
import productRouter from './Routes/Product.js'
import cartRouter from './Routes/Cart.js'
import addressRouter from './Routes/Address.js'
import paymentRouter from './Routes/Payment.js'


const app = express();

app.use(bodyParser.json())

app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

//home testing
app.get('/',(req,res)=>res.json({message:"This is home route"}))

//user router
app.use('/api/user', userRouter)

//product router
app.use('/api/product',productRouter)

//cart router
app.use('/api/cart',cartRouter)

//address router
app.use('/api/address',addressRouter)

//payment router
app.use('/api/payment',paymentRouter)

mongoose.connect("mongodb+srv://avivaghela132:1cjAxsUhua7M4DEO@cluster0.u2txi6f.mongodb.net/",
    {
        dbName:"MERN_E_COMMERCE"
    }
).then(()=> {
    console.log("Mongodb connected successfully")
}).catch(err => {
    console.log(err);
})

const port = 8088;

app.listen(port,()=> {
    console.log(`server is running on port ${port}`);
})