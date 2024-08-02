const {getUserByUserName} = require('../../queries/user_queries');

const createRecipeService = async (username,recipename, ingredients, instructions, tags, image) => {
    const foundUser = await getUserByUserName(username);
    if(!foundUser) return res.status(204).json({"message": "User not found"});
    
    const newRecipe = {
        recipename: recipename,
        ingredients: ingredients,
        instructions: instructions,
        tags: tags,
        image: image
    }

    //check if recipe already exists.
    const isExist = foundUser.recipes.filter((recipe) => recipe.recipename === recipename);
    if(isExist.length > 0) throw new Error("recipe name already exists.");
    
    //add the new recipe to the user's recipe list.
    foundUser.recipes.push(newRecipe);
    await foundUser.save();
}

module.exports = {createRecipeService};