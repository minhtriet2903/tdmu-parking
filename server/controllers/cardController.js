const Card = require("../models/cardModel");

exports.getAll = (req, res) => {
  Card.find()
    .then((allCard) => {
      res.status(200).json({
        success: true,
        allCard: allCard,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.createCard = async (req, res) => {
  const card = new Card({
    BikeTicket: req.body.bikeTicket,
  });

  return card
    .save()
    .then((newCard) => {
      return res.status(201).json({
        success: true,
        message: "New card created successfully",
        newCard: newCard,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

exports.getCardById = async (req, res) => {
  const id = req.params.id;
  Card.findById(id)
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
};

exports.updateBikeTicketById = async (req, res) => {
  const id = req.body.id;
  const bikeTicket = req.body.bikeTicket;
  Card.findByIdAndUpdate(id, { BikeTicket: parseInt(bikeTicket) })
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Update failed",
        error: err.message,
      });
    });
};
