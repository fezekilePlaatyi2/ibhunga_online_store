const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());
var Payment = require("./Payment");

app.post("/payment-checkout", (req, res) => {
  Payment.paymentCheckout(req, res)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.log(error);
      res.send("error");
    });
});

app.listen(port, () => {
  console.log(`APP listening on port ${port}`);
});

exports.whatsapp_channel = functions.https.onRequest(app);
