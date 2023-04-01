const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const mongoose=require("mongoose");
const connecttodb=require("./mongo");

connecttodb();

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./Routes/auth'))


app.listen(3001,()=>{
    console.log("successfully connected to port 3001 ");
})


