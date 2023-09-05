const express=require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const { auth } = require("./middlewares/Auth.middleware");
require("dotenv").config();
const app =express();
app.use(express.json());
app.use("/user",userRouter);
app.use(auth);
app.use("/post",postRouter)
app.get("/",(req,res)=>{
    try {
        res.send({message:"home"})
    } catch (error) {
        res.send({message:error.message})
    }
})
app.listen(8080,async(req,res)=>{
    try {
        await connection;
        console.log("connected to database")
    } catch (error) {
        console.log(error.message);
    }
    console.log("server is running");
});
