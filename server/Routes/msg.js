const express = require("express");
const router = express.Router();
const Chat = require("../schemas/chatschema");
const verifyToken = require("../middlewares/verifytoken");
const User=require("../schemas/user");
const Message= require("../schemas/messages");

router.get("/:chatid",verifyToken,async(req,res)=>{
    try{
        const chatId=req.params.chatid;
        const messages=await Message.find({
            chatref:chatId
        }).populate("sender","fname email").populate("chatref");

        res.json(messages);
    }catch(error){
        console.log(error);
    }
});
 

router.post("/",verifyToken,async(req,res)=>{
    const { chatid, content }=req.body;
    var newMessage = {
        sender: req.user._id,
        content: content,
        chatref: chatid,
      };
      try{
        var message=await Message.create(newMessage);
        message = await message.populate([{path:"sender", select:"fname email"},"chatref"]);
        message = await User.populate(message, {
      path: "chatref.users",
      select: "fname email",
    });

    await Chat.findByIdAndUpdate(chatid, { lastmessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
      

})

module.exports=router;