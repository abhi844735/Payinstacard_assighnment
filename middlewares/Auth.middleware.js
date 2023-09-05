const express=require("express");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const auth=async(req,res,next)=>{
    try {
        let token=req.headers.authorization;
        if(!token){
            return res.status(404).send({message:"please log in"})
        }
        let decoded=jwt.verify(token,process.env.secret_key);
        if(!decoded){
            return res.staus(404).send({message:"not authorised"})
        }
        req.body.userID=decoded.userID;
        next();
        
    } catch (error) {
        res.status(401).send({message:error.message});
    }
}
module.exports={auth}