require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const errHandler = require('./middleware/errorHandler');
const PORT = process.env.port || 5000;

//Connect to MongoDB.
connectDB();

//Add a header to the requests coming from allowed origins. (because CORS made issues)
app.use(credentials);

//Only let allowed origins to fetch information.
app.use(cors(corsOptions));

//This enables us to get information from the FORM pages as arguments. - Middleware
app.use(express.urlencoded({extended: false}));

//This enables us to get information from JSON files. - Middleware
app.use(express.json());

//Serve static files - css, images.
app.use(express.static("./public", {root: __dirname}))

//Enables us to work with cookies.
app.use(cookieParser());

//routes
app.use("/",require('./routes/root'));
app.use("/login",require('./routes/login'));
app.use("/logout",require('./routes/logout'));
app.use("/refresh",require('./routes/refresh'));
app.use("/register",require('./routes/register'));

//every route after verifyJWT will require validation of the token.
app.use(verifyJWT);

//users api CRUD.
app.use('/users',require('./routes/api/users'));
//recipes api CRUD
app.use('/users/:username/recipes',require('./routes/api/recipes'));


app.use(errHandler);

//DB connection & server start.
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});