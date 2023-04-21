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

exports.getAllFreeCard = (req, res) => {
  Card.find({ userId: "" })
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

exports.getAllCardByUserId = (req, res) => {
  Card.find({ userId: req.query.userId })
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
    HardCardId: req.body.hardCardId,
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

exports.getCardByHardCardId = async (req, res) => {
  Card.find({ HardCardId: req.query.hardCardId })
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
  const phieuXeTheoGoi = req.body.phieuXeTheoGoi;
  const hanSuDung = req.body.hanSuDung;

  if (phieuXeTheoGoi) {
    Card.findByIdAndUpdate(id, {
      PhieuXeTheoGoi: phieuXeTheoGoi,
      HanSuDungGoiGuiXe: hanSuDung,
    })
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
  } else {
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
  }
};

exports.updateUserByCardId = async (req, res) => {
  const id = req.body.id;
  const userId = req.body.userId;
  Card.findByIdAndUpdate(id, { userId: userId })
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
