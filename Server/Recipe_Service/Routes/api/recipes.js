const express = require('express');
const router = express.Router({mergeParams: true});
const recipesController = require('../../Controllers/recipes_Controller');

router.route('/')
    .get(recipesController.getAllRecipes)
    .post(recipesController.createRecipe)
    .put(recipesController.updateRecipe)
    .delete(recipesController.deleteRecipe);

router.route('/:recipename').get(recipesController.getRecipe);

module.exports = router;