const {getUserByUserName} = require ('../../queries/user_queries');

const deleteRecipeService = async (username, recipename) => {
    const foundUser = await getUserByUserName(username);
    if(!foundUser) return res.status(204).json({"message": "User not found"});
    
    //filter the recipes array to be without the recipe to delete.
    foundUser.recipes = foundUser.recipes.filter(
            (recipe) => recipe.recipename !== recipename);
    
    await foundUser.save();
}

module.exports = {deleteRecipeService};