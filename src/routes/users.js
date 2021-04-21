const { Router } = require("express");
const {
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
  getAllRequestValidations,
  getRequestValidations,
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
router.get("/", getAllRequestValidations, getAllUsers);
router.get("/:id", getRequestValidations, getUserByid);
router.put("/:id", putRequestValidations, updateUser);
router.delete("/:id",deleteRequestValidations, deleteUser);

module.exports = router;
