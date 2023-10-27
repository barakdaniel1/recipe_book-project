import Button from "./Button";

const RecipeInfo = ({editMode, setEditmode, handleDelete, recipe}) =>{
    return (
            <div className="recipe">
                <label>Recipe name:</label><br/>
                <p>{recipe.recipename}</p>
                <label>Recipe ingredients:</label><br/>
                <p>{recipe.ingredients}</p><br/>
                <label>Recipe instructions:</label><br/>
                <p>{recipe.instructions}</p>
                <label>Recipe tags:</label><br/>
                <p>{recipe.tags}</p>
                <Button type= 'button' text ='Edit recipe' clickFunc={ () => setEditmode(!editMode)}/>
                <Button type= 'button' text = 'Delete recipe' clickFunc={ () => handleDelete()} />
            </div>
        );
}

export default RecipeInfo;