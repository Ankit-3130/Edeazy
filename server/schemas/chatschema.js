const mongoose =require("mongoose");

const chatModel=mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastmessage:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    }
},
{timestamps:true}
);
module.exports=mongoose.model("Chat",chatModel);