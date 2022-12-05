const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
   user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
   },
   locationLongitude: String,
   locationLatitude: String,
   dateUpdated: Date 
   

});

module.exports = mongoose.model('History', HistorySchema);