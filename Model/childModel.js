const mongoose = require("mongoose");

//create schema object
const schema = new mongoose.Schema({
  _id: Number,
  fullname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    minlength: 10,
  },
  age: { type: Number, required: true, min: 3, max: 10 },
  level: { type: String, required: true, enum: ["PreKG", "KG1", "KG2"] },
  address: {
    type: Object,
    required: true,
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: Number, required: true },
  },
});

//mapping
mongoose.model("child", schema);
