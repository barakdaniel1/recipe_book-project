require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./Common/config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./Common/config/dbConn');
const cookieParser = require('cookie-parser');
const credentials = require('./Common/middleware/credentials');
const verifyJWT = require('./Common/middleware/verifyJWT');
const errHandler = require('./Common/middleware/errorHandler');
const PORT = process.env.port;

//Connect to MongoDB.
connectDB();

//Add a header to the responses to allowed origins.
app.use(credentials);

//Only let allowed origins to fetch information.
app.use(cors(corsOptions));

//This enables us to get information from the FORM pages as arguments. - Middleware
app.use(express.urlencoded({extended: false}));

//This enables us to get information from JSON files. - Middleware
app.use(express.json({limit: "50mb"}));

//Serve static files - css, images.
app.use(express.static("./public", {root: __dirname}))

//Enables us to work with cookies.
app.use(cookieParser());

//routes
app.use("/login",require('./User_Service/Routes/login'));
app.use("/logout",require('./User_Service/Routes/logout'));
app.use("/refresh",require('./User_Service/Routes/refresh'));
app.use("/register",require('./User_Service/Routes/register'));
app.use("/resetPass", require('./User_Service/Routes/resetPass'));

//every route after verifyJWT will require validation of the token.
app.use(verifyJWT);

//users api CRUD.
app.use('/users',require('./User_Service/Routes/api/users'));
//recipes api CRUD
app.use('/users/:username/recipes',require('./Recipe_Service/Routes/api/recipes'));

//catch any errors that were not handled by the controllers, routes, or other cases.
app.use(errHandler);

//DB connection & server start.
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});