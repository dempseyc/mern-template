const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    created_on: {type: Date, default: Date.now },
    username: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100, unique: true},
    pw_hash: {type: String, required: true, max: 100},
    recently_active_on: {type: Date, default: Date.now },
    admin: Boolean,
    data: {},
});

function _capitalize (str) {
    const lower = str.toLowerCase();
    const noSpace = lower.replace(/\s/g, '');
    return noSpace.charAt(0).toUpperCase() + noSpace.slice(1);
}

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

UserSchema.methods.comparePassword = (candidatePassword,next) => {
    bcrypt.compare(candidatePassword, this.password, (err,isMatch) => {
        if (err) { return next(err); }
        next(null, isMatch);
    });
}

module.exports = mongoose.model('User', UserSchema);