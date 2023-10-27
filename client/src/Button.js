import './Button.css';

const Button = ({type, text, clickFunc}) => {
    if(type==='button') return (
        <button className='button' type='button' onClick={clickFunc}>{text}</button>
    )
    
    else return (
    <button className="button" type={type}>{text}</button>
    )
}

export default Button;