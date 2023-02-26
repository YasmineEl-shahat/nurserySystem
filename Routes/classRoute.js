const express = require("express");
const validateMW = require("../Core/validations/validateMW");
const controller = require("../Controller/classContoller");
const validatePostArray =
  require("../Core/classValidationArray").validatePostArray;
const validatePatchArray =
  require("../Core/classValidationArray").validatePatchArray;
const intParam = require("../Core/paramValidation").intParam;
const {
  checkAdmin,
  checkTeacherAndAdmin,
} = require("./../Core/auth/authenticationMW");
const router = express.Router();

router
  .all(checkTeacherAndAdmin)
  .route("/class")
  .get(controller.getAllClasses)
  .post(validatePostArray, validateMW, controller.addClass);

router
  .route("/class/:id")
  .get(checkTeacherAndAdmin, intParam, validateMW, controller.getClass)
  .patch(
    checkAdmin,
    intParam,
    validatePatchArray,
    validateMW,
    controller.updateClass
  )
  .delete(checkAdmin, intParam, validateMW, controller.deleteClass);

router.get(
  "/classChildren/:id",
  checkTeacherAndAdmin,
  intParam,
  validateMW,
  controller.getClassChildren
);
router.get(
  "/classTeacher/:id",
  checkTeacherAndAdmin,
  intParam,
  validateMW,
  controller.getClassTeacher
);

module.exports = router;
