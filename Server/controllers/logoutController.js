const User = require('../model/User');

const handleLogOutController = async (req,res) => {
    //All the cookies of a user.
    const cookies = req.cookies; 
    
    //Look for jwt cookie, as this cookie contains info about the user.
    if(!cookies?.jwt) return res.sendStatus(204); //No content.

    /*
    for reference, check loginController.
    Delete the refreshToken of a user by accessing the cookie he got from the server,
    looking for the cookie named jwt. The value of this cookie is the refreshToken,
    as declared in loginController.
    */ 
    const refreshToken = cookies.jwt;

    //Now, check if the refreshToken is in the DB.
    const foundUser = await User.findOne({refreshToken}).exec();
    
    //if we couldnt find the refreshToken in the DB, clear the jwt cookie that the user has
    if(!foundUser){
        clearCookie(res);
    }

    //found user, so delete his refresh token to deny access and also clear the cookie.
    else{
        foundUser.refreshToken = '';
        const res = await foundUser.save();
        clearCookie(res);
    }

}

const clearCookie = (res) =>{
    res.clearCookie('jwt', {httpOnly: true,secure: true, sameSite: 'None'});
    res.sendStatus(204);
}

module.exports = {handleLogOutController};