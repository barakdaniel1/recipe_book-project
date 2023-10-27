import axios from 'axios';

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
        console.log(err);
    }
}

export const updateUserInfo = async(userName, accessToken, newPassword) => {
    try {
        const res = await axios.put('http://localhost:5000/users',
                    {username: userName, password: newPassword}, 
                    {headers: {Authorization: `Bearer ${accessToken}`}});
        return res;
    }
    catch (err){
        console.log(err);
    }
}