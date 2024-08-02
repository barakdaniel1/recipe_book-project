const User = require('../model/User');

//get the user document from DB
const getUserByUserName = async (username) => {
    const userName = username;
    const foundUser = await User.findOne({"username" : userName}).exec();
    return foundUser;
}

//get all users from DB
const getAllUsersQuery = async () => {
    return await User.find();
}

//delete a user
const deleteUserQuery = async (username) => {
    const deleted = await User.deleteOne({"username": username});
    return deleted;
}

//create a user
const createUserQuery = async (username, password, email) => {
    const result = await User.create({username: username, password: password, email: email});
    return result;
}

//get the user by refresh token
const getUserByRefreshToken = async (refreshToken) => {
    const foundUser = await User.findOne({refreshToken : refreshToken});
    return foundUser;
}

//get the user by email
const getUserByEmail = async (email) => {
    const foundUser = await User.findOne({"email" : email}).exec();
    return foundUser;
}

//get the user by the username shown in the URL
const getUserByUserName_params = async (req,res) => {
    const userName = req.params.username;
    const foundUser = await User.findOne({"username" : userName}).exec();
    return foundUser;
}

module.exports = {getAllUsersQuery, deleteUserQuery, getUserByEmail, getUserByUserName_params,
                    getUserByUserName, createUserQuery, getUserByRefreshToken};