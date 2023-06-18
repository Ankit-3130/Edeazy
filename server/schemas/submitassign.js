const mongoose=require('mongoose');


const submitSchema= mongoose.Schema({
    assignment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Assign"
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