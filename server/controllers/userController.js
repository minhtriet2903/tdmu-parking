const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//Thiện<
const nodeMailer = require("nodemailer");
//Thiện>
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getAll = (req, res) => {
  User.find()
    .then((allUser) => {
      res.status(200).json({
        success: true,
        User: allUser,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

const getUserByEmail = (req, res) => {
  const { email } = req.query;
  if (email) {
    User.find({ Email: { $regex: email } })
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "This user does not exist",
          error: err.message,
        });
      });
  }
};

const createUserByCardId = (req, res) => {
  const { cardId, studentCode, name } = req.body;
  const users = new User({
    CardId: cardId,
    StudentCode: studentCode,
    Name: name,
  });

  return users
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: "New user created successfully",
        user: newUser,
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

const updateUserAmountById = (req, res) => {
  const id = req.body.id;
  const chargeAmount = req.body.chargeAmount;
  User.findByIdAndUpdate(id, { CurrentAmount: parseInt(chargeAmount) })
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

const getUserById = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
};

const getUserByCardId = (req, res) => {
  User.find({ CardId: req.params.cardId })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This card does not exist",
        error: err.message,
      });
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .exec()
    .then(() => {
      res.status(204).json({
        success: true,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};
//Thiện<
const sendMail = (req, res) => {
  //guesswhoisthis111222@gmail.com
  const adminEmail = "guesswhoisthis111222@gmail.com";
  const adminPassword = "guesswhoisthis";
  const mailHost = "smtp.gmail.com";
  const to = req.body.email;
  const subject = req.body.subject;
  const htmlContent = req.body.htmlContent;
  const mailPort = 25;

  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  console.log(options);
  res.status(404).send({
    message: "Chắc gửi rồi á",
  });
  transporter.sendMail(options, function (err, data) {
    if (err) {
      console.log(err);
    } else console.log("mail has sent");
  });
  /*  return transporter.sendMail(options); */
};

//Thiện>
const updateUser = async (req, res) => {
  const id = req.params.id;
  const salt = await bcrypt.genSalt();
  if (req.body.password)
    req.body.password = await bcrypt.hash(req.body.password, salt);
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ success: true });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
      });
    });
};

module.exports = {
  updateUserAmountById,
  getUserById,
  updateUser,
  getUserByEmail,
  deleteUser,
  sendMail: sendMail,
  getUserByCardId,
  createUserByCardId,
  getAll,
};
