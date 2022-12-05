const express = require('express');
const router = express.Router();

const User = require('../models/Users');
const History = require('../models/History');
const { findOne } = require('../models/Users');


//Get all Users
router.get('/getUser',( request, response) => {
    User.find().then( result => {
        response.send( result );
    })
});

//Get all Users with status of 'Safe now'
router.get('/userSafe',( request, response) => {
    User.find({
        status: 'Safe now'
    }).then( result => {
        response.send( result );
    })
});

//Get all Users with status Waiting for a Responder '
router.get('/userResponder',( request, response) => {
    User.find({
        status: 'Waiting for a Responder'
    }).then( result => {
        response.send( result );
    })
});

//Get all Users with status Waiting for a Responder
router.get('/userOntheWay',( request, response) => {
    User.find({
        status: 'Responder on the way'
    }).then( result => {
        response.send( result );
    })
});

//Change status
router.post('/changeStatus', ( request, response) => {

    User.findOne({
        phoneNumber: request.body.phoneNumber
    }).then(result => {
        // console.log(result);
        const newHistory = new History({
            user: result._id,
            locationLongitude: result.locationLongitude,
            locationLatitude: result.locationLatitude,
            dateUpdated: result.lastUpdate
        });
        newHistory.save().then( result => {
                console.log(result);

                  User.updateOne(
                    {phoneNumber: request.body.phoneNumber},
                    { $set: {
                            status: request.body.status,
                            statusDesc: request.body.statusDesc,
                            lastUpdate: Date.now()
                        }
                    }
                ).then( result => {
                    // console.log(result)
                    if( result.modifiedCount === 1 ){
                        response.send({ status: "Updated" });
                    }
                });
        })
    })


//   User.updateOne(
//     {phoneNumber: request.body.phoneNumber},
//     { $set: {
//             status: request.body.status,
//             statusDesc: request.body.statusDesc,
//             lastUpdate: Date.now()
//         }
//     }
//   ).then( result => {
//     console.log(result)
//     if( result.modifiedCount === 1 ){
//         response.send({ status: "Updated" });
//     }
// });
})
module.exports =  router;