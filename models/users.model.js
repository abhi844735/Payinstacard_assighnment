const mongoose=require("mongoose");
const userschema=mongoose.Schema({
    name:{required:true,type:String},
    email:{required:true,type:String},
    gender:{required:true,type:String},
    password:{required:true,type:String}
})
const Usermodel=mongoose.model("users",userschema);
module.exports={Usermodel};