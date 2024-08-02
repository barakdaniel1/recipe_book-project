const {createRecipeService} = require ('../services/recipes_services/create_recipe_service');
const { deleteRecipeService } = require('../services/recipes_services/delete_recipe_service');
const { getRecipeService } = require('../services/recipes_services/get_recipe_service');
const { getAllRecipesService } = require('../services/recipes_services/get_recipes_service');
const { updateRecipeService } = require('../services/recipes_services/update_recipe_service');


/*
RECIPE NAME CANNOT BE CHANGED!!!!!!!
*/


const createRecipe = async (req,res) => {
    
    //validate the information.
    if(!req.body?.ingredients || !req.body?.instructions || !req.body?.recipename) return res.status(403)
        .json({"message": "Ingredients, instructions and recipe name are required."});
    
    if(!req.params?.username) return res.status(400)
            .json({"message": "Username is required."});
    
    try {
       //verify again that the data is normalized with end of lines correctly.
       //we need to normalize end of lines because different environments have different
       //end of lines.
       //basically, we set new lines to be \n, regardless of the environment.
        const recipeName = req.body.recipename.replace(/\r?\n/g, '\n');
        const ingredients = req.body.ingredients.replace(/\r?\n/g, '\n');
        const instructions = req.body.instructions.replace(/\r?\n/g, '\n');
        const tags = (req.body.tags || "").replace(/\r?\n/g, '\n');
        const image = req.body.image;

        //create the recipe
        await createRecipeService(req.params.username ,recipeName, ingredients, instructions, tags, image);
        return res.status(200).json({"message" : "recipe created successfully!"});
    }
    catch (err) {
        return res.status(400).json({"message": err.message});
    }
}

const getAllRecipes = async (req,res) => {
    //verify username exists
    if(!req.params?.username) return res.status(400)
        .json({"message": "Username is required."});

    try {
        //fetch all the recipes
        const recipes = await getAllRecipesService(req.params.username);
        return res.status(200).json({"recipes" : recipes});
    }
    catch(err) {
        return res.status(400).json({"message": err.message});
    }
}

const deleteRecipe = async(req,res) => {
    //verify that recipe name and username exist.
    if(!req.body?.recipename) return res.status(204)
                                .json({"message": "Recipe name is required"});
    if(!req.params?.username) return res.status(400)
                                .json({"message": "Username is required."});

    try {
        //delete the recipe
        await deleteRecipeService(req.params.username, req.body.recipename);
        return res.status(200).json({"message" : "recipe deleted successfully!"});
    }
    catch(err) {
        return res.status(400).json({"message": err.message});
    }
}

const updateRecipe = async(req,res) => {
    //validate that we got all the information
    if(!req.body?.ingredients || !req.body?.instructions || !req.body?.recipename ||
        !req.body?.tags ) return res.status(403)
        .json({"message": "Ingredients, instructions recipe name, and tags are required."});

    if(!req.params?.username) return res.status(400)
        .json({"message": "Username is required."});

    try {
        //normalize lines.
        const recipeName = req.body.recipename.replace(/\r?\n/g, '\n');
        const ingredients = req.body.ingredients.replace(/\r?\n/g, '\n');
        const instructions = req.body.instructions.replace(/\r?\n/g, '\n');
        const tags = (req.body.tags || "").replace(/\r?\n/g, '\n');

        //update the recipe.
        await updateRecipeService(req.params.username, recipeName, ingredients, instructions, tags);
        
        return res.status(200).json({"message" : "recipe updated successfully!"});
    }
    catch(err) {
        return res.status(400).json({"message": err.message});
    }
}

const getRecipe = async(req,res) =>{
    //get the needed information from the URL.
    if(!req.params?.recipename) return res.status(403)
                                    .json({"message": "Recipe name is required"});

    if(!req.params?.username) return res.status(400)
                                    .json({"message": "Username is required."});

    try {
        const recipe = await getRecipeService(req.params.username, req.params.recipename);
        return res.status(200).json({"recipe" : recipe});
    }
    catch(err) {
        return res.status(400).json({"message": err.message});
    }
}

module.exports = {createRecipe,deleteRecipe,updateRecipe,getAllRecipes,getRecipe};

