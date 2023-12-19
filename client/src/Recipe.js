import { useParams, useNavigate } from "react-router-dom";
import { getRecipe, editRecipe, deleteRecipe } from "./api/recipesAPI";
import { useState, useEffect } from "react";
import './Recipe.css';
import RecipeInfo from "./RecipeInfo";
import EditRecipe from "./EditRecipe";
import Error from './Error';
import Success from './Success';

const Recipe = ({recipes ,setRecipes}) => {
    const {recipename} = useParams();
    const navigate = useNavigate();
    const fixed_recipe_name = recipename.replace(/_/g, ' ');
    const [recipe,setRecipe] = useState({});
    const [editMode,setEditmode] = useState(false);
    const [editedIngredients,setEditedIngredients] = useState('');
    const [editedInstructions,setEditedInstructions] = useState('');
    const [editedTags,setEditedTags] = useState('');
    const [errorMSG, setErrorMSG] = useState('');
    const [sucessMSG,setSuccessMSG] = useState('');
    const userName = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');
    
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
                setErrorMSG(err.message);
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
        
        try {
            const res = await editRecipe(userName,accessToken,editedRecipe);
            if(res) {
                setErrorMSG('');
                setSuccessMSG("Recipe updated successfully!");
                setRecipe(editedRecipe);
                setRecipes(recipes.map(
                            (recipe) =>     
                                recipe.recipename === editedRecipe.recipename ? 
                                    editedRecipe : recipe));
            }
        }
        catch (err) {
             setErrorMSG(err.message);
             setSuccessMSG('');
        }
    }

    const handleDelete = async () =>{
        try{
            const res = await deleteRecipe(userName,accessToken,recipe);
            if(res){
                setErrorMSG('');
                const newRecipes = recipes.filter((curr_recipe) => curr_recipe.recipename !== recipe.recipename);
                setRecipes(newRecipes);
                navigate(`/users/${userName}/recipes`);
            }
        }
        catch (err) {
            setErrorMSG(err.message)
        }
    }

    return (
        <div>
        {errorMSG && <Error msg = {errorMSG} />}
        {sucessMSG && <Success msg = {sucessMSG} />}
        {recipe && editMode ? 
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
                                />}
    </div>
    );
}

export default Recipe;