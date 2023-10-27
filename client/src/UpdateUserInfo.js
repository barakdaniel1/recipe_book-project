import Button from "./Button";
import Textbox from "./Textbox";
import { useState } from "react";
import { updateUserInfo } from "./api/usersAPI";

const UpdateUserInfo = ({userName, accessToken}) => {
    const [password,setPassword] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await updateUserInfo(userName,accessToken,password);
        if(res) {
            console.log("SUCCESSFULLY CHANGED PASSWORD!");
        }
        else console.log("ERROR CHANGING PASSWORD");
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
            <Button type = 'submit' 
                    text = 'update!'
            />
        </form>
    )
}

export default UpdateUserInfo;