const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req,res,next) => {
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials',true); 
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

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