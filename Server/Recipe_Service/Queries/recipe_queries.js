const User = require('../../User_Service/Model/User');

const updateRecipeQuery = async (username,recipename, ingredients, instructions, tags) => {
    try{
    await User.updateOne(
        {
            username : username,
            'recipes.recipename' : recipename
        },
        {
            $set: {
                'recipes.$.ingredients' : ingredients,
                'recipes.$.instructions' : instructions,
                'recipes.$.tags' : tags
            }
        });
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {updateRecipeQuery}