const express = require("express");
const validateMW = require("../Core/validations/validateMW");
const controller = require("../Controller/classContoller");
const validatePostArray =
  require("../Core/classValidationArray").validatePostArray;
const validatePatchArray =
  require("../Core/classValidationArray").validatePatchArray;
const intParam = require("../Core/paramValidation").intParam;

const router = express.Router();

router
  .route("/class")
  .get(controller.getAllClasses)
  .post(validatePostArray, validateMW, controller.addClass);

router
  .route("/class/:id")
  .get(intParam, validateMW, controller.getClass)
  .patch(intParam, validatePatchArray, validateMW, controller.updateClass)
  .delete(intParam, validateMW, controller.deleteClass);

router.get(
  "/classChildren/:id",
  intParam,
  validateMW,
  controller.getClassChildren
);
router.get(
  "/classTeacher/:id",
  intParam,
  validateMW,
  controller.getClassTeacher
);

module.exports = router;
