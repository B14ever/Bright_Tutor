const jwt = require('jsonwebtoken');
require('dotenv').config()
const CreateToken = (id,role)=>{
    const accsess_token  = jwt.sign({id,role},process.env.ACCESS_TOKEN_SECRETE,{expiresIn:'60m'})
    const refresh_token = jwt.sign({id,role},process.env.REFRESH_TOKEN_SECRETE,{expiresIn:'7d'})
    return {accsess_token, refresh_token}
}
module.exports = {CreateToken}