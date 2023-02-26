const mongoose = require("mongoose");
require("../Model/classModel");
const classSchema = mongoose.model("class");
const childSchema = mongoose.model("child");
const teacherSchema = mongoose.model("teacher");

exports.getAllClasses = (request, response, next) => {
  classSchema
    .find({})
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .populate({ path: "children", select: { fullname: 1 } })
    .then((data) => response.status(200).json({ data }))
    .catch((error) => next(error));
};

exports.addClass = async (request, response, next) => {
  let teacher = await teacherSchema.findOne({ _id: request.body.supervisor });
  if (teacher == null) next(new Error("supervisor not found"));
  else {
    let child = await childSchema.find({ _id: { $in: request.body.children } });

    if (child.length != request.body.children.length)
      next(new Error("child not found"));
    else
      new classSchema({
        fullname: request.body.fullname,
        supervisor: request.body.supervisor,
        children: request.body.children,
      })
        .save()
        .then((data) => response.status(201).json({ data }))
        .catch((error) => next(error));
  }
};

exports.updateClass = async (request, response, next) => {
  let teacher = null;

  if (request.body.supervisor)
    teacher = await teacherSchema.findOne({ _id: request.body.supervisor });
  if (teacher == null && request.body.supervisor)
    next(new Error("supervisor not found"));
  else {
    let child = null;

    if (request.body.children)
      child = await childSchema.find({ _id: { $in: request.body.children } });

    if (child && child.length != request.body.children.length)
      next(new Error("child not found"));
    else {
      classSchema
        .updateOne(
          { _id: request.params.id },
          {
            $set: {
              fullname: request.body.fullname,
              supervisor: request.body.supervisor ?? null,
              children: request.body.children ?? [],
            },
          }
        )
        .then((data) => {
          if (data.matchedCount == 0) throw new Error("class not found");
          else response.status(201).json({ data: "updated" });
        })
        .catch((error) => next(error));
    }
  }
};
exports.deleteClass = (request, response, next) => {
  classSchema
    .deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.deletedCount == 0) throw new Error("class not found");
      else response.status(200).json({ data: "deleted" });
    })
    .catch((error) => next(error));
};

exports.getClass = (request, response, next) => {
  classSchema
    .findOne({ _id: request.params.id })
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .populate({ path: "children", select: { fullname: 1 } })
    .then((data) => response.status(200).json({ data }))
    .catch((error) => next(error));
};
exports.getClassChildren = (request, response, next) => {
  classSchema
    .find({ _id: request.params.id }, { children: 1 })
    .populate({ path: "children", select: { fullname: 1 } })
    .then((data) => response.status(200).json({ data }))
    .catch((error) => next(error));
};
exports.getClassTeacher = (request, response, next) => {
  classSchema
    .find({ _id: request.params.id }, { supervisor: 1 })
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .then((data) => response.status(200).json({ data }))
    .catch((error) => next(error));
};
