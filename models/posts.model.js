const mongoose=require("mongoose");
const postschema=mongoose.Schema({
    title:String,
    description:String,
    userID:String
});
const Postmodel=mongoose.model("posts",postschema);
module.exports={Postmodel}