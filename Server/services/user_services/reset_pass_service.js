const nodemailer = require('nodemailer');
require('dotenv').config();
const {getUserByEmail} = require ("../../queries/user_queries");
const Cache = require('js-cache');
const jwt = require('jsonwebtoken');


/*
rough explanation on this service:
first, in the frontend, the user inserts his email.
then, resetPassword (here) is triggered, sending him a code in email.
then, the frontend is redirected to another page, asking him to insert the code he got.
when the user clicks on submit, the verifyCode function is triggered.
if there is a match, then we'll send the username and a new accessToken.
*/




// Create a new cache instance - holds 5 minute long password reset codes.
const cache = new Cache();

//this function is responsible for sending an EMAIL with a random code.
const sendResetMail = (email) =>{
    const resetCode = generateRandomResetCode();

    // Create a nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL_SECRET, // Retrieve email user from environment variable
        pass: process.env.EMAIL_PASS_SECRET, // Retrieve email password from environment variable
        },
    });
    
    // Compose the email
    const mailOptions = {
        from: process.env.EMAIL_SECRET, // Use the same email user as the sender
        to: email, // Recipient's email address
        subject: 'One-Time Access Code.',
        text: `Hello,\n 
                The code to access your account is: ${resetCode}.\n 
                The code is available for only 5 minutes, and can only be used once.\n
                Please, reset your password once you log in.`,
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return -1;
        } else {
            cache.set(email, resetCode,300000);
            return resetCode;
        }
    });
}

// this happens first.
//the user sends a request, which holds the email to send the reset code to.
const resetPassword = async (req,res) => {
    if(!req.body?.email) return res.status(404).json({"message": "Email is required!"});
    const email = req.body.email;
    try {
        const foundUser = await getUserByEmail(email);
        if(!foundUser) return res.status(404).json({"message": "User not found"});

        sendResetMail(email);
        return res.json({"message": "Email sent!"});
    }
    catch (err){
        return res.status(400).json({"message": err.message});
    }
}

//this happens second.
//in the frontend, there's a textbox that you put the code in.
const verifyCode = async (req,res) => {
    //verify that the info exists.
    const email = req.body.email;
    const userCode = req.body.code;
    if(!email || !userCode) return res.status(400).json({"message" : "email or code are missing"});

    //verify that there's a user with this email.
    const foundUser = await getUserByEmail(email);
    if(!foundUser) return res.status(400).json({"message" : "no username matches this email"});

    //verify that the code matches.
    if(userCode == cache.get(email)){
        //create jwts:
        //access token:
        const accessToken = jwt.sign(
            {
                "UserInfo" : {
                    "username": foundUser.username
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
        );
        //give access to the user
        return res.status(201).json({
            username : foundUser.username,
            accessToken: accessToken
        })
    }

    else{
        return res.status(400).json({"message" : "incorrect code"});
    }
}


const generateRandomResetCode = () => {
    const min = 100000; // minimum value (inclusive)
    const max = 999999; // maximum value (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {resetPassword, verifyCode};