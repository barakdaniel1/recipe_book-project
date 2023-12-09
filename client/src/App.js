import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import Recipes from './Recipes';
import Recipe from './Recipe';
import Register from './Register';
import WelcomePage from './WelcomePage';
import Logout from './Logout';
import { useState } from 'react';
import {Route, Routes } from 'react-router-dom';
import UpdateUserInfo from './UpdateUserInfo';
import AddRecipe from './AddRecipe';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

function App() {
  
  const [recipesAPP,setRecipesAPP] = useState('');

  return (

    <div className="app">
      <Header/>
      { localStorage.getItem('username') && <Nav userName={localStorage.getItem('username')}/>}
       <Routes>
        <Route index path = '/' element={<WelcomePage/>}/>
        <Route path = '/login' element={<Login />}/>
        <Route path = '/register' element={<Register/>}/>
        <Route path = '/forgot-password' element ={<ForgotPassword />}/>
        <Route path = '/resetPassword/:email' element ={<ResetPassword />}/>
        <Route path = '/users/:username' element={<Home setRecipesAPP = {setRecipesAPP}/>}/>
        <Route path = '/users/:username/recipes' element={<Recipes recipes={recipesAPP} />}/>
        <Route path = '/users/:username/update' element={<UpdateUserInfo />} />
        <Route path = '/users/:username/add_recipe' element={<AddRecipe recipes = {recipesAPP} setRecipes={setRecipesAPP}/>} />
        <Route path = '/users/:username/recipes/:recipename' element = {<Recipe recipes = {recipesAPP} setRecipes={setRecipesAPP}/>} />
        <Route path = '/users/:username/logout' element={<Logout />}/>
       </Routes>
    </div>

  );
}

export default App;
