import { Link } from "react-router-dom";

const RecipeLink = ({recipes}) =>{
    const userName = localStorage.getItem('username');
    
    return (
        recipes.length > 0 && recipes.map((recipe, index) => {
            const fixed_recipe_name = recipe.recipename.replace(/ /g, '_');
            return <Link key={index}
                to={`/users/${userName}/recipes/${fixed_recipe_name}`} className="recipeLink">
                {recipe.recipename}</Link>
        })
    )
}

export default RecipeLink;