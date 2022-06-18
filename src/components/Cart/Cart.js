import React, { useState } from "react";
import axios from "axios";
import dairyProducts from "../../assets/img/dairy.jpg";
const itemsInOrder = [
  {
    ItemName: "Cheddar Cheese 900 g",
    ItemDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    InStock: "10 units",
    ItemImageUrl: dairyProducts,
    Quantity: 2,
    ItemPrice: 1212.23,
  },
  {
    ItemName: "Fresh & Creamy Mushroom Soup",
    ItemDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    InStock: "10 units",
    ItemImageUrl: dairyProducts,
    Quantity: 2,
    ItemPrice: 1212.23,
  },
];

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
    <div className="cart">
      <div className="cart-container">
        <div className="container">
          <h3>Items On Order</h3>
          <br></br>
          <ul>
            {itemsInOrder.map((item) => (
              <li>
                <div className="row">
                  <div className="col-sm-12 cart-item">
                    <div className="row">
                      <div className="col-sm-7">
                        <h4>{item.ItemName}</h4>
                        <p>
                          {item.ItemDescription}
                          <a href="#" className="cart-item-more-details">
                            more...
                          </a>
                        </p>
                        <h6>Price: R{item.ItemPrice}</h6>
                        <h6 className="instock-placeholder">
                          <b>Instock: Yes</b>
                        </h6>
                      </div>
                      <div className="col-sm-5">
                        <img
                          src={item.ItemImageUrl}
                          height="150"
                          alt="Dairy Products"
                        />
                      </div>
                    </div>
                    <div className="remove-from-cart">
                      <i class="fa fa-trash"></i>
                      {"\u00A0"}
                      <small className="remove-from-cart-text">remove</small>
                      {"\u00A0"}
                      {"\u00A0"}
                      <i class="fa fa-heart"></i>
                      <small className="remove-from-cart-text">
                        {"\u00A0"} move to wishlist
                      </small>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="row">
            <div className="col-sm-12">
              <div class="form-group">
                <label for="delivery-address">
                  <b>Delivery Address</b>
                </label>
                <textarea
                  className="form-control"
                  placeholder="Add address here..."
                ></textarea>
              </div>{" "}
            </div>{" "}
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div class="form-group">
                <textarea
                  className="form-control"
                  placeholder="Add any notes(optional)"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div class="form-group">
                <span className="nav-item action-btn">
                  <button
                    type="button"
                    className="main-btn"
                    disabled={paymentButtonDisabled}
                    onClick={() => prepareCheckout()}
                  >
                    Procceed to checkout...
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
