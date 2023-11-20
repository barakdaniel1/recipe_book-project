import Button from "./Button";
import "./RecipeInfo.css"; // Import your CSS file

const RecipeInfo = ({ editMode, setEditmode, handleDelete, recipe }) => {
    const base64Image = recipe.image;

    return (
        <div className="recipe-container">
            <div className="recipe-details">
                <h2>{recipe.recipename}</h2>

                <div className="recipe-section">
                    <label>Ingredients:</label>
                    <p>{recipe.ingredients}</p>
                </div>

                <div className="recipe-section">
                    <label>Instructions:</label>
                    <p>{recipe.instructions}</p>
                </div>

                <div className="recipe-section">
                    <label>Tags:</label>
                    <p>{recipe.tags}</p>
                </div>

                {base64Image && <img src={base64Image} alt="Recipe" className="recipe-image" />}
            </div>

            <div className="recipe-buttons">
                <Button type="button" text="Edit Recipe" clickFunc={() => setEditmode(!editMode)} />
                <Button type="button" text="Delete Recipe" clickFunc={() => handleDelete()} />
            </div>
        </div>
    );
}

export default RecipeInfo;
