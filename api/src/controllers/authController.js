const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");
const User = require("../models/User");

exports.login = async function (req, res) {
  const details = res.locals.details;
  if (details) {
    try {
      const user = await User.findOne({ email: details[0].toString() }).exec();
      const isMatch = await bcrypt.compare(details[1], user.pw_hash.toString());
      if (isMatch) {
        var token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY);
        return res.json({
          user_id: user._id,
          email: user.email,
          username: user.username,
          token: token,
        });
      } else {
        throw new Error("not isMatch");
      }
    } catch (error) {
      console.log(`findOne/pw error: ${error}`);
      return res.status(401).json({ message: "Invalid Password/Email" });
    }
  } else {
    console.log(`no details: ${error}`);
    return res.status(400).json({ message: "No Auth Details" });
  }
};

// var passport = require('passport');

// exports.fb_login = function(req,res) {
//     console.log(req.body, 'success');
//     return res.status(200).json(req.body.user)
// }

// exports.fb_fail = function(req,res) {
//     console.log(req.body, 'fail');
//     return res.status(401).json({message: 'fb failed login'})
// }

// exports.fb_logout = function(req,res, next) {
//     req.logout(function (err) {
//         if (err) { return next(err); }
//         return res.status(402).json({message: 'fb logged out'})
//     })
// }
