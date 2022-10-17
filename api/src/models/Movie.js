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


// fromtmdb = {
//         adult: false,
//         backdrop_path: '/2ex2beZ4ssMeOduLD0ILzXKCiep.jpg',
//         genre_ids: [
//           28,
//           12,
//           878,
//           14
//         ],
//         id: 246655,
//         original_language: 'en',
//         original_title: 'X-Men: Apocalypse',
//         overview: 'After the re-emergence of the world\'s first mutant, world-destroyer Apocalypse, the X-Men must unite to defeat his extinction level plan.',
//         popularity: 110.936,
//         poster_path: '/qttNmCib9gHhR5q0QoZ3FgmGom9.jpg',
//         release_date: '2016-05-18',
//         title: 'X-Men: Apocalypse',
//         video: false,
//         vote_average: 6.5,
//         vote_count: 11548
//     };