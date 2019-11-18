const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActSchema = new Schema({
    created_on: {type: Date, default: Date.now},
    description: {type: String, required: true, max: 100}, // only for user, empty as
    points: {type: Number, required: true},
    act_profile: {
        main_category: {type: String, required: true, max: 100}, // apply / update_docs / research_edu / contact / zero_points / negative_points
        tags: [ String ] // 'not_shown', 'big_fish',
    },
    done: Boolean,
    done_on: Date,
    act_group: Number,
    rel_contact: { type: Schema.Types.ObjectId, ref: 'Contact' },
    ongoing: { 
        start_on: Date,
        due_by: Date
    }
});

module.exports = mongoose.model('Act', ActSchema);