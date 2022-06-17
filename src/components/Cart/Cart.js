import React, { useState } from "react";
import axios from "axios";

const Cart = () => {
  const [paymentButtonDisabled, setPaymentButtonDisabled] = useState(false);

  const prepareCheckout = () => {
    setPaymentButtonDisabled(true);
    var paymentPayload = {
      CurrencyCode: "ZAR",
      Amount: "0.01",
      TransactionReference: "Test1",
      BankReference: "Test1",
      Optional1: "1",
      Optional2: "2",
      Optional3: "3",
      Optional4: "4",
      Optional5: "5",
      Customer: "Test Customer",
    };

    axios
      .post(`http://localhost:7000/paymentCheckout`, paymentPayload)
      .then((res) => {
        if (res.data.ErrorMessage === null) {
          window.location.href = res.data.Url;
        } else {
          setPaymentButtonDisabled(false);
          alert("An error occured, please try again.");
        }
      })
      .catch((err) => {
        setPaymentButtonDisabled(false);
        alert("An error occured, please try again.");
      });
  };

  return (
    <div className="container">
      <ul>
        <h3>Items On Order</h3>
        <li>Name and picture and option to increase quantity and remove</li>
      </ul>
      <button
        className="btn btn-lg btn-success"
        disabled={paymentButtonDisabled}
        onClick={() => prepareCheckout()}
      >
        Procceed to checkout
      </button>
    </div>
  );
};

export default Cart;
