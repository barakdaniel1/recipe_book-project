import Textbox from './Textbox';
import Button from './Button';
import Error from './Error';
import { useState } from 'react';
import { addRecipe } from './api/recipesAPI';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css';

const AddRecipe = ({recipes,setRecipes}) => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');

    const handleAddRecipe = async (e) => {
        e.preventDefault();
        
        // Create a FormData object to send as multipart/form-data
        const formData = new FormData();
        formData.append('recipename', recipeName.replace(/\r?\n/g, '\n'));
        formData.append('ingredients', ingredients.replace(/\r?\n/g, '\n'));
        formData.append('instructions', instructions.replace(/\r?\n/g, '\n'));
        formData.append('tags', tags.replace(/\r?\n/g, '\n'));
        
          // Append the image only if it's provided
        if (image) {
            formData.append('image', image);
        }
        try {
            const res = await addRecipe(userName, accessToken, formData);
            if (res) {
                setErrorMSG('');
                const newRecipes = [...recipes, {
                    recipename: recipeName, 
                    ingredients, 
                    instructions, 
                    tags, 
                    image: res.data.image || '' // Use the image URL if available, otherwise an empty string
                }];
                setRecipes(newRecipes);
                navigate(`/users/${userName}/recipes`);
            }
        } catch (err) {
            setErrorMSG(err.message);
        } 
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Save the file directly
        }
    }

    const [recipeName,setRecipeName] = useState('');
    const [ingredients,setIngredients] = useState('');
    const [instructions,setInstructions] = useState('');
    const [tags,setTags] = useState('');
    const [image,setImage] = useState('');
    const [errorMSG,setErrorMSG] = useState('');

    return (
        <div className='addRecipe'>
            <form onSubmit={handleAddRecipe}>
                <label htmlFor='recipeName'>Recipe Name: </label>
                <Textbox
                    id='recipeName'
                    type='text'
                    placeholder='Recipe Name'
                    varToChange={recipeName}
                    onChange={setRecipeName}
                    isTextArea={true}
                /><br />
                <label htmlFor='ingredients'>Ingredients: </label>
                <Textbox
                    id='ingredients'
                    type='text'
                    placeholder='Ingredients'
                    varToChange={ingredients}
                    onChange={setIngredients}
                    isTextArea={true}
                /><br />
                <label htmlFor='instructions'>Instructions: </label>
                <Textbox
                    id='instructions'
                    type='text'
                    placeholder='Instructions'
                    varToChange={instructions}
                    onChange={setInstructions}
                    isTextArea={true}
                /><br />
                <label htmlFor='tags'>Tags: </label>
                <Textbox
                    id='tags'
                    type='text'
                    placeholder='Tags'
                    varToChange={tags}
                    onChange={setTags}
                    isTextArea={true}
                /><br />
                <label htmlFor='recipeImage'>Image: </label>
                <input
                    id='recipeImage'
                    type='file'
                    accept='image/*' // Allow only image files
                    onChange={(e) => handleImage(e)} // Update the image state when a file is selected
                /><br />
                <Button
                    type='submit'
                    text='Add Recipe!'
                />
                {errorMSG && <Error msg = {errorMSG} />}
            </form>
        </div>
    )
}

export default AddRecipe;