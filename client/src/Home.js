import {useEffect} from 'react';
import './Home.css';
import { getRecipes } from './api/recipesAPI';

const Home = ({setRecipesAPP}) =>{
    
    useEffect (()=>{
        const fetchRecipes = async () =>{
            try {
                const userName = localStorage.getItem('username');
                const accessToken = localStorage.getItem('accessToken');

                const res = await getRecipes(userName,accessToken);
                if(res) setRecipesAPP(res);
            } catch (err) {
                console.log(err);
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