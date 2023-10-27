import Textbox from "./Textbox";
import Button from "./Button";
import DropList from "./DropList";

const SearchRecipe = ({searchCritiria, setSearchCritiria, searchRecipe, 
                        setSearchRecipe, filterRecipes}) => {
    return (
        <div className="searchDiv">
                <label>Search recipe by: </label>
                <DropList value = {searchCritiria} onChange={setSearchCritiria}/>
                <Textbox type='text'
                    placeholder='Recipe Name / Ingredients / Tags'
                    varToChange={searchRecipe}
                    onChange={setSearchRecipe}
                    isTextArea={false} />
                <span className="parent">
                    <Button type = 'button' text = 'Search!' clickFunc={filterRecipes}/>
                </span>
                {
                    (searchCritiria === 'ingredients' || searchCritiria === 'tags') && 
                        <div className="toggleDiv">** To look for multiple ingredients / tags, seperate by ,**</div>
                }
            </div>
    )
    
}

export default SearchRecipe;