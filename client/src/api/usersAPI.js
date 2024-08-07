import axios from 'axios';

const URL = process.env.NODE_ENV === 'production' ? "https://recipe-book-api-3nma.onrender.com"
            : 'http://localhost:5000'

export const registerUser = async (userName, password, email) => {

    try {
        const res = await axios.post(`${URL}/register`,{username:userName, password: password, email: email}, {headers: {'Content-Type': 'application/json'},withCredentials: true});
    }
    catch (err) {
      return err;
    }
}

export const logoutUser = async () => {
    try {
        const res = await axios.get(`${URL}/logout`, {withCredentials: true});
        return res;
    }
    catch (err) {
        console.log(err);
    }
}

export const loginUser = async (userName, password) => {
    try {
        const res = await axios.post(`${URL}/login`, {username: userName, password: password}, {headers: {'Content-Type': 'application/json'},withCredentials: true});
        return res;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
}

export const updateUserInfo = async(userName, accessToken, newPassword, newEmail) => {
    try {
        const res = await axios.put(`${URL}/users`,
                    {username: userName, password: newPassword, email: newEmail}, 
                    {headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'}, withCredentials: true},
                    );
        return res;
    }
    catch (err){
        throw new Error(err.response.data.message);
    }
}

export const resetPass = async (email) => {
    try {
        const res = await axios.post(`${URL}/resetPass`, {
            email: email
        }, {headers: {'Content-Type': 'application/json'},withCredentials: true});
        return res;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
}

export const checkResetCode = async (code, email) =>{
    try{
        const res = await axios.post(`${URL}/resetPass/${email}`, {email : email ,code : code} ,{withCredentials: true});
                
        if(res) {
            const username = res.data.username;
            const accessToken = res.data.accessToken;
            localStorage.setItem('username',username);
            localStorage.setItem('accessToken',accessToken);
            return username;
        }
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
}