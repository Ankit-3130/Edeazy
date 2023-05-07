const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken")
const randomstring = require("randomstring");
const Group = require('../schemas/groupSchema');
const User = require("../schemas/user");
const multer = require('multer');
const path = require('path');
const Assign = require('../schemas/assignmentSchema');
const SubmitAssign = require('../schemas/submitassign');


//MULTER CONFIG

var upload = multer({ dest: 'uploads' });
var type = upload.single('file');

//Route to Upload the Assignment by the Teacher


router.post('/', type, async (req, res) => {
    const { assignname, dueDate, grp } = req.body;
    console.log(grp);
    const filename = req.file.filename;
    const path = req.file.path;
    const group = await Group.findById(grp);
    try {
        const assignment = await Assign.create({
            assignname: assignname,
            path: path,
            filename: filename,
            grp: grp,
            users: group.users,
            dueDate: dueDate,
            admin:group.admin,
        });
        res.status(200).json("assignment uploaded successfully");
    } catch (error) {
        console.log(error);
    }

});

//route to render the particular assignments of the user


router.get('/:usertype', verifyToken, async (req, res) => {
    const user_type = req.params.usertype;
    if (user_type === 'TEACHER') {
        try {
            Assign.find({ admin: req.user._id })
                .populate("admin")
                .sort({ updatedAt: -1 })
                .then(async (results) => {
                    console.log(results);
                     res.status(200).send(results);
                })
        } catch (error) {
            console.log(error);
        }

    } else {
        try {
            Assign.find({ users: { $elemMatch: { $eq: req.user._id } } })
                .populate("admin")
                .sort({ updatedAt: -1 })
                .then(async (results) => {
                    res.status(200).send(results);
                })
        } catch (error) {
            console.log(error);
        }
    }
})


//Route to submit the assignment by the students


router.post('/:AssignId',type, async (req, res) => {
    const assign_id = req.params.AssignId;
    try {
        const sumit_assignment = await SubmitAssign.create({
            assignment_id: assign_id,
            path: req.file.path,
            filename: req.file.filename,
        });
        var Assign = await Group.findOneAndUpdate({ _id: assign_id }, {
            $pull: { users: req.user._id }
        });

        res.status(200).json("assignment submitted successfully")
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;
