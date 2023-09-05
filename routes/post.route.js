const express=require("express");
const { Postmodel } = require("../models/posts.model");
const { Usermodel } = require("../models/users.model");
const postRouter=express.Router();
require("dotenv").config();
postRouter.get("/",async(req,res)=>{
    let userId=req.body.userID;
    try {
         const allPosts=await Postmodel.find({userID:userId});
         res.status(201).send({message:"all Posts",allPosts})
        
    } catch (error) {
        res.status(409).send({message:error.message});
    }
})
postRouter.post("/addPost",async(req,res)=>{
    try {
        const post=await new Postmodel(req.body);
        await post.save();
        res.status(201).send({message:"post added successfully"});
    } catch (error) {
        res.status(409).send({message:error.message});
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    try {
        let postId=req.params.id;
        let userId=req.body.userID;
        // console.log(userId);
        const postData=await Postmodel.findOne({_id:postId});
        const post_userId=postData.userID;
        
        if(userId===post_userId){
            await Postmodel.findByIdAndUpdate({_id:postId},req.body);
            res.status(201).send({message:"post updated successfully"});
        }else{
            res.status(409).send({message:"Not Authorised"});
        }


    } catch (error) {
        res.status(409).send({message:error.message});
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let postId=req.params.id;
        let userId=req.body.userID;
        let postData=await Postmodel.findOne({_id:postId});
        let post_userId=postData.userID;
        if(userId===post_userId){
            await Postmodel.findByIdAndDelete({_id:postId});
            res.status(201).send({message:"post deleted successfully"});
        }
    } catch (error) {
        
    }
})

module.exports={postRouter}