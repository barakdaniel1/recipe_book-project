import './Login.css';
import Button from './Button';
import Textbox from './Textbox';
import Error from './Error';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {loginUser} from './api/usersAPI';

const Login = () => {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [errorMSG,setErrorMSG] = useState('');
    let navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        
        try{
            const res = await loginUser(userName,password);
            setErrorMSG('');
            localStorage.setItem('username', userName);
            localStorage.setItem('accessToken',res.data.accessToken);
            localStorage.setItem('expires', res.data.expires);
            return navigate(`/users/${userName}`);
        }
        catch (err) {
            setErrorMSG(err.message);
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username: </label>
                <Textbox id="username" type="text" placeholder="Username" varToChange={userName} onChange={setUserName} /> <br />
                <label htmlFor="password">Password: </label>
                <Textbox id="password" type="password" placeholder="Password" varToChange={password} onChange={setPassword} />
                <Button type="submit" text="Login!" />
                {errorMSG && <Error msg = {errorMSG} />}
            </form>
            <label className="register-label">Forgot password ? </label>
            <label className="register-label">
                <Link to="/forgot-password">Click here</Link>
            </label>
            <label className="register-label">Not a registered user? </label>
            <label className="register-label">
                <Link to="/register">Register here</Link>
            </label>
            
        </div>
    );
}

export default Login;