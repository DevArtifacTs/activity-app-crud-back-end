const mongoose = require('mongoose');

// define data Schema 
const recordSchema = new mongoose.Schema({
    name : {type : String, minlength : [3, 'activity name must contain at least 3 char.']},
    description : {type : String},
    duration : {type : Number, min : [0, 'duration must be at least 0']},
    location : {type : String},
    timestamp : {type : String},
    calories : {type : Number},
    logo : {type : String}
});

const RecordModel = mongoose.model('Record', recordSchema, 'records');

module.exports = RecordModel ;