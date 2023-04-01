const mongoose=require("mongoose");

const connecttomongo=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/freshFam", { useNewUrlParser: true });
}

module.exports=connecttomongo;