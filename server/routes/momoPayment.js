const express = require("express");
const momoPaymentController = require("../controllers/momoPaymentController");

const router = express.Router();

router.get("/momoPayment", momoPaymentController.getAll);
router.post("/momoPayment", momoPaymentController.create);
router.post(
  "/momoPayment/checkOrderStatus",
  momoPaymentController.confirmOrder
);

module.exports = router;
