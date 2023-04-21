const express = require("express");
const TransactionController = require("../controllers/transactionController");

const router = express.Router();

router.get("/transaction", TransactionController.getAll);
router.get("/transaction/user", TransactionController.getAllByUserId);
router.post("/transaction", TransactionController.createTransaction);
router.put("/transaction", TransactionController.updateTransInfo);

module.exports = router;
