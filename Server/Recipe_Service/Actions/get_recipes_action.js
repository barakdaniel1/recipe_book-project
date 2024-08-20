const {getUserByUserName} = require ('../../User_Service/Queries/user_queries');

const getAllRecipesAction = async (username) => {
    const foundUser = await getUserByUserName(username);
    if(!foundUser) throw new Error("User not found");
    return foundUser.recipes;
}

module.exports = {getAllRecipesAction};