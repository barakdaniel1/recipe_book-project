const User = require('../model/User');
const {getUserByUserName,getUserByUserName_params} = require('./usefulFunctions');
const {handleRegisterController} = require('./registerController');
const bcrypt = require('bcrypt');

const getAllUsers = async (req,res) => {
    const ret = await User.find();
    if(!ret) return res.status(204).json({"message": "No users found."}) // no content

    return res.status(200).json(ret);
}

const deleteUser = async(req,res) => {
    if(!req.body?.username) return res.status(400).json({"message": "username is required."}) // bad request
    try {
        const foundUser = await getUserByUserName(req,res);
        if(!foundUser) return res.status(400).json({"message": "User not found."})
        const deleted = await User.deleteOne({"username": foundUser.username});
        return res.status(200).json({"message": `username ${deleted.username} has been deleted successfully!`});
    } catch (err) {
        return res.status(400).json({"message": err});
    }
    
}

// USERNAME CANNOT BE UPDATED!
const updateUser = async(req,res) => {
    if(!req.body?.username) return res.status(400).json({"message": "username is required."}) // bad request
    
    try {
        const foundUser = await getUserByUserName(req,res);
        if(!foundUser) return res.status(400).json({"message": "User not found."});
        
        //update user information
        //if not blank!
        
        if(req.body.password)
            foundUser.password = await bcrypt.hash(req.body.password,10);
        if(req.body.email)
            foundUser.email = req.body.email;
        

        const result = await foundUser.save();
        return res.json(result);
    } catch (err) {
       console.log(err.message);
    }
}

const createUser = async(req,res) => {
    await handleRegisterController(req,res);
}

const getUser = async (req,res) => {
    if(!req.params?.username) return res.status(400).json({"message": "Username is required"});
    try{
        const foundUser = await getUserByUserName_params(userName);
        if(!foundUser) return res.status(204).json({"message": "Username doesn't exist"});
        return res.json(foundUser);
    }
    catch (err) {
        return res.status(400).json({"message": err.message})
    }
}

module.exports = {deleteUser,updateUser,getAllUsers,createUser,getUser};