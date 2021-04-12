const express = require("express");
const User = require("../models/users");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = async (req, res, next) => {
  try {
    let user = req.body;
    user = await User.create(user);
    const result = {
      message: "User created",
      user,
    };
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let user = req.body;
    await User.updateOne(user);
    user.id = id;

    const result = {
      message: "User updated",
      user,
    };
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updatePartialUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;
  user.id = id;

  const result = {
    message: "User updated with patch ",
    user,
  };
  res.json(result);
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.remove();
    // const id = req.params.id
    const result = {
      message: `User with id: ${id} deleted `,
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  updatePartialUser,
  deleteUser,
};
