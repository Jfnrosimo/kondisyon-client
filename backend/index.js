const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const port = 8099;
// const dotenv = require( "dotenv");

// dotenv.config();



//middleWare
server.use(morgan('dev'));
server.use( cors() );
server.use( bodyParser.json() );
server.use( helmet() );


//routes
const userRoute = require('./routes/user');
const usertRoute = require('./routes/usert');

// Database connection
mongoose.connect('mongodb+srv://kondisyon:kondisyon@cluster0.zjj0pac.mongodb.net/kondisyondb')



server.get('/', (request, response) => {
    response.send(`Welcome to the Kondisyon api`);
})

//Routes
server.use('/api/V1/user', userRoute)
server.use('/api/V1/usert', usertRoute)



server.listen(
    port,
    () => {
        console.log(`Server running on port ${port}`);
    }
);