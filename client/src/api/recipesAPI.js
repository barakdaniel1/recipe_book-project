import axios from "axios";

const URL = process.env.NODE_ENV === 'production' ? "https://recipe_book-api.onredner.com"
            : 'http://localhost:5000'


export const getRecipes = async (userName,accessToken) => {
    try{
        const res = await axios.get(`${URL}/users/${userName}/recipes`,
        {headers: {Authorization: `Bearer ${accessToken}`}});
        return res.data;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
}

export const addRecipe = async (userName, accessToken, recipe) => {
    try{
    const res = await axios.post(`${URL}/users/${userName}/recipes`,recipe
                        ,{headers:{Authorization: `Bearer ${accessToken}`}});
        return res;
    } catch (err){
        throw new Error(err.response.data.message);
    }
            
}

export const getRecipe = async (userName, accessToken, recipename) => {
    try {
        const res = await axios.get(`${URL}/users/${userName}/recipes/${recipename}`,
                                        {headers:{Authorization: `Bearer ${accessToken}`}});
        return res.data;
    }
    catch (err){
        throw new Error(err.response.data.message);
    }
}

export const editRecipe = async (userName, accessToken, editedRecipe) => {
    try{
        const res = await axios.put(`${URL}/users/${userName}/recipes`,
                                        editedRecipe,
                                         {headers: {Authorization: `Bearer ${accessToken}`}});
        return res.data;        
    } catch (err) {
        throw new Error(err.response.data.message);
    }
}

export const deleteRecipe = async (userName,accessToken,recipe_to_delete) => {
 
    try{
       const res = await axios.delete(`${URL}/users/${userName}/recipes`,
       {headers: {Authorization: `Bearer ${accessToken}`},data: {recipename:recipe_to_delete.recipename}});
        return res.data;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
}


