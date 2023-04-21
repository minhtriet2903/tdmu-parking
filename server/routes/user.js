const Router = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.get("/users", userController.getAll);
router.get("/users/email", userController.getUserByEmail);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUserById);
router.get("/users/:cardId", userController.getUserByCardId);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.post("/users/sendEmail", userController.sendMail);
router.put("/userAmount", userController.updateUserAmountById);

module.exports = router;
