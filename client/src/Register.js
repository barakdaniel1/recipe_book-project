import './Register.css';
import Button from './Button';
import Textbox from './Textbox';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from './api/usersAPI';
import Success from './Success';
import Error from './Error';

const Register = () => {

  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [successMSG, setSuccessMSG] = useState('');
  const [errorMSG, setErrorMSG] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await registerUser(userName, password, email);
  
    if (res){
      setErrorMSG(res.response.data.message);
      setSuccessMSG('');
    }
    else {
      setSuccessMSG("User created successfully! Please login now.");
      setErrorMSG('');
    } 
  }

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleRegister}>
        <label htmlFor='username'>Username: </label>
        <Textbox id = 'username' type="text" placeholder="Username" varToChange={userName} onChange={setUserName}/><br/>
        <label htmlFor='password'>Password: </label>
        <Textbox id = 'password' type="password" placeholder="Password" varToChange={password} onChange={setPassword}/><br/>
        <label htmlFor="email">Email: </label>
        <Textbox id = 'email' type="text" placeholder="Email" varToChange={email} onChange={setEmail}/>
        <Button type="submit" text="Register!" />
        {successMSG && <Success msg = {successMSG} />}
        {errorMSG && <Error msg={errorMSG} /> }
      </form><br/>
      <div>Already have an account ? <Link to="/login">LOGIN!</Link></div>
    </div>
  );
}

export default Register;
