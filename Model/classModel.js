const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

let Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const schema = new mongoose.Schema({
  _id: Number,
  fullname: { type: String, required: true },
  supervisor: { type: ObjectId, ref: "teacher" },
  children: { type: Array, ref: "child" },
});

schema.plugin(AutoIncrement);
mongoose.model("class", schema);
