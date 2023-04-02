const mongoose=require("mongoose");

const msgSchema= mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    chatref:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    },
    content:{
        type:String,
        trim:true
    },

},
{
    timestamps:true
}
);

module.exports=mongoose.model("Message",msgSchema);