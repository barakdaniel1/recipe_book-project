import Textbox from './Textbox';
import Button from './Button';
import { useState } from 'react';
import { addRecipe } from './api/recipesAPI';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css';

const AddRecipe = ({userName, accessToken,recipes,setRecipes}) => {
    const navigate = useNavigate();

    const handleAddRecipe = async (e) => {
        e.preventDefault();
        
        const recipe = {
            recipename: recipeName.replace(/\r?\n/g, '\n'), // Normalize line breaks
            ingredients: ingredients.replace(/\r?\n/g, '\n'),
            instructions: instructions.replace(/\r?\n/g, '\n'),
            tags: tags.replace(/\r?\n/g, '\n')
          };
        
        const res = await addRecipe(userName,accessToken,recipe);
        if(res){
            const newRecipes = [...recipes,recipe];
            setRecipes(newRecipes);
            navigate(`/users/${userName}/recipes`);
        }
        else console.log("ERROR ADDING RECIPE!");
    }

    const [recipeName,setRecipeName] = useState('');
    const [ingredients,setIngredients] = useState('');
    const [instructions,setInstructions] = useState('');
    const [tags,setTags] = useState('');

    return (
        <div className='addRecipe'>
            <form onSubmit={handleAddRecipe}>
                <label htmlFor='recipeName'>Recipe Name: </label>
                <Textbox id='recipeName' 
                        type='text' 
                        placeholder='Recipe Name'
                        varToChange={recipeName}
                        onChange={setRecipeName}
                        isTextArea={true}
                /><br/>
                <label htmlFor='ingredients'>Ingredients: </label>
                <Textbox id='ingredients' 
                        type='text' 
                        placeholder='Ingredients'
                        varToChange={ingredients}
                        onChange={setIngredients}
                        isTextArea={true}
                /><br/>
                <label htmlFor='instructions'>Instructions: </label>
                <Textbox id='instructions' 
                        type='text' 
                        placeholder='Instructions'
                        varToChange={instructions}
                        onChange={setInstructions}
                        isTextArea={true}
                /><br/>
                <label htmlFor='tags'>Tags: </label>
                <Textbox id='tags' 
                        type='text' 
                        placeholder='Tags'
                        varToChange={tags}
                        onChange={setTags}
                        isTextArea={true}
                /><br/>
                <Button type = 'submit'
                        text = 'Add Recipe!'
                />
            </form>
        </div>
    )
}

export default AddRecipe;