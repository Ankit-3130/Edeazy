const mongoose=require("mongoose");

const groupSchema= mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId, ref: "User"
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId, ref: "User"
    }],
    classCode:{
        type:String
    },
    className:{
        type:String
    }
});

module.exports=mongoose.model("Group",groupSchema);
