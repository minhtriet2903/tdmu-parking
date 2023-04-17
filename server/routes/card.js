const express = require("express");
const cardController = require("../controllers/cardController");

const router = express.Router();

router.get("/card", cardController.getAll);
router.post("/card", cardController.createCard);
router.get("/card/:id", cardController.getCardById);
router.put("/cardBikeTicket", cardController.updateBikeTicketById);

module.exports = router;
