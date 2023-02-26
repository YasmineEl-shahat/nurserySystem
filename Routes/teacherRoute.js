const express = require("express");
const multer = require("multer");
const path = require("path");
const validateMW = require("../Core/validations/validateMW");
const controller = require("../Controller/teacherContoller");
const validatePostArray =
  require("../Core/teacherValidationArray").validatePostArray;
const validatePatchArray =
  require("../Core/teacherValidationArray").validatePatchArray;
const objectIdParam = require("../Core/paramValidation").objectIdParam;
const {
  checkAdmin,
  checkTeacherAndAdmin,
} = require("./../Core/auth/authenticationMW");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, path.join(__dirname, "..", "images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.fullname ??
        "" +
          "-" +
          file.originalname +
          "-" +
          Date.now() +
          path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});
router
  .route("/teachers")
  .all(checkAdmin)
  .get(controller.getAllTeachers)
  .post(
    upload.single("image"),
    validatePostArray,
    validateMW,
    controller.addTeacher
  );
router
  .route("/teachers/:id")
  .patch(
    checkTeacherAndAdmin,
    upload.single("image"),
    objectIdParam,
    validatePatchArray,
    validateMW,
    controller.updateTeacher
  )
  .delete(checkAdmin, objectIdParam, validateMW, controller.deleteTeacher);

module.exports = router;
