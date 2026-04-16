const bcrypt = require("bcrypt")
const User= require("../models/User");
const jwt=require("jsonwebtoken")
require("dotenv").config();

// sign up route handler
exports.signup=async(req,res)=>{
    try{
    //get data
       const {name,email,password,role}= req.body;

    //check user if already exist
       const existingUser = await User.findOne({email});

       if(existingUser){
        return res.status(400).json({
            success:false,
            message:'User already exist'
        })
       }
    // secure password
    let hashedPassword;
    try{
        hashedPassword=await bcrypt.hash(password,10);
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error in hashing password'
        })
    }

    const user =await User.create({
        name,email,password:hashedPassword,role
    })
    return res.status(200).json({
        success: true,
        message: 'User created successfully',
        data: user
    });
}
catch(error){
    console.error(error);
    return res.status(500).json({
        success:false,
        message:'User cannot be register, please try again',
    })
}
}


// login route handler
exports.login=async (req,res)=>{
    try{

        // data fetch
        const {email, password} = req.body;
        // validation on email & password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please fill all tha details carefully'
            })
        }

        // user available
        let user = await User.findOne({email});
        // if not register 
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User not registered'
            })
        }
        
        const payload={
            email:user.email,
            id:user._id,
            role:user.role,
        };
        // verify password and generate JWT token
        if(await bcrypt.compare(password,user.password)){
        //    password match
        let token = jwt.sign(payload,process.env.JWT_SECRET,
        { 
            expiresIn:"2h",
        })

        // To modify fields not in the schema and strip password, convert to plain object
        user = user.toObject();
        user.token= token;
        user.password=undefined
        const options={
            expires: new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true
        }

        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"user logged in "
        })

        }else{
            // password don't match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect"
            });
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failure',
        })

    }
}