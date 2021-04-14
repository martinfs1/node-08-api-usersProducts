const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  getUserByid,
  deleteUser,
} = require("../controllers/users");

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserByid);
router.put("/:id", updateUser );
router.delete("/:id", deleteUser);

module.exports = router;