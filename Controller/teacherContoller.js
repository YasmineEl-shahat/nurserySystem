const mongoose = require("mongoose");
require("../Model/teacherModel");
const teacherSchema = mongoose.model("teacher");

exports.getAllTeachers = (request, response, next) => {
  // console.log(request.query);
  // console.log(request.params);
  teacherSchema
    .find({})
    .then((data) => response.status(200).json({ data }))
    .catch((error) => next(error));
};

exports.addTeacher = (request, response, next) => {
  console.log(request.file);
  new teacherSchema({
    _id: request.body._id,
    fullname: request.body.fullname,
    password: request.body.password,
    email: request.body.email,
    image: request.file?.path ? request.file.path : "",
  })
    .save()
    .then((data) => response.status(201).json({ data }))
    .catch((error) => next(error));
};

exports.updateTeacher = (request, response, next) => {
  teacherSchema
    .updateOne(
      { _id: request.params.id },
      {
        $set: {
          fullname: request.body.fullname,
          password: request.body.password,
          email: request.body.email,
          image: request.file?.path ? request.file.path : "",
        },
      }
    )
    .then((data) => {
      if (data.matchedCount == 0) throw new Error("teacher not found");
      else response.status(200).json({ data: "updated" });
    })
    .catch((error) => next(error));
};
exports.deleteTeacher = (request, response, next) => {
  teacherSchema
    .deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.deletedCount == 0) throw new Error("teacher not found");
      else response.status(200).json({ data: "deleted" });
    })
    .catch((error) => next(error));
};
