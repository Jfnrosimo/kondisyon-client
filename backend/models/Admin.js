const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
   adminType: "String",
   password: "String",
   username: "String"
});

module.exports = mongoose.model('Admin', UserSchema);