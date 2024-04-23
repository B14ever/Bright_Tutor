const bcrypt = require('bcrypt')
const HashPassword = async(Password) =>{
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(Password,salt)
    return hashPassword
}
const ComparePassword = async(Password,hash) =>{
    const match = await bcrypt.compare(Password,hash)
    if(match){
        return true
    }
    else{
        return false
    }
}
module.exports = {ComparePassword,HashPassword}