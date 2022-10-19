const { Error } = require("mongoose");
const GameMovie = require("../models/GameMovie");

exports.index = async function (req, res) {
  try {
    const docs = await GameMovie.find({}).exec();
    let results = ["no results"];
    if (docs.length) {
      results = docs;
    }
    return res.json(results);
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.show = async function (req, res) {
  const { id } = req.params;
  try {
    const doc = await GameMovie.findById(id).exec();
    if (doc) {
      return res.json(doc);
    } else {
      throw new Error("error in movie show");
    }
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.create = async function (req, res) {
  try {
    const params = req.body.gameMovie;
    const doc = await GameMovie.findOneAndUpdate(
      { tmdb_id: params.tmdb_id },
      { $set: params },
      {
        new: true, // return updated doc
        upsert: true, // insert the document if it does not exist
      }
    ).exec();
    if (doc) {
      return res.json(doc);
    } else {
      throw new Error("error in movie create");
    }
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.update = async function (req, res) {
  try {
    const params = req.body;
    const doc = await GameMovie.findOneAndUpdate(
      { _id: req.params.id },
      { $set: params },
      { new: true }
    ).exec();
    if (doc) {
      return res.json(doc);
    } else {
      throw new Error("error in movie update");
    }
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.delete = async function (req, res) {
  try {
    const doc = await GameMovie.findOneAndDelete({ _id: req.params.id }).exec();
    if (doc) {
      return res.json({ message: `movie deleted ${doc._id}` });
    } else {
      throw new Error("error in movie delete");
    }
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.search = async function (req, res) {
  try {
    const { query } = req.body;
    let results = ["no results"];
    const docs = await GameMovie.find({ $text: { $search: query } })
      .limit(10)
      .exec();
    if (docs.length) {
      results = docs;
    }
    return res.json(results);
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};
