import Button from "./Button";
import "./RecipeInfo.css";

const RecipeInfo = ({ editMode, setEditmode, handleDelete, recipe }) => {
    const imageUrl = recipe.image;
    console.log(imageUrl);

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

                {imageUrl && <img src={imageUrl} alt="Recipe" className="recipe-image" />}
            </div>

            <div className="recipe-buttons">
                <Button type="button" text="Edit Recipe" clickFunc={() => setEditmode(!editMode)} />
                <Button type="button" text="Delete Recipe" clickFunc={() => handleDelete()} />
            </div>
        </div>
    );
}

export default RecipeInfo;
