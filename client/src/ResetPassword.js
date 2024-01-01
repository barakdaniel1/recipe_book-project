import Textbox from './Textbox';
import Button from './Button';
import { useState } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import { checkResetCode } from './api/usersAPI';

const ResetPassword = () => {
    const [code,setCode] = useState('');
    const { email } = useParams();
    const navigate = useNavigate();

    const handleResetPassword = async (e) =>{
        e.preventDefault();

        try{
            const username = await checkResetCode(code, email);
            return navigate(`/users/${username}`);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleResetPassword}>
            <label htmlFor="code">Code: </label>
            <Textbox id = 'code' type="text" placeholder="Code" varToChange={code} onChange={setCode}/>
            <Button type="submit" text="Confirm code!" />
            </form>
        </div>
    );
}

export default ResetPassword;