const mongoose = require("mongoose");
let Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

//email validation
const validateEmail = () => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
// create schema object
const schema = new mongoose.Schema({
  _id: ObjectId,
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validateEmail, "invalid email"],
  },
  image: String,
});

// mapping
mongoose.model("teacher", schema);
