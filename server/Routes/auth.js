const express = require("express");
const User = require("../schemas/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = "MNNITPRAYAGRAJALLAHABAD"
const verifyToken = require("../middlewares/verifytoken")


//post request to resister the user


router.post("/register", async (req, res) => {
  try {
    var user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const securepass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: (req.body.name).toUpperCase(),
      user_type: (req.body.userType).toUpperCase(),
      institution: (req.body.institution).toUpperCase(),
      course: (req.body.course).toUpperCase(),
      email: req.body.email,
      password: securepass
    });
    console.log(user);
    const data = {
      user: {
        id: user._id
      }
    };
    const authtoken = jwt.sign(data, secret);
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
        institution: user.institution,
        course: user.course,
        token: authtoken,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }

  } catch (err) {
    console.log(err);
  }
});

//post request to verify and login the user

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    var user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "invalid credentials" });
    }
    const data = {
      user: {
        id: user._id,
      }
    };
    const authtoken = jwt.sign(data, secret);
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
        institution: user.institution,
        course: user.course,
        token: authtoken,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(err);
  }
});


//get request to search the user from the database

router.get("/", verifyToken, async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
module.exports = router