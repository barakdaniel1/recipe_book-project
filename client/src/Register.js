import './Register.css';
import Button from './Button';
import Textbox from './Textbox';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {

  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post('http://localhost:5000/register',{username:userName, password: password, email: email});
        console.log(res.data);
    }
    catch (err) {
      console.log(err);
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
      </form><br/>
      <div>Already have an account ? <Link to="/login">LOGIN!</Link></div>
    </div>
  );
}

export default Register;
