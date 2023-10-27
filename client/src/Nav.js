import { Link } from "react-router-dom";
import './Nav.css';

const Nav = ({userName}) => {
    const home = `/users/${userName}`;
    return (
        <nav className="nav">
            <ul>
                <li><Link to={home}>Home</Link></li>
                <li><Link to={home + '/update'}>Update Info</Link></li>
                <li><Link to={home + '/recipes'}>View Recipes</Link></li>
                <li><Link to={home + '/add_recipe'}>Add a Recipe</Link></li>
                <li><Link to ={home + '/logout'}>Logout!</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;