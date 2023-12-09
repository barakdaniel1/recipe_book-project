import { useState } from "react";
import './Recipes.css';
import SearchRecipe from "./SearchRecipe";
import RecipeLink from "./RecipeLink";


const Recipes = ({ recipes }) => {
    const [matchingRecipes, setMatchingRecipes] = useState(recipes);
    const [searchRecipe, setSearchRecipe] = useState('');
    const [isActiveSearch, setIsActiveSearch] = useState(false);
    const [searchCriteria,setSearchCriteria] = useState('recipename');
    const userName = localStorage.getItem('username');

    const filterRecipes = () => {
        setIsActiveSearch(!!searchRecipe); // Set isActiveSearch to true if there's a value in the textBox
        let newMatchingRecipes = [];
        if(searchCriteria === 'recipename')
            newMatchingRecipes = recipes.filter((recipe) =>
                 recipe.recipename.toLowerCase().includes(searchRecipe.toLowerCase()));
        else {
            const searchArgs = searchRecipe.split(',');
            console.log(searchArgs);
            if(searchCriteria === 'ingredients')
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
        <div className="recipes">
            <SearchRecipe
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
                searchRecipe={searchRecipe}
                setSearchRecipe={setSearchRecipe}
                filterRecipes={filterRecipes}
            />
            <div className="recipesGallery">
                {isActiveSearch && <RecipeLink recipes={matchingRecipes} userName={userName} />}
                {!isActiveSearch && <RecipeLink recipes={recipes} userName={userName} />}
            </div>
        </div>
    )
}

export default Recipes;
