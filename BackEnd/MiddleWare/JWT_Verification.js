const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_Verification = async (req, res, next) =>{
  const authHeader  =  req.headers.authorization || req.header.Authorization
  if (!authHeader?.startsWith('Bearer ')) return res.status(401);
  const token = authHeader.split(' ')[1]
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE,(err,decoded)=>{
  if(err) {
          return res.status(403).json({message:err})
          }
    req.id = decoded.id
    req.role = decoded.role
    next()
  })
}
module.exports = {JWT_Verification}