const { check } = require("express-validator");
const AppError = require("../../errors/appError");
const userService = require("../../services/userService");
const { ROLES } = require("../../constants");
const { validationResult } = require("../commons");

const _nameRequired = check("name", "Name is required").not().isEmpty();
const _lastNameRequired = check("lastName", "Last name is required")
  .not()
  .isEmpty();
const _emailRequired = check("email", "Email is required").not().isEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
const _emailExist = check("email").custom(async (email = "") => {
  const userFound = await userService.findByEmail(email);
  if (userFound) {
    throw new AppError("Email already exist in db", 400);
  }
});
const _passwordRequired = check("password", "Password is required")
  .not()
  .isEmpty();
const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new AppError("Use a valid role", 400);
    }
  });
const _dateValid = check("birthdate").optional().isDate("MM-DD-YYYY");

const _optionalEmailValid = check("email", "Email is invalid")
  .optional()
  .isEmail();
const _optionalEmailExist = check("email")
  .optional()
  .custom(async (email = "") => {
    const userFound = await userService.findByEmail(email);
    if (userFound) {
      throw new AppError("Email already exist in db", 400);
    }
  });
const _idRequired = check("id").not().isEmpty();
const _idIsMongoDB = check("id").isMongoId();
const _idExist = check("id").custom(async (id = "") => {
  const idFound = await userService.findById(id);
  if (!idFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

const postRequestValidations = [
  _nameRequired,
  _lastNameRequired,
  _emailRequired,
  _emailValid,
  _emailExist,
  _passwordRequired,
  _roleValid,
  _dateValid,
  validationResult,
];
const putRequestValidations = [
  _roleValid,
  _dateValid,
  _optionalEmailValid,
  _optionalEmailExist,
  _idRequired,
  _idIsMongoDB,
  _idExist,
  validationResult,
];

module.exports = {
  postRequestValidations,
  putRequestValidations,
};
