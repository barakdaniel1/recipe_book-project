import { Link } from "react-router-dom";
import { useState } from "react";
import Textbox from './Textbox';
import DropList from "./DropList";
import Button from './Button';
import './Recipes.css';
import SearchRecipe from "./SearchRecipe";
import RecipeLink from "./RecipeLink";


const Recipes = ({ userName, recipes }) => {
    const [matchingRecipes, setMatchingRecipes] = useState(recipes);
    const [searchRecipe, setSearchRecipe] = useState('');
    const [isActiveSearch, setIsActiveSearch] = useState(false);
    const [searchCritiria,setSearchCritiria] = useState('recipename');

    const filterRecipes = () => {
        setIsActiveSearch(!!searchRecipe); // Set isActiveSearch to true if there's a value in the textBox
        let newMatchingRecipes = [];
        console.log(recipes);
        if(searchCritiria === 'recipename')
            newMatchingRecipes = recipes.filter((recipe) =>
                 recipe.recipename.toLowerCase().includes(searchRecipe.toLowerCase()));
        else {
            const searchArgs = searchRecipe.split(',');
            console.log(searchArgs);
            if(searchCritiria === 'ingredients')
                newMatchingRecipes = 
                    recipes.filter( (recipe) => 
                        searchArgs.filter( ( searchArg) => recipe.ingredients.toLowerCase().includes(searchArg.toLowerCase())).length === searchArgs.length);
            else 
                newMatchingRecipes = 
                    recipes.filter( (recipe) => 
                        searchArgs.filter( ( searchArg) => recipe.tags.toLowerCase().includes(searchArg.toLowerCase())).length === searchArgs.length);
           
        }
        
        setMatchingRecipes(newMatchingRecipes);
    }

    return (
        <>
            <SearchRecipe searchCritiria = {searchCritiria} 
                          setSearchCritiria = {setSearchCritiria}
                          searchRecipe = {searchRecipe} 
                          setSearchRecipe = {setSearchRecipe}
                          filterRecipes = {filterRecipes}
            />
            <div className="recipesGallery">
                {
                    isActiveSearch && <RecipeLink recipes={matchingRecipes} userName={userName}/>
                }
                {
                    !isActiveSearch && <RecipeLink recipes={recipes} userName={userName}/>
                }
            </div>
        </>
    )
}

export default Recipes;
