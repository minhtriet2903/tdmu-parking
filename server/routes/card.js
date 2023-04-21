const express = require("express");
const cardController = require("../controllers/cardController");

const router = express.Router();

router.get("/card", cardController.getAll);
router.get("/card/user", cardController.getAllCardByUserId);
router.post("/card", cardController.createCard);
router.get("/card/:id", cardController.getCardById);
router.get("/cardByHardCardId", cardController.getCardByHardCardId);
router.get("/freeCard", cardController.getAllFreeCard);
router.put("/cardBikeTicket", cardController.updateBikeTicketById);
router.put("/cardUserId", cardController.updateUserByCardId);

module.exports = router;
