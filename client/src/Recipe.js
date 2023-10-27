import { useParams, useNavigate } from "react-router-dom";
import { getRecipe, editRecipe, deleteRecipe } from "./api/recipesAPI";
import { useState, useEffect } from "react";
import './Recipe.css';
import RecipeInfo from "./RecipeInfo";
import EditRecipe from "./EditRecipe";

const Recipe = ({userName, accessToken,recipes ,setRecipes}) => {
    const {recipename} = useParams();
    const navigate = useNavigate();
    const fixed_recipe_name = recipename.replace(/_/g, ' ');
    const [recipe,setRecipe] = useState({});
    const [editMode,setEditmode] = useState(false);
    const [editedIngredients,setEditedIngredients] = useState('');
    const [editedInstructions,setEditedInstructions] = useState('');
    const [editedTags,setEditedTags] = useState('');
    
    useEffect (()=>{
        const fetchRecipe = async () =>{
            try {
                const res = await getRecipe(userName,accessToken, fixed_recipe_name);
                if(res) {
                    setRecipe(res);
                    setEditedIngredients(res.ingredients);
                    setEditedInstructions(res.instructions);
                    setEditedTags(res.tags);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchRecipe();     
    },[]);

    const handleEditPost = async(e) => {
        e.preventDefault();

        const editedRecipe = {
            recipename: recipe.recipename,
            ingredients: editedIngredients,
            instructions: editedInstructions,
            tags: editedTags
        }
     
        const res = await editRecipe(userName,accessToken,editedRecipe);
        if(res) {
            setRecipe(editedRecipe);
            setRecipes(recipes.map(
                        (recipe) =>     
                            recipe.recipename === editedRecipe.recipename ? 
                                editedRecipe : recipe));
        }
        else console.log("ERROR EDITING RECIPE");
    }

    const handleDelete = async () =>{
        const res = await deleteRecipe(userName,accessToken,recipe);
        if(res){
            const newRecipes = recipes.filter((curr_recipe) => curr_recipe.recipename !== recipe.recipename);
            setRecipes(newRecipes);
            navigate(`/users/${userName}/recipes`);
        }
        else console.log("ERROR DELETING RECIPE");
    }

    return (
        recipe && editMode ? 
                                <EditRecipe editMode={editMode} 
                                            setEditmode = {setEditmode} 
                                            editedIngredients = {editedIngredients}
                                            setEditedIngredients = {setEditedIngredients}
                                            editedInstructions = {editedInstructions}
                                            setEditedInstructions = {setEditedInstructions}
                                            editedTags = {editedTags}
                                            setEditedTags = {setEditedTags}
                                            handleEditPost = {handleEditPost}
                                />
                            :

                                recipe && 
                                <RecipeInfo editMode={editMode} 
                                            setEditmode={setEditmode}
                                            handleDelete={handleDelete}
                                            recipe={recipe}
                                />
    );
}

export default Recipe;