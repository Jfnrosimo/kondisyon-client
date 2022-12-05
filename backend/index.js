const express = require('express');
const server = express();
const mongoose = require('mongoose');
const port = 8076;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');



// Database connection
mongoose.connect('mongodb+srv://tricative:WW2HjUgFqXieitJU@cluster0.zjj0pac.mongodb.net/condisyondb')


server.get('/', (request, response) => {
    response.send(`Welcome to the Kondisyon api`);
})


server.listen(
    port,
    () => {
        console.log(`Server running on port ${port}`);
    }
);