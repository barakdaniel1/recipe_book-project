import axios from 'axios';

export const registerUser = async (userName, password, email) => {

    try {
        const res = await axios.post('http://localhost:5000/register',{username:userName, password: password, email: email});
    }
    catch (err) {
      return err;
    }
}

export const logoutUser = async () => {
    try {
        const res = await axios.get('http://localhost:5000/logout');
        return res;
    }
    catch (err) {
        console.log(err);
    }
}

export const loginUser = async (userName, password) => {
    try {
        const res = await axios.post('http://localhost:5000/login', {username: userName, password: password});
        return res;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
}

export const updateUserInfo = async(userName, accessToken, newPassword, newEmail) => {
    try {
        const res = await axios.put('http://localhost:5000/users',
                    {username: userName, password: newPassword, email: newEmail}, 
                    {headers: {Authorization: `Bearer ${accessToken}`}});
        return res;
    }
    catch (err){
        throw new Error(err.response.data.message);
    }
}