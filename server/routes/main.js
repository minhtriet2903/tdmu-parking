const express = require("express");
const TransactionController = require("../controllers/transactionController");

const router = express.Router();

router.get("/transaction", TransactionController.getAll);
router.post("/transaction", TransactionController.createTransaction);

module.exports = router;
