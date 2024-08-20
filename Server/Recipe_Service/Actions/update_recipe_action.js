const { updateRecipeQuery } = require('../Queries/recipe_queries');
const {getUserByUserName} = require('../../User_Service/Queries/user_queries');

const updateRecipeAction = async (username, recipename, ingredients, 
                                        instructions, tags) => {
    const foundUser = getUserByUserName(username);
    if(!foundUser) throw new Error("user not found");

    await updateRecipeQuery(username, recipename, ingredients, instructions, tags);
}

module.exports = {updateRecipeAction};