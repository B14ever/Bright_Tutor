 //Modules
 const Users = require( '../../Modules/Users')
     //Midleware
const { HashPassword } = require ('../../MiddleWare/Bycrpt')

 const RecoverPassword = async(req, res) => {
     const userId = req.id;
     const { Password } = req.body
     try {
         const newPassword = await HashPassword(Password)
         change_user_password = await Users.updateOne({ _id: `${userId}` }, { $set: { Password: `${newPassword}` } })
         if (!change_user_password) {
             throw new Error('ChangePasswordFaild')
         } else {
            // clear all refersh tooken 
             const find_user = await Users.findOne({ _id: `${userId}` })
             find_user.RefreshToken = []
             await find_user.save()
             res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true})
             return res.status(200).json({ msg: "password changed succfully" })
         }
     } catch (err) {
         return res.status(500).json({ error: err.message })
     }
 }
 module.exports = { RecoverPassword }