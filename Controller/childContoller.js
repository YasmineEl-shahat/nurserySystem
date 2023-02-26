const mongoose = require("mongoose");
require("../Model/childModel");
const childSchema = mongoose.model("child");

exports.getAllChildren = (request, response, next) => {
  childSchema
    .find({})
    .then((data) => response.status(200).json({ data }))
    .catch((error) => next(error));
};

exports.addChild = (request, response, next) => {
  new childSchema({
    _id: request.body._id,
    fullname: request.body.fullname,
    age: request.body.age,
    level: request.body.level,
    address: request.body.address,
  })
    .save()
    .then((data) => response.status(201).json({ data }))
    .catch((error) => next(error));
};

exports.updateChild = (request, response, next) => {
  childSchema
    .updateOne(
      { _id: request.params.id },
      {
        $set: {
          fullname: request.body.fullname,
          age: request.body.age,
          level: request.body.level,
          address: request.body.address,
        },
      }
    )
    .then((data) => {
      if (data.matchedCount == 0) throw new Error("child not found");
      else response.status(200).json({ data: "updated" });
    })
    .catch((error) => next(error));
};
exports.deleteChild = (request, response, next) => {
  childSchema
    .deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.deletedCount == 0) throw new Error("child not found");
      else response.status(200).json({ data: "deleted" });
    })
    .catch((error) => next(error));
};

exports.getChild = (request, response, next) => {
  childSchema
    .findOne({ _id: request.params.id })
    .then((data) => response.status(200).json({ data }))
    .catch((error) => next(error));
};
