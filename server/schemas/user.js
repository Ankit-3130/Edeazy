const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        required:true
    },
    user_type:{
        type:String,
    },
    institution:{
        type:String
    },
    course:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    notif:[]
});

const User=mongoose.model("User",userSchema);
module.exports= User;
