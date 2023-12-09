import { logoutUser } from "./api/usersAPI";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        logOut();
        navigate('/');
    })


    const logOut = async() =>{
        localStorage.clear();
        await logoutUser();
    }

}

export default Logout;