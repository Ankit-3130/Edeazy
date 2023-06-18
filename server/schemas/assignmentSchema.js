const mongoose=require('mongoose');

const assignmentSchema=mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    assignname: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    grp:{
        type:mongoose.Schema.Types.ObjectId,
         ref: "Group"
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    users:[{type:mongoose.Schema.Types.ObjectId,
        ref: "User"}],
    dueDate:{
        type:Date,
        required:true,
    }
},
    {timestamps:true}
)

module.exports=mongoose.model("Assign",assignmentSchema);