import {useEffect, useState} from 'react';
import './Home.css';
import { getRecipes } from './api/recipesAPI';

const Home = ({setRecipesAPP}) =>{
    const [errorMSG, setErrorMSG] = useState('');

    useEffect (()=>{
        const fetchRecipes = async () =>{
            try {
                const userName = localStorage.getItem('username');
                const accessToken = localStorage.getItem('accessToken');

                const res = await getRecipes(userName,accessToken);
                if(res) setRecipesAPP(res);
            } catch (err) {
                setErrorMSG(err.message);
            }
        }
        fetchRecipes();     
    },[]);
    
    return (
        <>
        
            
        </>
    )
}

export default Home;