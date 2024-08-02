const bcrypt = require("bcrypt");
const {getUserByUserName} = require ('../../queries/user_queries');

const updateUserService = async (username, password, email) => {
    try {
        const foundUser = await getUserByUserName(username);
        if(!foundUser) return res.status(400).json({"message": "User not found."});
        
        //update user information
        //if not blank!
        
        if(password)
            foundUser.password = await bcrypt.hash(password,10);
        if(email)
            foundUser.email = email;
        
        await foundUser.save();
    }
    catch(err) {
        throw new Error(err);
    }
}

module.exports = {updateUserService};