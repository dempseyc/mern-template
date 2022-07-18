const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TropeSchema = new Schema({
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    bonus:  [{ type: String, required: true }],
    ubiquity:	{ type: Number, required: true },
    bonus_style: [{ type: String, required: true }],
    bonus_pts: { type: Number, required: true },
    finds: [{ type: Schema.Types.ObjectId, ref: 'Find', required: false }],
});

module.exports = mongoose.model('Trope', TropeSchema);