import { Link } from "react-router-dom";
import { logoutUser } from "./api/usersAPI";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = ({setUserNameAPP,setAccessTokenAPP}) => {
    const navigate = useNavigate();

    useEffect(()=>{
        logOut();
        navigate('/');
    })


    const logOut = async() =>{
        setAccessTokenAPP('');
        setUserNameAPP('');
        await logoutUser();
    }

}

export default Logout;