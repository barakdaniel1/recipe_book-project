import './DropList.css';

const DropList = ({value, onChange}) => {
    
    return (
        <select value = {value} onChange={(e) => onChange(e.target.value)}>
            <option value='recipename'>Name</option>
            <option value='ingredients'>Ingredients</option>
            <option value='tags'>Tags</option>
        </select>
    )
}

export default DropList;