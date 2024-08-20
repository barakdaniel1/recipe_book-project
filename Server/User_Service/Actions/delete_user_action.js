const {deleteUserQuery} = require ('../Queries/user_queries');

const deleteUserAction = async(username) => {
    try {
        return await deleteUserQuery(username);
    } catch (err) {
        throw new Error("error in deleting a user.");
    }
    
}

module.exports = {deleteUserAction};