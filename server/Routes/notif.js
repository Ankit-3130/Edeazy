const express = require("express");
const router = express.Router();
const Chat = require("../schemas/chatschema");
const verifyToken = require("../middlewares/verifytoken");
const User = require("../schemas/user");
const Message = require("../schemas/messages");


router.get('/',verifyToken,async(req,res)=>{
    try{
        const arr=req.user.notif;  
        res.status(200).json(arr);
    }catch(error){
        console.log(error);
    }
})
router.post('/',verifyToken,async(req,res)=>{
    try {
        const Chatrec = req.body.recChat;
        const updated_arr=req.user.notif;
        var i=0;
        var updated_user;
        var check=0;
        for(;i<updated_arr.length;i++){
            if(updated_arr[i]._id===Chatrec._id){
               check=1;
               break;
            }
        }
        var updated_user=req.user;
        console.log(check);
        if(check===0){
        var updated_user = await User.findByIdAndUpdate(req.user._id, {
            $push: { notif: Chatrec }
        });
        }
        res.status(200).json(updated_user);
    } catch (error) {
        console.log(error);
    }
});
router.post('/update',verifyToken,async(req,res)=>{
    try {
        const Chatrec = req.body.recChat;
        const updated_arr=req.user.notif;
        var i=0;
        var updated_user;
        var check;
        for(;i<updated_arr.length;i++){
            if(updated_arr[i].chatref===Chatrec.chatref){
                check = await User.findByIdAndUpdate(req.user._id, {
                    $pull: { notif: updated_arr[i] }
                });
                updated_user = await User.findByIdAndUpdate(req.user._id, {
                    $push: { notif: Chatrec }
                });
                break;
            }
        }
        res.status(200).json(updated_user);
    } catch (error) {
        console.log(error);
    }
});
router.post('/remove',verifyToken,async(req,res)=>{
    try {
        const Chatrec = req.body.recChat;
        
        var updated_user = await User.findByIdAndUpdate(req.user._id, {
            $pull: { notif: Chatrec }
        });
        res.status(200).json(updated_user);
    } catch (error) {
        console.log(error);
    }
});

module.exports=router;