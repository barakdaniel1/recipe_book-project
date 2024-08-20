const {getUserByUserName} = require('../Queries/user_queries');
const bcrypt = require ("bcrypt");
const jwt = require ('jsonwebtoken');

const loginAction = async (username, password) => {
    const foundUser = await getUserByUserName(username);
    if(!foundUser) throw new Error("username not found!");

    const match = await bcrypt.compare(password,foundUser.password);
    
    if(match){
        //get the roles of a user, output array would be all the roles of a user.
        const roles = Object.values(foundUser.roles).filter(Boolean);

        //create jwts:
        //access token:
        const accessToken = jwt.sign(
            {
                "UserInfo" : {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
        );

        //refresh token:
        const refreshToken = jwt.sign(
            {
                "UserInfo" : {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        );
        
        //since user is now logged in, we should produce a new refresh token.
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
          
        const expires = Date.now() + 15*60*1000; // 15 min accessToken.

        //send the roles and the access token to the user.
        return { roles, accessToken, expires, refreshToken};
    }
    else 
        throw new Error("username and password don't match!");
}

module.exports = {loginAction};