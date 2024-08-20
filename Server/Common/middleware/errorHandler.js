const allowedOrigins = require('../config/allowedOrigins');

const errHandler = (err,req,res,next) => {
    console.error(err.stack); // for debugging purposes

    //check that the origin is allowed.
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Origin', origin);
    }

    //set the appropriate headers for this response, to handle with CORS
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.status(500).send(err.message);
}

module.exports = errHandler;