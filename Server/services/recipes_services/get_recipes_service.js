const {getUserByUserName} = require ('../../queries/user_queries');

const getAllRecipesService = async (username) => {
    const foundUser = await getUserByUserName(username);
    if(!foundUser) throw new Error("User not found");
    return foundUser.recipes;
}

module.exports = {getAllRecipesService};