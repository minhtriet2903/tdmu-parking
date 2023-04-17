const MomoPayment = require("../models/momoPaymentModel");
const crypto = require("crypto");
const https = require("https");

exports.getAll = (req, res) => {
  MomoPayment.find()
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

// exports.create = async (req, res) => {
exports.create = async (req, res) => {
  // const body = new MomoPayment({
  //   Amount: req.body.amount,
  // });

  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  var orderInfo = "pay with MoMo";
  var redirectUrl = "http://localhost:3000/";
  var ipnUrl = "http://localhost:3000/";
  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  var amount = "5000";
  var requestType = "captureWallet";
  var extraData = ""; //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature

  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);
  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });
  //Create the HTTPS objects
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  //Send the request and get the response
  const postReq = https.request(options, (momoRes) => {
    console.log(`Status: ${momoRes.statusCode}`);
    console.log(`Headers: ${JSON.stringify(momoRes.headers)}`);
    momoRes.setEncoding("utf8");
    momoRes.on("data", (body) => {
      console.log("Body: ");
      console.log(body);
      // console.log("payUrl: ");
      // console.log(JSON.parse(body).payUrl);
      res.status(201).json({
        success: true,
        message: "Created successfully",
        data: JSON.parse(body),
      });
    });
    momoRes.on("end", () => {
      console.log("No more data in response.");
    });
  });

  postReq.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  postReq.write(requestBody);
  postReq.end();

  // return transaction
  //   .save()
  //   .then((body) => {
  //     return res.status(201).json({
  //       success: true,
  //       message: "Created successfully",
  //       data: body,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Server error. Please try again.",
  //       error: error.message,
  //     });
  //   });
};

exports.confirmOrder = async (req, res) => {
  // const body = new MomoPayment({
  //   Amount: req.body.amount,
  // });

  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = "MOMO1678296428097";
  var orderId = requestId;

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&orderId=" +
    orderId +
    "&partnerCode=" +
    partnerCode +
    "&requestId=" +
    requestId;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature

  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);
  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    requestId: requestId,
    orderId: orderId,
    signature: signature,
    lang: "en",
  });
  //Create the HTTPS objects
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/query",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  //Send the request and get the response
  const postReq = https.request(options, (momoRes) => {
    console.log(`Status: ${momoRes.statusCode}`);
    console.log(`Headers: ${JSON.stringify(momoRes.headers)}`);
    momoRes.setEncoding("utf8");
    momoRes.on("data", (body) => {
      console.log("Body: ");
      console.log(body);
      // console.log("payUrl: ");
      // console.log(JSON.parse(body).payUrl);
      res.status(201).json({
        success: true,
        message: "Successfully",
        data: JSON.parse(body),
      });
    });
    momoRes.on("end", () => {
      console.log("No more data in response.");
    });
  });

  postReq.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  postReq.write(requestBody);
  postReq.end();
};
