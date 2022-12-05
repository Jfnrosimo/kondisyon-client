const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname : String,
    phoneNumber: String,
    status: String,
    statusDesc: String,
    location: {
        longitude: String,
        latitude : String
    }

});

module.exports = mongoose.model('User', UserSchema);