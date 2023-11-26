import Button from './Button';
import Textbox from './Textbox';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';


const ForgotPassword = () => {
    const [email,setEmail] = useState('');
    const handleResetPassword = () => {

    }
    return (
        <div>
            <form onSubmit={handleResetPassword}>
            <label htmlFor="email">Email: </label>
            <Textbox id = 'email' type="text" placeholder="Email" varToChange={email} onChange={setEmail}/>
            <Button type="submit" text="Reset my passowrd!" />
            <label className="go-back-label">
                <Link to="/login">Go back!</Link>
            </label>
            </form>
        </div>
    )
}

export default ForgotPassword;