const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    created_on: {type: Date, default: Date.now },
    time_zone: String,
    f_name: {type: String, required: true, max: 100},
    l_name: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100, unique: true},
    pw_hash: {type: String, required: true, max: 100},
    recently_active_on: {type: Date, default: Date.now },
    admin: Boolean,
});

function _capitalize (str) {
    const lower = str.toLowerCase();
    const noSpace = lower.replace(/\s/g, '');
    return noSpace.charAt(0).toUpperCase() + noSpace.slice(1);
}

UserSchema.virtual('full_name').get( () => {
    return _capitalize(this.fname) + ' ' + _capitalize(this.lname);
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.hash(user.password, 10).then( (hashedPassword) => {
        user.pw_hash = hashedPassword;
        next();
    })
}, function (err) {
    next(err);
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('admin')) { return next(); }
    if (user.email = 'u1@u.com')
})

UserSchema.methods.comparePassword = (candidatePassword,next) => {
    bcrypt.compare(candidatePassword, this.password, (err,isMatch) => {
        if (err) { return next(err); }
        next(null, isMatch);
    });
}

module.exports = mongoose.model('User', UserSchema);