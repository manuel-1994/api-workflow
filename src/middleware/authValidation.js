const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/environments");

const verifyToken=(req,res,next)=>{
  const {token} = req.cookies

  if(!token){
    return res.status(403).json({status:"No-Auth",message:"A token is required for this process"})
  }

  try {
    const decoded = jwt.verify(token,jwt_secret)
    const {role} = decoded
    if(role>=req.neededRole){
      req.user = decoded
      return next()
    }
    return res.status(403).json({status:"Insuficient permissions",message:"A superior role is required for this action"})
  } catch (error) {
    return res.status(403).json({status:"Expired",message:"A valid token is required for this process"})
  }
}

const isAdmin=(req,res,next)=>{
  req.neededRole = 2
  verifyToken(req,res,next)
}
const isEditor=(req,res,next)=>{
  req.neededRole = 1
  verifyToken(req,res,next)
}
const isRegular=(req,res,next)=>{
  req.neededRole = 0
  verifyToken(req,res,next)
}

module.exports = {
  isAdmin,
  isEditor,
  isRegular
}
