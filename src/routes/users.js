const { Router } = require("express");
const {
  postRequestValidations,
  putRequestValidations,
} = require("../middlewares/users");
const {
  getAllUsers,
  createUser,
  updateUser,
  getUserByid,
  deleteUser,
} = require("../controllers/users");

const router = Router();

router.post("/", postRequestValidations, createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserByid);
router.put("/:id", putRequestValidations, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
