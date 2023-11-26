const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleRegisterController = async (req,res) => {
    const userName = req.body.username;
    const pwd = req.body.password;
    const email = req.body.email;
    
    //validate the parameters.
    if (!userName || !pwd || !email) return res.status(400).json(
        { 'message': 'Username, password and email are required.' }
    );

    //look for duplicates
    const foundUser = await User.findOne({username: userName}).exec();
    if(foundUser) return res.status(403).json({"message":"Username already exists!"});

    //we didn't find, so now we add to the database.
    try {
        const hashedPwd = await bcrypt.hash(pwd,10);
        const result = await User.create({username: userName, password: hashedPwd, email: email});
        res.status(201).json({"message":`User ${userName} created successfully!`});
        console.log(result);
    }
    catch(err){
        console.log("error in register controller");
        res.status(403).json({"message": err.message});
    }
}

module.exports = {handleRegisterController};