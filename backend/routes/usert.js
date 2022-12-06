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
                const userDetails = result;
                History.find({
                    user: userDetails._id
                }).then( result => {
                    response.send({ 
                        status: 'display status',
                        userDetails : userDetails,
                        userHistory : result
                    });
                })
                
            }
        
    })
})

//check phoneNUmber if exist
router.post('/checkNumberTemp', async ( request, response )=> {
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
                    status: 'display status',
                
                })
            }
    })
});

//display history
router.post('/userHistory', (request, response) => {
     
    User.findOne({
        phoneNumber: request.body.phoneNumber,
    
    }).then (result => {
        console.log(result)
        const userData = result
        if (result !== null){
            History.find({
                user: result._id
            }).then ( result => {
                response.send({ 
                    userHistory: result,
                    userDetails: userData,
                    result: true
    
                })
            })
        } else {
            response.send({
                result: 'false',
                userDetails: userData,
            })
        }

        
    })
})








//Register User
router.post('/NewKondisyon', async( request, response) => {
   
    User.findOne({
        phoneNumber: request.body.phoneNumber,

    }).then( result => {
        console.log(result)

        if (result === null) {
            const newUser = new User({
                ...request.body,
                    status: 'Waiting for a Responder',
                    statusDesc: 'Responder will call you in a few minutes!',
                    lastUpdate: Date.now()
            });
            //add new user
            newUser.save().then( result => {
                const userDetail = result;
                
                const newHistory = new History({
                    user: result._id,
                    locationLongitude: result.locationLongitude,
                    locationLatitude: result.locationLatitude,
                    dateUpdated: result.lastUpdate
            
                });

                newHistory.save().then( result =>{
                    console.log(result)

                    History.find({
                        user : result.user
                    }).then(result => {
                        
                        response.send({ 
                            status: 'Request Sent',
                            userHistory: result,
                            UserDetails: userDetail
                        })
                    })
                    
                  
                })

                
            });
            
        }else{
            //add to history first then update current users status and location
            const newHistory = new History({
                user: result._id,
                locationLongitude: result.locationLongitude,
                locationLatitude: result.locationLatitude,
                dateUpdated: result.lastUpdate
        
            });

            newHistory.save().then( result => {
                console.log(result.user)
                User.updateOne(
         
                    { phoneNumber: request.body.phoneNumber}, 
                    { $set: { 
                        locationLongitude: request.body.locationLongitude,
                        locationLatitude: request.body.locationLatitude,
                        status: 'Waiting for a Responder',
                        statusDesc: 'Responder will call you in a few minutes!',
                        lastUpdate: Date.now()
                    } })
                .then( result => {
                    if( result.modifiedCount === 1 ){
                        response.send({ status: "Request sent" });
                    }
                });

            })

            
        }
        
        
    })

})

//im safe button
router.post('/imSafe', async ( request, response ) => {
    User.findOne({
        phoneNumber: request.body.phoneNumber,
    }).then (result => {
        if (result === null ){
            const newUser = new User ({
                ...request.body,
                    status: 'Safe now',
                    statusDesc: 'Safe now',
                    lastUpdate: Date.now()
            });

             //add new user
             newUser.save().then( result => {
                response.send({ 
                    status: 'Request Sent',
                    result: result

                });
            });
        }else {

            // console.log(result.user)
            //add to history first then update current users status and location
            const newHistory = new History({
                user: result._id,
                locationLongitude: result.locationLongitude,
                locationLatitude: result.locationLatitude,
                dateUpdated: result.lastUpdate
        
            });
            newHistory.save().then( result => {
                console.log(result.user)
                User.updateOne(
         
                    { phoneNumber: request.body.phoneNumber}, 
                    { $set: { 
                        locationLongitude: request.body.locationLongitude,
                        locationLatitude: request.body.locationLatitude,
                        status: 'Safe now',
                        statusDesc: 'Safe now',
                        lastUpdate: Date.now()
                        
                    } })
                .then( result => {
                    if( result.modifiedCount === 1 ){
                        response.send({ 
                            status: "Request sent",
                            result: result
                        });
                    }
                });

            })
           
        
               

        }
    })
});


    // const newUser = new User(request.body);

    // newUser.save().then( result => {
    //     response.send({ 
    //         status: 'Kodinsyon sent'
    //     });
    // });





module.exports =  router;