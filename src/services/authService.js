const userService = require("../services/userService");
const AppError = require("../errors/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const logger  = require("../loaders/logger");

const login = async (email, password) => {
  try {
    //Validation of email
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new AppError(
        "Authentication failed Email / password does not correct.",
        401
      );
    }

    //validation of enable
    if (!user.enabled) {
      throw new AppError("Authentication failed : User disabled", 401);
    }
    //Validation of password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new AppError(
        "Authentication failed Email / password does not correct.",
        401
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

const validToken = async (token) => {
  try {
    // validar que el token venga como parametro, valid that token comes who parameter
    if (!token) {
      throw new AppError("Authentication failed! Token required", 401);
    }

    logger.info(`Token received: ${token}`);

    // validar que el token sea integro, valid that token is complete
    let id;
    try {
      const  obj= await jwt.verify(token, config.auth.secret);
      id = obj.id
      
    } catch (error) {
      throw new AppError("Authentication failed! Invalid Token", 401);
    }

    logger.info(`User id in the token: ${id}`);

    // validar si el usuario esta en la base de datos, valid if the user exist in db
    const user = await userService.findById(id);
    if (!user) {
      throw new AppError("Authentication failed! Invalid Token - user not found", 401);
    }

    // validar si el usuario esta habilitado, valid if the user is enabled
    if (!user.enabled) {
      throw new AppError("Authentication failed! User disabled", 401);
    }

    // retornar el usuario, return user
    return user;
  } catch (error) {
    throw error;
  }
};

const validRole = (user,...roles) =>{
  if(!roles.includes(user.role)) {
    throw new AppError('Authorization failed! User without the privileges', 403)
  }
  return true;

} 

_encrypt = (id) => {
  return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });
};

module.exports = { login, validToken, validRole };
