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

function App() {
  const [userNameAPP,setUserNameAPP] = useState('');
  const [accessTokenAPP,setAccessTokenAPP] = useState('');
  const [recipesAPP,setRecipesAPP] = useState('');

  return (

    <div className="app">
      <Header/>
      { userNameAPP && <Nav userName={userNameAPP}/>}
       <Routes>
        <Route index path = '/' element={<WelcomePage/>}/>
        <Route path='/login' element={<Login setUserNameAPP={setUserNameAPP} setAccessTokenAPP={setAccessTokenAPP}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot-password' element ={<ForgotPassword />}/>
        <Route path='/users/:username' element={<Home userName = {userNameAPP} accessToken = {accessTokenAPP} setRecipesAPP = {setRecipesAPP}/>}/>
        <Route path='/users/:username/recipes' element={<Recipes userName = {userNameAPP} recipes={recipesAPP} />}/>
        <Route path = '/users/:username/update' element={<UpdateUserInfo userName={userNameAPP} accessToken={accessTokenAPP}/>} />
        <Route path = 'users/:username/add_recipe' element={<AddRecipe userName={userNameAPP} accessToken={accessTokenAPP} recipes = {recipesAPP} setRecipes={setRecipesAPP}/>} />
        <Route path ='users/:username/recipes/:recipename' element = {<Recipe userName={userNameAPP} accessToken={accessTokenAPP} recipes = {recipesAPP} setRecipes={setRecipesAPP}/>} />
        <Route path = 'users/:username/logout' element={<Logout setUserNameAPP={setUserNameAPP} setAccessTokenAPP={setAccessTokenAPP}/>}/>
       </Routes>
    </div>

  );
}

export default App;
