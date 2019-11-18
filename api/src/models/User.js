const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const ActSchema = require('./Act').schema;
const ContactSchema = require('./Contact').schema;

// const ActSchema = new Schema({
//     created_on: {type: Date, required: true},
//     description: {type: String, required: true, max: 100},
//     points: {type: Number, required: true},
//     act_category: {type: String, required: true, max: 100},
//     done: Boolean, // usually true, but let's discuss mechanics...
//     done_on: Date, // ...maybe celeste populates undone act to trigger msg
//     act_group: Number, // like multiple acts on a contact would have the same value here
//     rel_contact: { type: Schema.Types.ObjectId, ref: 'Contact' },
//     ongoing: { 
//         start_on: Date,
//         due_by: Date
//     } // just an idea, all optional unless required: true
// });

// const ContactSchema = new Schema({
//     created_on: Date,
//     contacted: Boolean,
//     f_name: String,
//     l_name: String,
//     email: String,
//     phone: Number,
//     history: [ ActSchema ], // derived, but maybe convenient here
//     company: [ String ]
// });

const UserSchema = new Schema({
    created_on: {type: Date, default: Date.now },
    time_zone: String,
    f_name: {type: String, required: true, max: 100},
    l_name: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    pw_hash: {type: String, required: true, max: 100},
    phone: Number,
    acts: [ ActSchema ], // array of acts
    contacts: [ ContactSchema ], // array of contacts
    points: {
        today: Number,
        this_week: Number,
        total: Number
    }, // derived from acts, but maybe convenient here
    recently_active_on: Date, // maybe make this required
    admin: Boolean,
    career_status: [ String ],
    orgs: [ String ]
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {return next()};
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err)
})

UserSchema.methods.comparePassword=function(candidatePassword,next){    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return next(err);
        next(null,isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema);