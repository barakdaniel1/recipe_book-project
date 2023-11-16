// WelcomePage.jsx

import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className='welcomePage'>
      <div className='content'>
      <h1>Welcome to Recipe Central</h1>
        <p>
          Discover, create, and share your favorite recipes with the world. Say goodbye to old recipe books
          and hello to a new era of cooking innovation.
        </p>
        <div className='cta'>
          <Link to="/register" className='ctaButton'>Create an Account</Link>
          <span className='ctaText'>Already have an account? <Link to='/login'>Login</Link></span>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
