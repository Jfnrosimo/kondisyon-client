const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
   user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
   },
   location : {
        longitude: String,
        latitude : String
   }
   

});

module.exports = mongoose.model('History', UserSchema);