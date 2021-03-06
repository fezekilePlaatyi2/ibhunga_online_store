const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());
var Payment = require("./Payment");

const PORT = 7000;

app.post("/paymentCheckout", (req, res) => {
  paymentCheckout(req, res);
});

app.get("/paymentNotifications", (req, res) => {
  console.log(`Payment notification ${req} ${res}`);
  res.send({ Results: req });
});

app.get("/paymentSuccess", (req, res) => {
  console.log(`Payment Success ${req} ${res}`);
  res.send({ Results: req });
});

app.get("/paymentCancelation", (req, res) => {
  console.log(`Payment Cancelation ${req} ${res}`);
  res.send({ Results: req });
});

app.get("/paymentError", (req, res) => {
  console.log(`Payment Error ${req} ${res}`);
  res.send({ Results: req });
});

app.post("/paymentNotifications", (req, res) => {
  console.log(`Payment notification ${req} ${res}`);
  res.send({ Results: req });
});

app.post("/paymentSuccess", (req, res) => {
  console.log(`Payment Success ${req} ${res}`);
  res.send({ Results: req });
});

app.post("/paymentCancelation", (req, res) => {
  console.log(`Payment Cancelation ${req} ${res}`);
  res.send({ Results: req });
});

app.post("/paymentError", (req, res) => {
  console.log(`Payment Error ${req} ${res}`);
  res.send({ Results: req });
});

app.listen(PORT, () => {
  console.log(`Server started at port - ${PORT}`);
});

const paymentCheckout = (req, res) => {
  Payment.paymentCheckout(req, res)
    .then((result) => {
      // res.send(jsonRes);
      console.log(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.app = functions.https.onRequest(app);
