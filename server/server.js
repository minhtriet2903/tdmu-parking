const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const express = require("express");
const cors = require("cors");
const mongoosePaginate = require("mongoose-paginate-v2");

const MainRoutes = require("./routes/main");
const UserRoutes = require("./routes/user");
const CardRoutes = require("./routes/card");
const momoPaymentRoute = require("./routes/momoPayment");

// set up express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(MainRoutes);
app.use(UserRoutes);
app.use(CardRoutes);
app.use(momoPaymentRoute);

mongoose.Promise = global.Promise;

// set up port number
const port = 5035;
// set up mongoose
mongoose
  .connect(
    "mongodb+srv://TDMUCOIN:TDMUCOIN@cluster0.qdbvgby.mongodb.net/?retryWrites=true&w=majority",
    // "mongodb://localhost:27017",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
