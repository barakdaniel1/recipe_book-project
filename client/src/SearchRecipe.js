import Textbox from "./Textbox";
import Button from "./Button";
import DropList from "./DropList";

const SearchRecipe = ({searchCriteria, setSearchCriteria, searchRecipe, 
                        setSearchRecipe, filterRecipes}) => {
    return (
        <div className="searchDiv">
                <label>Search recipe by: </label>
                <DropList value = {searchCriteria} onChange={setSearchCriteria}/>
                <Textbox type='text'
                    placeholder='Recipe Name / Ingredients / Tags'
                    varToChange={searchRecipe}
                    onChange={setSearchRecipe}
                    isTextArea={false} />
                <span className="parent">
                    <Button type = 'button' text = 'Search!' clickFunc={filterRecipes}/>
                </span>
                {
                    (searchCriteria === 'ingredients' || searchCriteria === 'tags') && 
                        <div className="toggleDiv">** To look for multiple ingredients / tags, seperate by ,**</div>
                }
            </div>
    )
    
}

export default SearchRecipe;