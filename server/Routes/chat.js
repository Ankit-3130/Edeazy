const express = require("express");
const router = express.Router();
const Chat = require("../schemas/chatschema");
const verifyToken = require("../middlewares/verifytoken");
const User = require("../schemas/user");

//request to connect two user for chats

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
        select: "name email",
    });
    console.log(ischat);
    if (ischat.length >= 1) {
        res.send(ischat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            users: [req.user._id, seconduser],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400).json(error);
        }
    }
});


//get request to find all the chats of particular user


router.get("/", verifyToken, async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("lastmessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestmessage.sender",
                    select: "name email",
                });
                res.status(200).send(results);
            })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;