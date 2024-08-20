const bcrypt = require('bcrypt');
const {getUserByUserName, createUserQuery} = require ('../Queries/user_queries');

const registerUserAction = async (username, password, email) => {
    //look for duplicates
    const foundUser = await getUserByUserName(username);
    if(foundUser) throw new Error("user already exists!");

    //we didn't find, so now we add to the database.
    try {
        const hashedPwd = await bcrypt.hash(password,10);
        const createdUser = await createUserQuery(username, hashedPwd, email);
        return createdUser;
    }
    catch(err){
        throw new Error(err);
    }
}

module.exports = {registerUserAction};