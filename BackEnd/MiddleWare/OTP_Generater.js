const otpGenerator = require('otp-generator')
const OTP_Genterator = () =>{
   const Code = otpGenerator.generate(6,{
     lowerCaseAlphabets:false,
     upperCaseAlphabets:false,
     specialChars:false,
   })
   const newOTP = {
    code:Code,
    validUntil: new Date(Date.now() + 15 * 60 * 100),
    attempts:0
   }
   return newOTP
}
module.exports = {OTP_Genterator}