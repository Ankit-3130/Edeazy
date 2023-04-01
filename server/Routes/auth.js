const express=require("express");
const User=require("../schemas/user");
const router=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const secret="MNNITPRAYAGRAJALLAHABAD"

router.post("/register",async(req,res)=>{
    try{
        var user= await User.findOne({email:req.body.email});
        console.log(user);
        if(user){
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }
        const salt= await bcrypt.genSalt(10);
        const securepass=await bcrypt.hash(req.body.password,salt);
        user=await User.create({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:securepass
        });
        const data={
            user:{
                id:user._id
            }
        };
        const authtoken= jwt.sign(data,secret);
        res.json({authtoken});
    }catch(err){
      console.log(err);
    }
});
router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        var user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({error:"user not found"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"invalid credentials"});
        }
        const data={
            user:{
                id:user._id,
            }
        };
        const authtoken=jwt.sign(data,secret);
        res.json({authtoken});
    } catch (error) {
        console.log(err);
    }
})
module.exports = router