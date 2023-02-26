const express = require("express");
const validateMW = require("../Core/validations/validateMW");
const controller = require("../Controller/childContoller");
const validatePostArray =
  require("../Core/childValidationArray").validatePostArray;
const validatePatchArray =
  require("../Core/childValidationArray").validatePatchArray;
const intParam = require("../Core/paramValidation").intParam;
const router = express.Router();

router
  .route("/child")
  .get(controller.getAllChildren)
  .post(validatePostArray, validateMW, controller.addChild);

router
  .route("/child/:id")
  .get(intParam, validateMW, controller.getChild)
  .patch(intParam, validatePatchArray, validateMW, controller.updateChild)
  .delete(intParam, validateMW, controller.deleteChild);

module.exports = router;
