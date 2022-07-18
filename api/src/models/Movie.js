const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    starring:  [{ type: String, required: false }],
    year:	{ type: String, required: false },
    link: { type: String, required: false },
    img_link: { type: String, required: false },
    summary: { type: String, required: false }
    finds: [{ type: Schema.Types.ObjectId, ref: 'Find', required: false }],
});

MovieSchema.index({title: 'text', summary: 'text'})

module.exports = mongoose.model('Movie', MovieSchema)