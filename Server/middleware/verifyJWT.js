const jwt = require('jsonwebtoken');

//this middleware verifies the token before any http request that needs authorization.

const verifyJWT = (req,res,next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    
    if(!authHeader) return res.status(403).json({"message": "No auth header!"}); // forbidden, no token has been recieved.

    //the authHeader looks like this: Bearer <token> (without the <>).
    const token = authHeader.split(' ')[1];

    //here we verify that the token has not been tempered.
    jwt.verify(token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    if(err) return res.sendStatus(403); // forbidden, invalid token.

                    //add the user information to the request.                 
                    req.username = decoded.UserInfo.username; 
                    req.roles = decoded.UserInfo.roles;
                    next();
                }
        );
}


module.exports = verifyJWT;