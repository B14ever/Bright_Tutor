//Models
const Tutors = require('../../Modules/Tutors')
const Users = require('../../Modules/Users')
//MiddileWares
const { HashPassword } = require ('../../MiddleWare/Bycrpt')
const {CreateToken} = require('../../MiddleWare/CreateToken')
const {OTP_Genterator} = require('../../MiddleWare/OTP_Generater')
const {SendEmail} = require('../../MiddleWare/SendEmail')
const SignUp =  async (req, res , next) =>{
   const {Email, Password} = req.body
   const password = await HashPassword(Password)
   const OTP = OTP_Genterator()
   const ADD_TO_Users = {Email, Password:password, role:'Tutors',otp:OTP}
   const Add_TO_Tutors = req.body
   try {
    const Check_Email  = await Users.findOne({ Email : `${Email}` })
    if(Check_Email){
        const error =  new Error('User alread exists')
        error.status = 409
        throw error
    }
    else{
        const [users, tutor] = await Promise.all([Users.create(ADD_TO_Users),Tutors.create(Add_TO_Tutors)])
        if (!users || !tutor) {
            const error = new Error('Server Error');
            error.status = 500;
            throw error;
        }
        else{
            const id = users._id
            const ID = id.toString()
            const token = CreateToken(ID,users.role)
            users.RefreshToken = [token.refresh_token]
            await users.save()
            SendEmail(req,res,next,OTP.code,Email,token)
        }
    }
   } catch (error) {
    res.status(error.status || 500).json({message:error.message})
   }
}
module.exports = {SignUp}