
const User=require('../models/userModel')
const asyncHandler=require('express-async-handler');
const {generateToken}=require("../config/generateToken");
const {passwordEncrypt,passwordMatching}=require("../config/passwordEncyptDecrypt");

const registerUser= asyncHandler(async(req,res)=>{
    const {name,email,password,pic}=req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the field");
    }
    
    const userExist= await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exists");
    }
    // const hashedPassword=passwordEncrypt(password);
    const user=await User.create({
        name,email,pic,password,
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
           token:generateToken(user._id),
        })
    }
    else{
        res.status(400);
        throw new Error("Failed to create user!");
    }
});

const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    // console.log(user)
    const match= await user.matchPassword(password);
    // console.log(match);
    if(user && match){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
           token:generateToken(user._id),
        })
    }
    else{
        res.status(401);
        throw new Error("Invalid email or password !");
    }
})

// api/user?search=jai

const allUsers=asyncHandler(async(req,res)=>{
    const keyword=req.query.search ? {
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}},
        ]
    }:{};

    const users=await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);

})


module.exports={registerUser,authUser,allUsers};