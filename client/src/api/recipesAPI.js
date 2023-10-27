import axios from "axios";

export const getRecipes = async (userName,accessToken) => {
    try{
        const res = await axios.get(`http://localhost:5000/users/${userName}/recipes`,
        {headers: {Authorization: `Bearer ${accessToken}`}});
        return res.data;
    }
    catch (err) {
        console.log(err)
    }
}

export const addRecipe = async (userName, accessToken, recipe) => {
    try{
    const res = await axios.post(`http://localhost:5000/users/${userName}/recipes`,recipe
                        ,{headers:{Authorization: `Bearer ${accessToken}`}});
        return res;
    } catch (err){
        console.log(err);
    }
            
}

export const getRecipe = async (userName, accessToken, recipename) => {
    try {
        const res = await axios.get(`http://localhost:5000/users/${userName}/recipes/${recipename}`,
                                        {headers:{Authorization: `Bearer ${accessToken}`}});
        return res.data;
    }
    catch (err){
        console.log(err);
    }
}

export const editRecipe = async (userName, accessToken, editedRecipe) => {
    try{
        const res = await axios.put(`http://localhost:5000/users/${userName}/recipes`,
                                        editedRecipe,
                                         {headers: {Authorization: `Bearer ${accessToken}`}});
        return res.data;        
    } catch (err) {
        console.log(err);
    }
}

export const deleteRecipe = async (userName,accessToken,recipe_to_delete) => {
 
    try{
       const res = await axios.delete(`http://localhost:5000/users/${userName}/recipes`,
       {headers: {Authorization: `Bearer ${accessToken}`},data: {recipename:recipe_to_delete.recipename}});
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}


