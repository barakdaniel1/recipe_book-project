const User = require('../model/User');
const jwt = require('jsonwebtoken');


/*
This controller is responsible for creating new access tokens, for those who have refresh tokens.
*/

const handleRefreshTokenController = async (req, res) => {
    //look for jwt cookies because the value is the refresh token.
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    //find the user with the matching refresh token.
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) return res.sendStatus(403);

    //verify that the refresh token is valid
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,decode) =>{
        if(err || decode.username !== foundUser.username) return res.sendStatus(403);
        const roles = foundUser.roles;
        const accessToken = jwt.sign( {
            "UserInfo": {
                "username": decode.username,
                "roles": roles
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30s"});
        res.json({roles, accessToken});
    });
}

module.exports = { handleRefreshTokenController };