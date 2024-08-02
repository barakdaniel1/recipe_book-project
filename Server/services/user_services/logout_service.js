const {getUserByRefreshToken} = require ('../../queries/user_queries');

const logoutService = async (refreshToken) =>{
    const foundUser = await getUserByRefreshToken(refreshToken);
    if(!foundUser) throw new Error("user not found");
    foundUser.refreshToken = '';
    await foundUser.save();
}

module.exports = {logoutService};