import Button from "./Button";
import Textbox from "./Textbox";
import Success from "./Success";
import Error from "./Error";
import './UpdateUserInfo.css';
import { useState } from "react";
import { updateUserInfo } from "./api/usersAPI";

const UpdateUserInfo = () => {
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [successMSG,setSuccessMSG] = useState('');
    const [errorMSG,setErrorMSG] = useState('');
    const userName = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');
     
    const handleUpdate = async (e) => {
        e.preventDefault();
        try{
            const res = await updateUserInfo(userName,accessToken,password, email);
            setSuccessMSG("Info updated successfully!");
            setErrorMSG('');
        }
        catch (err) {
            setErrorMSG(err.message);
            setSuccessMSG('');
        }
       
    }

    return (
        <form onSubmit={handleUpdate}>
            <label htmlFor='updatePassword'>New password: </label>
            <Textbox id = 'updatePassword' 
                     type='password'
                     placeholder='New Password'
                     varToChange={password}
                     onChange={setPassword}
            /><br/>
            <label htmlFor='updateEmail'>New Email: </label>
            <Textbox id = 'updateEmail' 
                     type='text'
                     placeholder='New Email'
                     varToChange={email}
                     onChange={setEmail}
            /><br/>
            <Button type = 'submit' 
                    text = 'Update!'
            />
            {successMSG && <Success msg = {successMSG} />}
            {errorMSG && <Error msg = {errorMSG} />}
        </form>
    )
}

export default UpdateUserInfo;