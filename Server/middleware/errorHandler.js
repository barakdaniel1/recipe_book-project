const allowedOrigins = require('../config/allowedOrigins');

const errHandler = (err,req,res,next) => {
    console.error(err.stack);
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.status(500).send(err.message);
}

module.exports = errHandler;