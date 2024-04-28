// Models or Schema
const Users = require( '../../Modules/Users')
//MiddileWares
const {CreateToken} = require('../../MiddleWare/CreateToken')
const {OTP_Genterator} = require('../../MiddleWare/OTP_Generater')
const {SendEmail} = require('../../MiddleWare/SendEmail')
const RequestCode = async(req, res ,next) =>{
    const id = req.id
    const role = req.role
    // Generate new OTP
    const newOTP = OTP_Genterator()
    try{
        check_user = await Users.findOne({_id:`${id}`}).exec()
        if(!check_user){
            const error  = new Error('ServerError')
            error.status = 401
            throw error
        }
        else { 
            check_user.RefreshToken = [] // delete all refersh tooken of the user this makes the user loged out of any device
            await check_user.save()
            // create a new one time password
           const update_User_Otp = await Users.updateOne({_id:`${id}`}, { $set: { otp: newOTP } }).exec()
            if (!update_User_Otp) {
                const error = new Error('ServerError');
                error.status = 409; // set the status code to 409 (Conflict)
                throw error;
            } else {
              const token = CreateToken(id, role)
              SendEmail(req, res, next, newOTP.code, Email, token)
            }
     }
    }catch(err){
        res.status(err.status || 500).json({err:err.messsage})
    }
}
module.exports = {RequestCode}