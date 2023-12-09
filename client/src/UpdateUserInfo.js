import Button from "./Button";
import Textbox from "./Textbox";
import './UpdateUserInfo.css';
import { useState } from "react";
import { updateUserInfo } from "./api/usersAPI";

const UpdateUserInfo = () => {
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const userName = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');
     
    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await updateUserInfo(userName,accessToken,password, email);
        if(res) {
            console.log("SUCCESSFULLY CHANGED INFO!");
        }
        else console.log("ERROR CHANGING INFO");
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
                    text = 'update!'
            />
        </form>
    )
}

export default UpdateUserInfo;