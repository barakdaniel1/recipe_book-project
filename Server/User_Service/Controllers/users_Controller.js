const {registerUserAction} = require ('../Actions/register_action');
const {getAllUsersAction} = require ('../Actions/get_all_users_action');
const {deleteUserAction} = require ('../Actions/delete_user_action');
const {updateUserAction} = require ('../Actions/update_user_action');
const {loginAction} = require ('../Actions/login_action');
const {logoutAction} = require ('../Actions/logout_action');
const {refreshTokenAction} = require ('../Actions/refresh_token_action');
const {resetPassword, verifyCode} = require('../Actions/reset_pass_action')

const getAllUsers = async (req,res) => {
    try {
        const users = await getAllUsersAction();
        return res.status(200).json(users);
    }
    catch (err) {
        return res.status(400).json(err);
    }
}

const deleteUser = async(req,res) => {
    if(!req.body?.username) return res.status(400).json({"message": "username is required."}) // bad request
    
    try {
        const isDeleted = await deleteUserAction(req.body.username);
        if(isDeleted) 
            return res.status(200).json({"message" : "user deleted successfully!"})
        else return res.status(400).json({"message" : "user wasn't deleted"});
    }
    catch(err) {
        return res.status(400).json(err);
    }
    
}

// USERNAME CANNOT BE UPDATED!
const updateUser = async(req,res) => {
    if(!req.body?.username) return res.status(400).json({"message": "username is required."}) // bad request

    try{
        await updateUserAction(req.body.username, req.body.password, req.body.email);
        return res.status(200).json({"message" : "user updated successfully!"});
    }
    catch (err) {
       return res.status(400).json({"message" : err});
    }
}

const registerUser = async(req,res) => {
    const userName = req.body.username;
    const pwd = req.body.password;
    const email = req.body.email;
    
    //validate the parameters.
    if (!userName || !pwd || !email) return res.status(400).json(
        { 'message': 'Username, password and email are required.' }
    );

    try{
        await registerUserAction(userName, pwd, email);
        return res.status(200).json({"message" : "user created successfully!"});
    }
    catch(err){
        return res.status(400).json({"message" : err});
    }
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

const login = async (req,res) => {
    const userName = req.body.username;
    const pwd = req.body.password;
    
    if(!userName || !pwd) return res.status(401).json({'message':'Username and password are required'});

    try{
        const { roles, accessToken, expires, refreshToken} = await loginAction(userName,pwd);
        //create a cookie containing the new access token.
        res.cookie('jwt',accessToken,{httpOnly: true, maxAge: 15 * 60 * 1000, sameSite: 'None',secure: true});

        //create a cookie containing the refresh token.
        res.cookie('jwt',refreshToken,{httpOnly: true, maxAge: 15 * 60 * 1000, sameSite: 'None',secure: true});

        //sending information through json message, for some reason cookies arent shown in the frontend.
        //i know it's not ideal because of security.
        return res.status(200).json({"accessToken" : accessToken, "expires" : expires});
    }
    catch (err) {
        return res.status(400).json({"message" : err.message});
    }
}

const logout = async (req,res) => {
    //All the cookies of a user.
    const cookies = req.cookies; 
    
    //Look for jwt cookie, as this cookie contains info about the user.
    if(!cookies?.jwt || !cookies?.accessToken) return res.sendStatus(204); //No content.
    try{
        await logoutAction(cookies.refreshToken);

        //clear the cookies
        res.clearCookie('jwt', {httpOnly: true,secure: true, sameSite: 'None'});
        res.clearCookie('accessToken', {httpOnly: true, secure : true, sameSite : 'None'});

        return res.status(200).json({"message" : "user logged out"});
        
    }
    catch(err) {
        return res.status(400).json({"message" : err});
    }
}

const handleRefreshToken = async (req, res) => {
    if(!cookies?.refreshToken) return res.status(400).json({"message" : "refresh token is missing!"});

    try{
        const accessToken = await refreshTokenAction(cookies.refreshToken);
        //create a cookie containing the new access token.
        res.cookie('jwt',accessToken,{httpOnly: true, maxAge: 15 * 60 * 1000, sameSite: 'None',secure: true}); 
        return res.status(200).json({"message" : "sent a new access token"});  
    }
    catch(err){
        return res.status(400).json({"message" : err});
    }
}

const handleResetPass = async (req, res) => {
    if(!req.body?.email) return res.status(404).json({"message": "Email is required!"});
    const email = req.body.email;
    try{
        resetPassword(email);
        return res.status(200).json({"message" :"Email sent!"});
    }
    catch (err){
        return res.status(400).json({"message" : err});
    }
}

const handleVerifyCode = async (req,res) => {
    //verify that the info exists.
    const email = req.body.email;
    const userCode = req.body.code;
    if(!email || !userCode) return res.status(400).json({"message" : "email or code are missing"});

    try{
        const {username, accessToken} = await verifyCode(email, userCode);
        return res.status(200).json({username : username, accessToken : accessToken});
    }
    catch (err){

    }

}

module.exports = {deleteUser,updateUser, getAllUsers, handleResetPass, handleVerifyCode,
                    registerUser, getUser, login, logout, handleRefreshToken};