const express = require('express');
const router = express.Router();

const User = require('../models/Users')
const History = require('../models/History')

//check phoneNUmber if exist
router.post('/checkNumber', async ( request, response )=> {
    User.findOne({
        phoneNumber: request.body.phoneNumber,

    }).then( result => {
        console.log(result)
        if (result === null ){
                response.send({ 
                    status: 'new request'
                });
            }else if (result.status === 'Safe now') {
                response.send({ 
                    status: 'new request'
                });
            }
            else  {
                response.send({ 
                    status: 'display status'
                });
            }
        
    })
})


//Register User
router.post('/registerTemp', async( request, response) => {
    const newUser = new User(request.body);

    newUser.save().then( result => {
        response.send({ 
            status: 'Kodinsyon sent'
        });
    });
});


module.exports =  router;