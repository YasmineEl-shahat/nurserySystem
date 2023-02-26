const express = require("express");
const validateMW = require("../Core/validations/validateMW");
const controller = require("../Controller/childContoller");
const validatePostArray =
  require("../Core/childValidationArray").validatePostArray;
const validatePatchArray =
  require("../Core/childValidationArray").validatePatchArray;
const intParam = require("../Core/paramValidation").intParam;
const { checkTeacherAndAdmin } = require("./../Core/auth/authenticationMW");
const router = express.Router();

router
  .route("/child")
  .all(checkTeacherAndAdmin)
  .get(controller.getAllChildren)
  .post(validatePostArray, validateMW, controller.addChild);

router
  .route("/child/:id")
  .all(checkTeacherAndAdmin)
  .get(intParam, validateMW, controller.getChild)
  .patch(intParam, validatePatchArray, validateMW, controller.updateChild)
  .delete(intParam, validateMW, controller.deleteChild);

module.exports = router;
