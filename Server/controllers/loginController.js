const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogInController = async (req, res) => {
    const userName = req.body.username;
    const pwd = req.body.password;
    
    if(!userName || !pwd) return res.status(401).json({'message':'Username and password are required'});

    const foundUser = await User.findOne({username: userName}).exec();
    if(!foundUser) return res.status(401).json({'message': 'Username not found'})

    const match = await bcrypt.compare(pwd,foundUser.password);
    console.log(process.env.ACCESS_TOKEN_SECRET);
    console.log(process.env.RENDER_ACCESS_TOKEN_SECRET) // CHECKING FOR ONRENDER!!!
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
        const result = await foundUser.save();
        
        console.log(result);
        console.log(roles);

        //create a cookie containing the new access token.
        res.cookie('jwt',accessToken,{httpOnly: true, maxAge: 15 * 60 * 1000, sameSite: 'None',secure: true}) 
        
        const expires = Date.now() + 15*60*1000; // 15 min accessToken.
        //send the roles and the access token to the user.
        res.status(201).json({ roles, accessToken, expires});
    }
    else 
        res.status(401).json({'message': 'Password is incorrect'});
}

module.exports = { handleLogInController };