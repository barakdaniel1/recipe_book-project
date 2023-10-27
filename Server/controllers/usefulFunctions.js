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

module.exports = {getUserByUserName,getUserByUserName_params};