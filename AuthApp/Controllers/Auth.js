const bcrypt = require("bcrypt")
const User= require("../models/User");

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
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill all details' });
        }
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ success: false, message: 'User not registered' });
        }
        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            return res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            return res.status(403).json({ success: false, message: 'Password incorrect' });
        }
    } catch(error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Login failure' });
    }
}
