const express = require("express");
const router = express.Router();

const User = require("../models/Users");
const History = require("../models/History");
const { route } = require("./user");

//check phoneNUmber if exist
router.post("/checkNumber", async (request, response) => {
  User.findOne({
    phoneNumber: request.body.phoneNumber,
  }).then((result) => {
    console.log(result);
    if (result === null) {
      response.send({
        status: "new request",
      });
    } else if (result.status === "Safe now") {
      response.send({
        status: "new request",
      });
    } else {
      const userDetails = result;
      History.find({
        user: userDetails._id,
      }).then((result) => {
        response.send({
          status: "display status",
          userDetails: userDetails,
          userHistory: result,
        });
      });
    }
  });
});

//check phoneNUmber if exist
router.post("/checkNumberTemp", async (request, response) => {
  User.findOne({
    phoneNumber: request.body.phoneNumber,
  }).then((result) => {
    console.log(result);
    if (result === null) {
      response.send({
        status: "new request",
      });
    } else if (result.status === "Safe now") {
      response.send({
        status: "new request",
      });
    } else {
      response.send({
        status: "display status",
      });
    }
  });
});

//display history
router.post("/userHistory", (request, response) => {
  User.findOne({
    phoneNumber: request.body.phoneNumber,
  }).then((result) => {
    console.log(result);
    const userData = result;
    if (result !== null) {
      History.find({
        user: result._id,
      }).then((result) => {
        response.send({
          userHistory: result,
          userDetails: userData,
          result: true,
        });
      });
    } else {
      response.send({
        result: "false",
        userDetails: userData,
      });
    }
  });
});



//Register User
router.post("/NewKondisyon", async (request, response) => {
  User.findOne({
    phoneNumber: request.body.phoneNumber,
  }).then((result) => {
    console.log(result);
    const detailofUser = result;
    if (result === null) {
      const newUser = new User({
        ...request.body,
        status: "Waiting for a Responder",
        statusDesc: "Responder will call you in a few minutes!",
        lastUpdate: Date.now(),
      });
      //add new user
      newUser.save().then((result) => {
        const userDetail = result;

        const newHistory = new History({
          user: result._id,
          locationLongitude: result.locationLongitude,
          locationLatitude: result.locationLatitude,
          dateUpdated: result.lastUpdate,
        });

        newHistory.save().then((result) => {
          console.log(result);

          History.find({
            user: result.user,
          }).then((result) => {
            response.send({
              status: "Request Sent",
              userHistory: result,
              userDetails: userDetail,
            });
          });
        });
      });
    } else {
      //add to history first then update current users status and location
      const newHistory = new History({
        user: result._id,
        locationLongitude: result.locationLongitude,
        locationLatitude: result.locationLatitude,
        dateUpdated: result.lastUpdate,
      });

      newHistory.save().then((result) => {
        console.log(result.user);
        User.updateOne(
          { phoneNumber: request.body.phoneNumber },
          {
            $set: {
              locationLongitude: request.body.locationLongitude,
              locationLatitude: request.body.locationLatitude,
              status: "Waiting for a Responder",
              statusDesc: "Responder will call you in a few minutes!",
              lastUpdate: Date.now(),
            },
          }
        ).then((result) => {
          if (result.modifiedCount === 1) {
            History.find({
              user: detailofUser._id,
            }).then((result) => {
              response.send({
                status: "Request Sent",
                userHistory: result,
                userDetails: detailofUser,
              });
            });
          }
        });
      });
    }
  });
});

//im safe button
router.post("/imSafe", async (request, response) => {
  User.findOne({
    phoneNumber: request.body.phoneNumber,
  }).then((result) => {
    if (result === null) {
      const newUser = new User({
        ...request.body,
        status: "Safe now",
        statusDesc: "Safe now",
        lastUpdate: Date.now(),
      });

      //add new user
      newUser.save().then((result) => {
        const userDetail = result;

        History.find({
          user: result._id,
        }).then((result) => {
          response.send({
            status: "Request Sent",
            userHistory: result,
            userDetails: userDetail,
          });
        });
      });
    } else {
      const userDetail = result;
      // console.log(result.user)
      //add to history first then update current users status and location
      const newHistory = new History({
        user: result._id,
        locationLongitude: result.locationLongitude,
        locationLatitude: result.locationLatitude,
        dateUpdated: result.lastUpdate,
      });
      newHistory.save().then((result) => {
        User.updateOne(
          { phoneNumber: request.body.phoneNumber },
          {
            $set: {
              locationLongitude: request.body.locationLongitude,
              locationLatitude: request.body.locationLatitude,
              status: "Safe now",
              statusDesc: "Safe now",
              lastUpdate: Date.now(),
            },
          }
        ).then((result) => {
          console.log(result);
          if (result.modifiedCount === 1) {
            History.find({
              user: result._id,
            }).then((result) => {
              console.log(result);
              response.send({
                status: "Request Sent",
                userHistory: result,
                userDetails: userDetail,
              });
            });
            // response.send({
            //     status: "Request sent",
            //     result: result,
            //     userDetail : userDetail
            // });
          }
        });
      });
    }
  });
});


//Update location of user
router.post("/updateUserLocation", async(request, response) => {
  //save to History first
  User.findOne({
    phoneNumber: request.body.phoneNumber,
  }).then((result) =>{
      const userId = result._id;
      const longitude = result.locationLongitude;
      const latitude = result.locationLatitude;
      const lastUpdate = result.lastUpdate;
      
      const newHistory = new History({
        user: userId,
        locationLongitude: longitude,
        locationLatitude: latitude,
        dateUpdated: lastUpdate,
      });

      newHistory.save().then((result) => {
        User.updateOne(
          { phoneNumber: request.body.phoneNumber },
          {
            $set: {
              locationLongitude: request.body.locationLongitude,
              locationLatitude: request.body.locationLatitude,
              lastUpdate: Date.now(),
            },
          }
        ).then((result) => {
          response.send({
            result: result
          })
        })
      })
  })
});


//Get all history
//Get all Users
router.get('/getUser',( request, response) => {
  History.find().then( result => {
      response.send( result );
  })
});



module.exports = router;
