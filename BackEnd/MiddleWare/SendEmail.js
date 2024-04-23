const nodemailer = require("nodemailer")
require('dotenv').config()
const SendEmail = async (req,res,next,Code,Email,token) => {
    const {accsess_token,refresh_token} = token
    const config = {
        service:'gmail',
        host:"smtp.ethereal.email",
        secure:false,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    }
    const transport = nodemailer.createTransport(config)
    const message = {
        from: process.env.EMAIL,
        to:`${Email}`,
        subject:'Email Verification',
        text:Code
    }
    try{
       await transport.sendMail(message)
       res.cookie('jwt',refresh_token,{
                 httpOnly:true,
                  secure:true,
                  sameSite:false,
                 maxAge:7 * 24 * 60 * 60 * 1000 })
       res.status(200).json({accsess_token})
       next()
    }catch(error){
        res.status(500).json({error:'Could not send email'})
    }
}
module.exports = { SendEmail }