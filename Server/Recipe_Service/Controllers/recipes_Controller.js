const {createRecipeAction} = require ('../Actions/create_recipe_action');
const { deleteRecipeAction } = require('../Actions/delete_recipe_action');
const { getRecipeAction } = require('../Actions/get_recipe_action');
const { getAllRecipesAction } = require('../Actions/get_recipes_action');
const { updateRecipeAction } = require('../Actions/update_recipe_action');
const multer = require('multer');

// Set up multer for parsing multipart/form-data
const upload = multer();

/*
RECIPE NAME CANNOT BE CHANGED!!!!!!!
*/


const createRecipe = async (req, res) => {
    // Use multer to parse the request
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ "message": "Error parsing image file." });
        }

        // Validate the information
        if (!req.body.ingredients || !req.body.instructions || !req.body.recipename) {
            return res.status(403).json({ "message": "Ingredients, instructions, and recipe name are required." });
        }

        if (!req.params?.username) {
            return res.status(400).json({ "message": "Username is required." });
        }

        try {
            // Normalize end-of-line characters
            const recipeName = req.body.recipename.replace(/\r?\n/g, '\n');
            const ingredients = req.body.ingredients.replace(/\r?\n/g, '\n');
            const instructions = req.body.instructions.replace(/\r?\n/g, '\n');
            const tags = (req.body.tags || "").replace(/\r?\n/g, '\n');

            // The image is now in req.file if uploaded, otherwise undefined
            const image = req.file; 

            // Create the recipe
            const imageUrl = await createRecipeAction(req.params.username, recipeName, ingredients, instructions, tags, image);
            return res.status(200).json({ image : imageUrl});
        } catch (err) {
            return res.status(400).json({ "message": err.message });
        }
    });
};
const getAllRecipes = async (req,res) => {
    //verify username exists
    if(!req.params?.username) return res.status(400)
        .json({"message": "Username is required."});

    try {
        //fetch all the recipes
        const recipes = await getAllRecipesAction(req.params.username);
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
        await deleteRecipeAction(req.params.username, req.body.recipename);
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
        await updateRecipeAction(req.params.username, recipeName, ingredients, instructions, tags);
        
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
        const recipe = await getRecipeAction(req.params.username, req.params.recipename);
        return res.status(200).json({"recipe" : recipe});
    }
    catch(err) {
        return res.status(400).json({"message": err.message});
    }
}

module.exports = {createRecipe,deleteRecipe,updateRecipe,getAllRecipes,getRecipe};

