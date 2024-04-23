// Models or Schema
const Users = require( '../../Modules/Users')
//MiddileWares
const {CreateToken} = require('../../MiddleWare/CreateToken')
const {OTP_Genterator} = require('../../MiddleWare/OTP_Generater')
const {SendEmail} = require('../../MiddleWare/SendEmail')
const RequestCode = async(req, res ,next) =>{
    const id = req.id
    const role = req.role
    const cookies = req.cookies
    // check if there is a cookie in ther broweser
    if(!cookies?.jwt) return res.status(401)
    const refreshToken = cookies.jwt
    // clear cookies in the browser
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    // Generate new OTP
    const newOTP = OTP_Genterator()
    try{
       
        check_user = await Users.findOne({_id:`${id}`}).exec()
        if(!check_user){
            const error  = new Error('There is no account with this email')
            error.status = 401
            throw error
        }
        check_user.RefreshToken = check_user.RefreshToken.filter(rt=> rt !== refreshToken)
        await check_user.save()
        const token = CreateToken(id,role)
        SendEmail(req, res,next,newOTP.code,check_user.Email,token)
    }catch(err){
        res.status(err.status || 500).json({err:err.messsage})
    }
}
module.exports = {RequestCode}