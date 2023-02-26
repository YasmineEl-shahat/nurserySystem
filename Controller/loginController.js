const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("../Model/teacherModel");
const teacherSchema = mongoose.model("teacher");
let sk = process.env.SECRET_KEY || "SK";

exports.login = (request, response, next) => {
  if (request.body.username == "admin" && request.body.password == "123") {
    let token = jwt.sign({ id: 1, role: "admin" }, sk, { expiresIn: "3h" });
    response.status(200).json({ message: "Authenticated", token });
  } else {
    teacherSchema
      .findOne({ fullname: request.body.username })
      .then((teacher) => {
        if (teacher == null) {
          let error = new Error("Not Authenticated");
          error.status = 401;
          next(error);
        } else {
          let token = jwt.sign({ id: teacher._id, role: "teacher" }, sk, {
            expiresIn: "3h",
          });
          response.status(200).json({ message: "Authenticated", token });
        }
      });
  }
};
