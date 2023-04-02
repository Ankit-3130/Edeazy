const jwt=require("jsonwebtoken");
const User=require("../schemas/user");
const asyncHandler=require("express-async-handler"); 
const secret="MNNITPRAYAGRAJALLAHABAD"

const verifyToken= asyncHandler(async(req,res,next)=>{
let token;
if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token,secret );
      console.log(decoded.user.id)
      req.user = await User.findById(decoded.user.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
module.exports=verifyToken;