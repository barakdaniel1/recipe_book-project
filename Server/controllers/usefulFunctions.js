const User = require ('../model/User');

const getUserByUserName = async (req,res) => {
    const userName = req.body.username;
    const foundUser = await User.findOne({"username" : userName}).exec();
    return foundUser;
}

const getUserByUserName_params = async (req,res) => {
    const userName = req.params.username;
    const foundUser = await User.findOne({"username" : userName}).exec();
    return foundUser;
}

const getUserByEmail = async (email) => {
    const foundUser = await User.findOne({"email" : email}).exec();
    return foundUser;
}

const randomResetCode = () => {
    const min = 100000; // Minimum value (inclusive)
    const max = 999999; // Maximum value (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
module.exports = {getUserByUserName,getUserByUserName_params,getUserByEmail,randomResetCode};