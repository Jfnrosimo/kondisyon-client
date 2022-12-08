const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname : String,
    phoneNumber: String,
    status: String,
    statusDesc: String,
    locationLongitude: String,
    locationLatitude: String,
    lastUpdate: Date,
    

});

module.exports = mongoose.model('User', UserSchema);