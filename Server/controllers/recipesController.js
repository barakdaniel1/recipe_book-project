const User = require('../model/User');
const {getUserByUserName_params} = require('./usefulFunctions');



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
        const foundUser = await getUserByUserName_params(req,res);
        if(!foundUser) return res.status(204).json({"message": "User not found"});
        
        //get the information.
        const recipeName = req.body.recipename.replace(/\r?\n/g, '\n');
        const ingredients = req.body.ingredients.replace(/\r?\n/g, '\n');
        const instructions = req.body.instructions.replace(/\r?\n/g, '\n');
        const tags = (req.body.tags || "").replace(/\r?\n/g, '\n');

        const newRecipe = {
            recipename: recipeName,
            ingredients: ingredients,
            instructions: instructions,
            tags: tags
        }

        //check if recipe already exists.
        const isExist = foundUser.recipes.filter((recipe) => recipe.recipename === recipeName);
        if(isExist.length > 0) return res.status(409)
                                .json({"message": "recipe name already exists."})
        
        
        //add the new recipe to the user's recipe list.
        foundUser.recipes.push(newRecipe);
        const result = await foundUser.save();
        res.json(result);
    }
    catch (err) {
        return res.status(400).json({"message": err.message});
    }
}

const getAllRecipes = async (req,res) => {
    if(!req.params?.username) return res.status(400)
        .json({"message": "Username is required."});
    try {
        const foundUser = await getUserByUserName_params(req,res);
        if(!foundUser) return res.status(204).json({"message": "User not found"});
        res.json(foundUser.recipes);
    }
    catch(err) {
        return res.status(400).json({"message": err.message});
    }
}

const deleteRecipe = async(req,res) => {
    if(!req.body?.recipename) return res.status(204)
                                .json({"message": "Recipe name is required"});
    if(!req.params?.username) return res.status(400)
                                .json({"message": "Username is required."});
    try {
        const foundUser = await getUserByUserName_params(req,res);
        if(!foundUser) return res.status(204).json({"message": "User not found"});
        
        const recipeName = req.body.recipename;
        
        foundUser.recipes = foundUser.recipes.filter((recipe) => recipe.recipename !== recipeName);
        
        const result = await foundUser.save();
        res.json(result);
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
        const updatedRecipe = await User.updateOne(
            {
                username : req.params.username,
                'recipes.recipename' : req.body.recipename
            },
            {
                $set: {
                    'recipes.$.ingredients' : req.body.ingredients,
                    'recipes.$.instructions' : req.body.instructions,
                    'recipes.$.tags' : req.body.tags
                }
            });
            
            res.json(updatedRecipe);
    }
    catch(err) {
        return res.status(400).json({"message": err.message});
    }
}

const getRecipe = async(req,res) =>{
    if(!req.params?.recipename) return res.status(403)
                                    .json({"message": "Recipe name is required"});

    if(!req.params?.username) return res.status(400)
                                    .json({"message": "Username is required."});
    try {
        const foundUser = await getUserByUserName_params(req,res);
        if(!foundUser) return res.status(204).json({"message": "User not found"});

        const recipeName = req.params.recipename;
        const recipe = foundUser.recipes.filter(
            (curr_recipe) => curr_recipe.recipename === recipeName);
        if(recipe.length === 0) return res.status(204).json({"message": "Recipe not found!"})
        res.json(recipe[0]);
    }
    catch(err) {
        return res.status(400).json({"message": err.message});
    }
}

module.exports = {createRecipe,deleteRecipe,updateRecipe,getAllRecipes,getRecipe};

