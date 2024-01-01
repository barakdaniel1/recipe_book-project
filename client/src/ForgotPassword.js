import Button from './Button';
import Textbox from './Textbox';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import { resetPass } from './api/usersAPI';

const ForgotPassword = () => {
    const [email,setEmail] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const res = await resetPass(email);
            return navigate(`/resetPassword/${email}`);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleResetPassword}>
            <p className='info'>Type your Email to get a code.</p>
            <p className='info'>Please update your password after putting the code you got in email.</p>
            <label htmlFor="email">Email: </label>
            <Textbox id = 'email' type="text" placeholder="Email" varToChange={email} onChange={setEmail}/>
            <Button type="submit" text="Login!" />
            <label className="go-back-label">
                <Link to="/login">Go back!</Link>
            </label>
            </form>
        </div>
    )
}

export default ForgotPassword;