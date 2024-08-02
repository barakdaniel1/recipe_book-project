const { updateRecipeQuery } = require('../../queries/recipe_queries');
const {getUserByUserName} = require('../../queries/user_queries');

const updateRecipeService = async (username, recipename, ingredients, 
                                        instructions, tags) => {
    const foundUser = getUserByUserName(username);
    if(!foundUser) throw new Error("user not found");

    await updateRecipeQuery(username, recipename, ingredients, instructions, tags);
}

module.exports = {updateRecipeService};