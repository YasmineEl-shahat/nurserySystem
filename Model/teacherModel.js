const mongoose = require("mongoose");
let Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// create schema object
const schema = new mongoose.Schema({
  _id: ObjectId,
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  image: String,
});

// mapping
mongoose.model("teacher", schema);
