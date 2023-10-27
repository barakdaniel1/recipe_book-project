import { Link } from 'react-router-dom';
import './WelcomePage.css'

const Home = () => {
    return (
        <div className='welcomePage'>
            <p>This web application is all about recipes!<br/>
                Time to get rid of all the old books and folders with those coffee stains,<br/>
                join us for maximum comfort.<br/>
                If you don't have an account yet, please click <Link to = "/register">here</Link> in order to create an account.<br/><br/>
                Already have an account ? <Link to='/login'>LOGIN!</Link>
            </p>
           
        </div>
    )
}

export default Home;