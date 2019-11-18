const mongoose = require('mongoose');
const ActSchema = require('./Act').schema;
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    created_on: {type: Date, required: true},
    f_name: {type: String, required: true, max: 100},
    l_name: {type: String, required: true, max: 100},
    email: String,
    phone: Number,
    // history: [ { type: Schema.Types.ObjectId, ref: 'Act' } ],
    history: [ ActSchema ],
    company: [ String ]
});

module.exports = mongoose.model('Contact', ContactSchema);