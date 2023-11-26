import Textbox from './Textbox';
import Button from './Button';
import { useState } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = ({setUserNameAPP,setAccessTokenAPP}) => {
    const [code,setCode] = useState('');
    const { email } = useParams();
    const navigate = useNavigate();

    const handleResetPassword = async (e) =>{
        e.preventDefault();

        try{
            const res = await axios.get(`http://localhost:5000/resetPass/${email}`);
            
            if(res) {
                const username = res.data.username;
                const resetCode = res.data.code;
                const accessToken = res.data.accessToken;

                if(code === resetCode.toString()){
                    setUserNameAPP(username);
                    setAccessTokenAPP(accessToken);
                    return navigate(`/users/${username}`);
                }
            }
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