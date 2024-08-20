const {getUserByRefreshToken} = require ('../Queries/user_queries');

const logoutAction = async (refreshToken) =>{
    const foundUser = await getUserByRefreshToken(refreshToken);
    if(!foundUser) throw new Error("user not found");
    foundUser.refreshToken = '';
    await foundUser.save();
}

module.exports = {logoutAction};