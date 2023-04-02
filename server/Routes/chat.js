const express = require("express");
const router = express.Router();
const Chat = require("../schemas/chatschema");
const verifyToken = require("../middlewares/verifytoken");
const User=require("../schemas/user");

router.post("/", verifyToken, async (req, res) => {
    const seconduser = req.body.userId;
    var ischat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: seconduser } } },
        ]
    }).populate("users", "-password")
    .populate("lastmessage");

  ischat = await User.populate(ischat, {
    path: "lastmessage.sender",
    select: "fname email",
  });
    if(ischat.length>1){
        res.send(ischat);
    }else{
        var chatData = {
            chatName: "sender",
            users: [req.user._id, seconduser],
        };
    }
    try{
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
          );
        res.status(200).json(FullChat);
    }catch(error){
        res.status(400).json(error);
    }
});
router.get("/",verifyToken,async(req,res)=>{
    try{

    var chats=await Chat.find({
        users: { $elemMatch: { $eq: req.user._id } }
    }).sort({updatedAt:-1});

    res.status(200).send(chats);
}catch(error){
    console.log(error);
}
})

module.exports=router;