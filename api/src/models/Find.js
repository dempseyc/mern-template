const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FindSchema = new Schema({
    found_on: [{type: Date, default: Date.now }],
    found_by: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    movie_id: { type: Schema.Types.ObjectId, ref: 'Movie', required: false },
    trope_id: { type: Schema.Types.ObjectId, ref: 'Trope', required: true },
    bonus_memos: [[{type:Boolean}]] // [0,1,0] for single/doubles [1,1,1,1] for each
});

module.exports = mongoose.model('Find', FindSchema);