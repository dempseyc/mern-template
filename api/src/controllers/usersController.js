const bcrypt = require("bcrypt");
const { Error } = require("mongoose");
const saltRounds = 10;
const User = require("../models/User");

exports.show = async function (req, res) {
  const _id = res.locals.user._id;
  try {
    if (!_id) {
      throw new Error("bad request");
    }
    const response = await User.findById(_id).exec();
    if (response) {
      response.pw_hash = "secured";
      return res.json(response);
    } else {
      throw new Error("Invalid Password/Email");
    }
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.create = async function (req, res) {
  try {
    const params = req.body.user;
    const pw_hash = await bcrypt.hash(params.password, saltRounds);
    if (pw_hash) {
      params.pw_hash = pw_hash;
      params.username = params.email.split("@")[0];
      let user = new User(params);
      const response = await user.save();
      if (response) {
        return res.json(response);
      }
    } else {
      throw new Error("error in user create");
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: `${error.message}` });
  }
};

exports.update = async function (req, res) {
  const { newPassword, data } = req.body;
  const { _id } = res.locals.user;
  if (newPassword) {
    try {
      const pw_hash = await bcrypt.hash(newPassword, saltRounds);
      if (pw_hash) {
        let params = req.body;
        params.pw_hash = pw_hash;
        const doc = await User.findOneAndUpdate(
          { _id: _id },
          {
            pw_hash: params.pw_hash,
          },
          { new: true }
        ).exec();
        if (doc) {
          return res.json(doc);
        } else {
          throw new Error("error in user update");
        }
      }
    } catch (error) {
      return res.status(403).json({ message: `${error.message}` });
    }
  } else if (data && _id) {
    try {
      const response = User.findOneAndUpdate(
        { _id: _id },
        {
          data: data,
        }
      ).exec();
      if (response) {
        return res.json(response.data);
      } else {
        throw new Error("error in user update data");
      }
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  } else {
    res.status(400).json({ message: "Invalid User Update" });
  }
};

exports.delete = async function (req, res) {
  console.log("user delete");
  try {
    const doc = await User.findOneAndDelete({
      _id: res.locals.user._id,
    }).exec();
    if (doc) {
      return res.json({ message: "User Deleted" });
    } else {
      throw new Error("error in user delete");
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: `${error.message}` });
  }
};
