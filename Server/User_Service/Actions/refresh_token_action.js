const {getUserByRefreshToken} = require ('../Queries/user_queries'); 
const jwt = require('jsonwebtoken');

const refreshTokenAction = async (refreshToken) => {
    const foundUser = await getUserByRefreshToken(refreshToken);
    if(!foundUser) throw new Error("user not found");

    let newAccessToken;

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
        newAccessToken = accessToken;
    });

    return newAccessToken;
}

module.exports = {refreshTokenAction};