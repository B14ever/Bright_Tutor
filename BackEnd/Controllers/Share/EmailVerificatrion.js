 //Models or Schemas 
const Users = require( '../../Modules/Users')
const Tutors = require('../../Modules/Tutors')
const Admin = require('../../Modules/Admin')
const {CreateToken} = require('../../MiddleWare/CreateToken')
const EmailVerification = async (req,res,next)=>{
   
    const { Code, Path } = req.body
    const userId = req.id;
    const role = req.role
    try {
        const getUser = await Users.findOne({ _id: `${userId}` }, { otp: 1, Email:1 })
        if (!getUser) {
           const error = new Error('Invalid email')
           error.status = 404
           throw error
        } else {
            const currentTime = new Date().getTime();
            if (currentTime > getUser.otp.ValidUntil) {
                const error = new Error('ExipiredCode')
                error.status = 408
                throw error
            } else {
                if (getUser.otp.attempts < 3) {
                    if (parseInt(Code) === getUser.otp.code) {
                        // verifiy user
                        const verifiyUser = await Users.updateOne({ _id: `${userId}` }, { $set: { isVerified: true } })
                        if (!verifiyUser) {
                            const error = new Error('ServerError')
                            error.status = 501
                            throw error
                        } else {
                            // clear refersh token
                            res.clearCookie('jwt',{httpOnly:true, sameSite:'None', secure:true})
                            //create a new refersh tooken
                            const {accsess_token, refresh_token}  = CreateToken(userId,role)
                            // add new refreh token to the database
                            getUser.RefreshToken = [refresh_token]
                            await getUser.save()
                            if (role === 'Tutors') {
                                const user = await Tutors.findOne({ Email: `${getUser.Email}` })
                                res.cookie('jwt', refresh_token , { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
                                if(Path === 'ForgetPassword')
                                {
                                   return res.status(200).json({accsess_token})
                                }
                                    res.status(200).json({accsess_token, user })
                            }
                            if (role === 'Admin') {
                                const user = await Admin.findOne({ Email: `${getUser.Email}` })
                                res.cookie('jwt', refresh_token , { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
                                res.status(200).json({accsess_token})
                            }
                        }
                    } else {
                        const result = await Users.updateOne({ _id: `${userId}` }, { $inc: { 'otp.attempts': 1 } });
                        if (result.modifiedCount === 0) {
                            const error = new Error('ServerError')
                            error.status = 501
                            throw error
                        } else {
                            const error = new Error('InvalidCode')
                            error.status = 401
                            throw error
                        }
                    }
                } else {
                    const error = new Error('MaximumAttempts')
                    error.status = 429
                    throw error
                }
            }
        }
    } catch (err) {
        res.status(err.status || 500).json({ err: err.message })
    }
}
module.exports = {EmailVerification}