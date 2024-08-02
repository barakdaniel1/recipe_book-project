const {getAllUsersQuery} = require('../../queries/user_queries');

const getAllUsersService = async () => {
    const ret = await getAllUsersQuery();
    if(!ret) throw new Error("No users found.");

    return ret;
}

module.exports = {getAllUsersService};