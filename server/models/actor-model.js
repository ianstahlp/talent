const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const Actor =  new Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        middle_name: {type: String, required: false, default: null},
        headshot: {type: String, required: false},
    },
    {timestamps: true},
);

module.exports = mongoose.model('actors', Actor);