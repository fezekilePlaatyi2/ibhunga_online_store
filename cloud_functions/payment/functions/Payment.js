require("dotenv").config();
const crypto = require("crypto");
const https = require("https");
const SITE_CODE = process.env.SITE_CODE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY;
const IBHUNGA_STORE_BANK_REFERENCE = process.env.IBHUNGA_STORE_BANK_REFERENCE;

const makeHash = (data) => {
  let stringToHash = "";
  for (const [key, value] of Object.entries(data)) {
    let row = value;
    stringToHash += row;
  }
  stringToHash = stringToHash + PRIVATE_KEY;
  var hash = crypto
    .createHash("sha512")
    .update(stringToHash.toLowerCase())
    .digest("hex");
  return hash;
};

module.exports = {
  paymentCheckout: (req, res) => {
    return new Promise((resolve) => {
      let {
        TransactionReference,
        Customer,
        Optional1,
        Optional2,
        Optional3,
        Amount,
      } = req.body;

      var postData = {
        SiteCode: SITE_CODE,
        CountryCode: "ZA",
        CurrencyCode: "ZAR",
        Amount: Amount,
        TransactionReference: TransactionReference,
        BankReference: IBHUNGA_STORE_BANK_REFERENCE,
        Optional1: Optional1,
        Optional2: Optional2,
        Optional3: Optional3,
        Customer: Customer,
        CancelUrl:
          "https://us-central1-vink8-za.cloudfunctions.net/payment/paymentCancelation",
        ErrorUrl:
          "https://us-central1-vink8-za.cloudfunctions.net/payment/paymentError",
        SuccessUrl:
          "https://us-central1-vink8-za.cloudfunctions.net/payment/paymentSuccess",
        IsTest: "false",
      };

      let stringToHash = makeHash(postData);
      postData["HashCheck"] = stringToHash;
      var urlPath = "/PostPaymentRequest";
      var url = "stagingapi.ozow.com";

      var options = {
        host: url,
        path: urlPath,
        method: "POST",
        headers: {
          ApiKey: API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
 
      var postRequest = https.request(options, function (res) {
        res.setEncoding("utf8");
        res.on("data", function (chunk) {
          jsonRes = JSON.parse(chunk);
          resolve(jsonRes);
        });
        res.on("error", function (chunk) {
          jsonRes = JSON.parse(chunk);
          resolve(jsonRes);
        });
      });
      postRequest.write(JSON.stringify(postData));
      postRequest.end();
    });
  },
};
