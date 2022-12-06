const express = require('express');
const router = express.Router();

const User = require('../models/Users')
const History = require('../models/History')



//check  mobile number  if has an history 
// Check if email is already in use or not
router.post('/checkNumber', async ( request, response ) => {
    User.findOne({
        phoneNumber: request.body.phoneNumber,

    }).then( result => {

            if (result === null) {
                /*create new user and the status is (Waiting for a Responder status), 
                status description (Responder will call you in a few minutes) */
                const newUser = new User({
                    ...request.body,
                    status: 'Waiting for a Responder',
                    statusDesc: 'Responder will call you in a few minutes!'

                });
                newUser.save().then( result => {
                    response.send({ 
                        status: 'Kodinsyon sent'
                    });
                });

            }else {
                //check if the status of the user is 
                if (result.status === 'Safe now'){

                    /*  1. mag add sa history:
                            * result._d
                            * longtitude 
                            * latitude
                            
                    */
                   console.log(result)
                    
                    const newHistory = new History({
                        user: result._id,
                        locationLongitude: result.locationLongitude,
                        locationLatitude: result.locationLatitude
                
                    });

                    newHistory.save().then( result => {

                        /*2. update user location, status, status description 
                         */

                        User.updateOne(
         
                            { _id: '638d95bcf680365fd086620b' }, 
                            { $set: { 
                                locationLongitude: result.body.locationLongitude,
                                locationLatitude: result.body.locationLatitude,
                                status: 'Waiting for a Responder',
                            statusDesc: 'Responder will call you in a few minutes!'
                            } })
                        .then( result => {
                            if( result.modifiedCount === 1 ){
                                response.send({ status: "Request sent" });
                            }
                        });

                    });

                    

                    





                
                }else{
                    // ididisplay yung status nya, yung status description 
                    response.send({
                    ddffdfd: 'hindi pa safe pero may account na',
                    result: result 
                    
                    });
                }
            }
            
            
      

           
        
    })
} )


//register temp
//Register User
router.post('/registerTemp', async( request, response) => {
    const newUser = new User(request.body);

    newUser.save().then( result => {
        response.send({ 
            status: 'Kodinsyon sent'
        });
    });
});

//add history
router.post('/addToHIstoryTemp', async( request, response) => {
    let ObjectId = require('mongodb').ObjectId  
    const newHistory = new History({
        user: ObjectId('638da405cec3d5871eb69410'),
        locationLongitude: request.body.locationLongitude,
        locationLatitude: request.body.locationLatitude,
        

    });

    newHistory.save().then( result => {
        response.send({ 
            status: result
        });
    });
});

//update users location and status
router.put('/updateUser', ( request, response ) => {
    let ObjectId = require('mongodb').ObjectId 
    User.updateOne(
         
        { _id: '638d95bcf680365fd086620b' }, 
        { $set: { 
            locationLongitude: request.body.locationLongitude,
            locationLatitude: request.body.locationLatitude,
            status: 'Waiting for a Responder',
        statusDesc: 'Responder will call you in a few minutes!'

             
        } })
    .then( result => {
        if( result.modifiedCount === 1 ){
            response.send({ status: "Comment has been updated" });
        }
    });
});


module.exports =  router;