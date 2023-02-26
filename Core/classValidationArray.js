const { body, param, query } = require("express-validator");
exports.validatePostArray = [
  body("fullname")
    .isString()
    .withMessage("class Name should be string")
    .isLength({ min: 10 })
    .withMessage("class Name should contain at least 10 chars"),

  body("supervisor").isMongoId().withMessage("invalid supervisor id"),
  body("children")
    .isArray()
    .isLength({ min: 1 })
    .withMessage("children should be array of children ids"),
];
exports.validatePatchArray = [
  body("fullname")
    .optional()
    .isString()
    .withMessage("class Name should be string")
    .isLength({ min: 10 })
    .withMessage("class Name should contain at least 10 chars"),

  body("supervisor")
    .optional()
    .isMongoId()
    .withMessage("invalid supervisor id"),
  body("children")
    .optional()
    .isArray()
    .isLength({ min: 1 })
    .withMessage("children should be array of children ids"),
];
