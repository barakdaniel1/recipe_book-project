import Textbox from "./Textbox";
import Button from "./Button";

const EditRecipe = ({editMode, setEditmode, editedIngredients, setEditedIngredients,
                        editedInstructions, setEditedInstructions, editedTags,setEditedTags,
                            handleEditPost}) => {

    return(
        <div className="recipe">
            <form onSubmit={handleEditPost}>
                <label htmlFor="ingredients">Recipe ingredients:</label><br/>
                <Textbox id = "ingredients"
                        type = "text"
                        placeholder=""
                        varToChange={editedIngredients}
                        onChange={setEditedIngredients}
                        isTextArea={true}/><br/>
                <label htmlFor="instructions">Recipe instructions:</label><br/>
                <Textbox id = "instructions"
                        type = "text"
                        placeholder=""
                        varToChange={editedInstructions}
                        onChange={setEditedInstructions}
                        isTextArea={true}/><br/>
                <label htmlFor="tags">Recipe Tags:</label><br/>
                <Textbox id = "tags"
                        type = "text"
                        placeholder=""
                        varToChange={editedTags}
                        onChange={setEditedTags}
                        isTextArea={true}/><br/>
                <Button type = "submit" text="Apply!"/><br/>
                <Button type= 'button' text ='Cancel' clickFunc={ () => setEditmode(!editMode)}/>
            </form>
            
        </div> 
    )
}

export default EditRecipe;