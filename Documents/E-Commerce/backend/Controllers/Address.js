import { Address } from "../Models/Address.js";

export const addaddress = async (req, res) => {
    let { fullName, address, city, state, country, pincode, phoneNumber } = req.body;
    let userId = req.user;

        let useraddress = await Address.create({
            userId,
            fullName,
            address,
            city,
            state,
            country,
            pincode,
            phoneNumber
        });
        res.json({ message: "Address added", useraddress,success:true });
};

//get address
export const getAddress = async (req,res) => {
    let address = await Address.find({userId:req.user}).sort({createdAt:-1})
    res.json({message:"address",useraddress:address[0]})
}


