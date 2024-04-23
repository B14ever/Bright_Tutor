const Users = require('../../Modules/Users')
const {ComparePassword} = require('../../MiddleWare/Bycrpt')
const {CreateToken} = require('../../MiddleWare/CreateToken')
const Login = async (req, res) => {
  const {Email , Password} = req.body
  const cookies = req.cookies
  try{
      const check_user = await Users.findOne({Email: `${Email}`}).exec()
      if(!check_user){
          const error = new Error('የተሳሳተ የይለፍ ቃል ወይም የሚስጥር ቃል')
          error.status = 401
          throw error
      }
      else{
          const check_password = await ComparePassword(Password , check_user.Password)
          if(!check_password){
              const error = new Error('የተሳሳተ የይለፍ ቃል ወይም የሚስጥር ቃል')
              error.status = 401
              throw error
          }
          else{
              // check if there is unUsed refersh token in the database
              let newRefreshTokenArray = !cookies?.jwt ? check_user.RefreshToken : check_user.RefreshToken.filter(rt => rt !== cookies.jwt)
              // check for possible hacker attackes
             if(cookies?.jwt) {
                const refresh_token =  cookies.jwt 
                const check_token = await Users.find({refresh_token}).exec()
                if(!check_token){
                  newRefreshTokenArray = [];
                }
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
              }
              // creat new access and refresh token
              const id = check_user._id
              const userID = id.toString()
              const {accsess_token, refresh_token} = CreateToken(userID,check_user.role)
               // Saving refreshToken with current user
                  check_user.RefreshToken = [...newRefreshTokenArray, refresh_token];
                  await check_user.save()
                  const get_user = await  Users.findOne({Email:`${Email}`},{_id:0,Password: 0,RefreshToken:0,__v:0,role:0}).exec()
                  res.cookie('jwt', refresh_token , { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
                  res.status(200).json({accsess_token,get_user})    
          }
      }
  }catch(err){
      return res.status(err.status || 500).json(err.message)
  }
}

  module.exports = {Login}