const allowedOrigins = require('../config/allowedOrigins');

//handle CORS (Cross Origin Resource Sharing)

const credentials = (req,res,next) => {
    //get the origin of the request
    const origin = req.headers.origin;

    //check if the origin is allowed
    if(allowedOrigins.includes(origin)){
        //mark that the request is from an allowed origin.
        res.header('Access-Control-Allow-Origin', origin);
        //mark that the request can include cookies or tokens.
        res.header('Access-Control-Allow-Credentials',true); 
        //specify which headers are allowed.
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        //specify the http requests that are allowed.
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

        //if it's a preflight request - respond with status 200 as the request is allowed.
        //preflight request is another request sent to the server, to check if the request
        //is allowed.
        if(req.method === 'OPTIONS'){
            res.sendStatus(200);
        }
        else{
            next();
        }
    }
    else res.status(403).json({"message": "Forbidden credentials"});
}

module.exports = credentials;