const mongoose=require('mongoose');


const submitSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    path: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
},
{timestamps:true}
)

module.exports=mongoose.model('SubmitAssign',submitSchema);