const express = require("express");
const validateMW = require("../Core/validations/validateMW");
const controller = require("../Controller/teacherContoller");
const validatePostArray =
  require("../Core/teacherValidationArray").validatePostArray;
const validatePatchArray =
  require("../Core/teacherValidationArray").validatePatchArray;
const objectIdParam = require("../Core/paramValidation").objectIdParam;

const router = express.Router();

router
  .route("/teachers")
  .get(controller.getAllTeachers)
  .post(validatePostArray, validateMW, controller.addTeacher);
router
  .route("/teachers/:id")
  .patch(
    objectIdParam,
    validatePatchArray,
    validateMW,
    controller.updateTeacher
  )
  .delete(objectIdParam, validateMW, controller.deleteTeacher);

module.exports = router;
