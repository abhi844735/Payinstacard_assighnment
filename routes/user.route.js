const express=require("express");
const { Usermodel } = require("../models/users.model");
const userRouter=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();


// user signup route api
userRouter.post("/signup",async(req,res)=>{
    const {name,email,gender,password}=req.body;
    try {
        //checking if the email is already present in database
        const emailPresentData=await Usermodel.findOne({email});
        if(emailPresentData){
            return res.status(409).send({message:"email already registered"});
        }
        //hashing password before saving it to db
        bcrypt.hash(password,7,async(err,secure_password)=>{
            if (err){
                res.status(403).send({message:err.message});
            };
            let newUser=await new Usermodel({name,email,gender,password:secure_password});
            await newUser.save();
            res.status(201).send({message:"user registered successfully"});
        })
        
    } catch (error) {
        res.status(409).send({error:error.message});
    }
})

// user login route api
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        let userData=await Usermodel.findOne({email});
        //  console.log(userData);
        if(!userData){
            res.status(404).send({message:"User Not Found"});
        }
        bcrypt.compare(password,userData.password,(err,result)=>{
            if(err){
                return res.status(400).send({message:err.message})
            }
            if(!result){
                return res.status(404).send({message:"Password Incorrect"});
            }
            let token=jwt.sign({userID:userData._id},process.env.secret_key);
            res.send({message:"user logged in",token});
        })
        
        
    } catch (error) {
        res.status(409).send({message:error.message});
    }
})


module.exports={userRouter}