 //Modules
 const Users = require( '../../Modules/Users')
 const {CreateToken} = require('../../MiddleWare/CreateToken')
 const {OTP_Genterator} = require('../../MiddleWare/OTP_Generater')
 const {SendEmail} = require('../../MiddleWare/SendEmail')
 const newOTP = OTP_Genterator()
 const ForgetPassword = async(req, res, next) => {
     const Email = req.body.Email
     res.clearCookie('jwt',{httpOnly:true, sameSite:'None', secure:true})
     try {
         const find_user = await Users.findOne({ Email: `${Email}` })
         if (!find_user) {
             const error = new Error('InvalidEmail');
             error.status = 409; // set the status code to 409 (Conflict)
             throw error;
         } else {
                find_user.RefreshToken = [] // delete all refersh tooken of the user this makes the user loged out of any device
                await find_user.save()
                // create a new one time password
             const update_User_Otp = await Users.updateOne({ Email: `${Email}` }, { $set: { otp: newOTP } }).exec()
             if (!update_User_Otp) {
                 const error = new Error('Server Error try again');
                 error.status = 409; // set the status code to 409 (Conflict)
                 throw error;
             } else {
                 const id = find_user._id
                 const userId = id.toString()
                 const token = CreateToken(userId, find_user.role)
                 SendEmail(req, res, next, newOTP.code, Email, token)
             }
         }
     } catch (err) {
         res.status(err.status || 500).json({ error: err.message })
     }

 }
 module.exports = { ForgetPassword }