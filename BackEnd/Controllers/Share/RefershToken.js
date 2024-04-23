const Users = require( '../../Modules/Users')
const {CreateToken} = require('../../MiddleWare/CreateToken')
const jwt = require('jsonwebtoken');
const RefershToken = async(req,res)=>{
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    const foundUser = await Users.findOne({RefreshToken: refreshToken }).exec();
    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRETE,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); //Forbidden
                const hackedUser = await Users.findOne({ _id: decoded.id }).exec();
                hackedUser.RefreshToken = [];
                await hackedUser.save();
            }
        )
        return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.RefreshToken.filter(rt => rt !== refreshToken);

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRETE,
        async (err, decoded) => {
            if (err) {
                console.log('expired refresh token')
                foundUser.RefreshToken = [...newRefreshTokenArray];
                await foundUser.save()
            }
           
          
            // Creating new Refresh token 
            const {accsess_token,refresh_token} = CreateToken(foundUser._id,foundUser.role)

            // Saving refreshToken with current Users
            foundUser.RefreshToken = [...newRefreshTokenArray, refresh_token];
            await foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refresh_token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).json({accsess_token})
        }
    );
}

module.exports = { RefershToken }