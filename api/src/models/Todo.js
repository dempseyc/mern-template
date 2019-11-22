const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    created_on: {type: Date, default: Date.now },
    time_zone: String,
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    completed: Boolean,
    completed_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Todo', TodoSchema);