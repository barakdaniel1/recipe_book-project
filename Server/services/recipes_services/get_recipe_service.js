const { getUserByUserName } = require("../../queries/user_queries");

const getRecipeService = async (username, recipename) => {
    const foundUser = await getUserByUserName(username);
    if(!foundUser) throw new Error("User not found");

    const recipe = foundUser.recipes.filter(
        (curr_recipe) => curr_recipe.recipename === recipename);
    if(recipe.length === 0) throw new Error("recipe not found");
    return recipe[0];
}

module.exports = {getRecipeService};