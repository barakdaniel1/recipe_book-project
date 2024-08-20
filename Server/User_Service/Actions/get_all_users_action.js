const {getAllUsersQuery} = require('../Queries/user_queries');

const getAllUsersAction = async () => {
    const ret = await getAllUsersQuery();
    if(!ret) throw new Error("No users found.");

    return ret;
}

module.exports = {getAllUsersAction};