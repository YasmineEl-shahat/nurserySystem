const { body, param } = require("express-validator");
exports.validatePostArray = [
  body("_id").isMongoId().withMessage("teacher Id should be object id"),
  body("fullname")
    .isString()
    .withMessage("teacher Name should be string")
    .isLength({ min: 10 })
    .withMessage("teacher Name should contain at least 10 chars"),
  //   body("password")
  //     .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
  //     .withMessage(
  //       "password should contains at least 8 characters, one uppercase letter, one lowercase letter, and one number"
  //     ),
  body("password")
    .isStrongPassword()
    .withMessage(
      "password should contains at least 8 characters, one uppercase letter, one lowercase letter,one special char, and one number"
    ),
  body("email").isEmail().withMessage("invalid mail"),
  body("image").isString().withMessage("invalid image"),
];
exports.validatePatchArray = [
  body("fullname")
    .optional()
    .isString()
    .withMessage("teacher Name should be string")
    .isLength({ min: 10 })
    .withMessage("teacher Name should contain at least 10 chars"),
  body("password")
    .optional()
    .isStrongPassword()
    .withMessage(
      "password should contains at least 8 characters, one uppercase letter, one lowercase letter,one special char, and one number"
    ),
  body("email").optional().isEmail().withMessage("invalid mail"),
  body("image").optional().isString().withMessage("invalid image"),
];
