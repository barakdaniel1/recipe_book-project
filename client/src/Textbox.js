import './Textbox.css'

const Textbox = ({id,type,placeholder,varToChange,onChange,isTextArea}) => {
    
    if(!isTextArea)
        return (
            <input 
            id = {id}
            type = {type} 
            className="textbox" 
            placeholder={placeholder} 
            value = {varToChange} 
            onChange={(e) => onChange(e.target.value)}
            />
        )
    else return (
        <textarea 
        id = {id}
        type = {type} 
        className="textbox" 
        placeholder={placeholder} 
        value = {varToChange} 
        onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default Textbox;