import {Products} from '../Models/Product.js'

//add product
export const addProduct = async (req,res) => {
    const {title,description,price,category,qty,imgSrc} = req.body
    try{
        let product = await Products.create({
            title,
            description,
            price,
            category,
            qty,
            imgSrc,
        });
        res.json({message:"Product added successfully",product})
    }catch(err)
    {
        res.json(err.message)
    }
}

//get products

export const getProducts = async (req,res) => {
    let products = await Products.find().sort({createdAt:-1})
    res.json({message:"all products",products})
}

// find product by id
export const getProductsById = async (req,res) => {
    const id = req.params.id;
    let product = await Products.findById(id)
    if(!product) return res.json({message:"invalid id"})
    res.json({message:"specific products",product})
}

//update product by id
export const updateProductsById = async (req,res) => {
    const id = req.params.id;
    let product = await Products.findByIdAndUpdate(id,req.body,{new:true})
    if(!product) return res.json({message:"invalid id"})
    res.json({message:"product has been updated",product})
}

//delete product by id
export const deleteProductsById = async (req,res) => {
    const id = req.params.id;
    let product = await Products.findByIdAndDelete(id)
    if(!product) return res.json({message:"invalid id"})
    res.json({message:"product has been deleted",product})
}
