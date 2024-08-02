const deleteUserQuery = require ('../../queries/user_queries');

const deleteUserService = async(username) => {
    try {
        return await deleteUserQuery(username);
    } catch (err) {
        throw new Error("error in deleting a user.");
    }
    
}

module.exports = {deleteUserService};