const userService = require("../services/userService");
const AppError = require("../errors/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const login = async (email, password) => {
    
  try {
    //Validation of email
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new AppError(
        "Authentication failed Email / password does not correct.",
        400
      );
    }

    //validation of enable
    if (!user.enabled) {
      throw new AppError("Authentication failed : User disabled", 400);
    }
    //Validation of password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new AppError(
        "Authentication failed Email / password does not correct.",
        400
      );
    }
    //generate token
    const token = _encrypt(user._id);
    return {
      token,
      user: user.name,
      role: user.role,
    };
  } catch (error) {
    throw error;
  }
};

_encrypt = (id) => {
  return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });
};

module.exports = { login };
