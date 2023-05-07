const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken")
const randomstring = require("randomstring");
const Group = require('../schemas/groupSchema');
const User = require("../schemas/user");

//post request to create new Class or Group

router.post("/", verifyToken, async (req, res) => {
    const { className } = req.body;
    try {
        const stringcode = randomstring.generate(7);
        var groupData = {
            className: className,
            admin: req.user._id,
            classCode: stringcode
        };
        var createdgrp = await Group.create(groupData);
        createdgrp = await User.populate(createdgrp, {
            path: "admin",
            select: "name email"
        });
        res.status(200).json(createdgrp);

    } catch (error) {
        console.log(error.message);
    }
});

//Request to join the Class or group using Class Code


router.post("/join", verifyToken, async (req, res) => {
    try {
        const stringcode = req.body.classCode;
        console.log(stringcode);
        var group = await Group.findOneAndUpdate({ classCode: stringcode }, {
            $push: { users: req.user._id }
        });
        group = await User.populate(
            group,
            {
                path: "admin",
                select: "name email"
            }
        )
        res.status(200).json(group);
    } catch (error) {
        console.log(error);
    }
})

//Get request to find all the classes of particular User


router.get("/", verifyToken, async (req, res) => {
    try {
        Group.find({ $or: [{ users: { $elemMatch: { $eq: req.user._id } } }, { admin: req.user._id }] })
            .populate("admin", "-password")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                res.status(200).send(results);
            })
    } catch (error) {
        console.log(error);
    }
})

//request to delete the class for user


router.post('/delete', verifyToken, async (req, res) => {
    const grp_id = req.body.groupid;
    try {
        await Group.findByIdAndDelete(grp_id);
        res.status(200).json("deleted successfully");
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;