const Transaction = require("../models/transactionModel");

exports.getAll = (req, res) => {
  Transaction.find()
    .then((allTransaction) => {
      res.status(200).json({
        success: true,
        Transaction: allTransaction,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.createTransaction = async (req, res) => {
  const transaction = new Transaction({
    Amount: req.body.amount,
    Method: req.body.method,
    TransType: req.body.transType,
  });

  return transaction
    .save()
    .then((newTrans) => {
      return res.status(201).json({
        success: true,
        message: "New trans created successfully",
        Course: newTrans,
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
