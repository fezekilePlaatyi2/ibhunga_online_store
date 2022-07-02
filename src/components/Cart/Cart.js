import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = ({ setComponentDisplay, cartProducts, setCartProducts }) => {
  const [paymentButtonDisabled, setPaymentButtonDisabled] = useState(false);

  const totalPrice = () => {
    return cartProducts.reduce((sum, item) => {
      return sum + item.ItemPrice * item.quantity;
    }, 0);
  };

  const handledChangeQuantity = (e, product) => {
    if (product.InStockQuantity <=1) {
      document.getElementById("quantity").value = 1;
      e.preventDefault();
      return;
    }
    let tempCart = [...cartProducts];
    const index = tempCart.findIndex(
      (myItem) => myItem.ItemId === product.ItemId
    );
    if (index !== -1) {
      const maximumAvaliable = product.InStockQuantity;
      if (e.target.value <= maximumAvaliable) {
        tempCart[index].quantity = e.target.value;
        setCartProducts(tempCart);
      } else {
        e.target.value = maximumAvaliable;
        alert("Maximum in stock reached.");
      }
    }
  };

  const prepareCheckout = () => {
    setPaymentButtonDisabled(true);
    var paymentPayload = {
      CurrencyCode: "ZAR",
      Amount: totalPrice(),
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
      .post(`http://localhost:3000/payment-checkout`, paymentPayload)
      .then((res) => {
        if (
          res.data.url !== null &&
          res.data.url !== undefined &&
          res.data.url !== ""
        ) {
          window.location.href = res.data.url;
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

  const addToWishList = (item) => {
    alert("You had added item to Wishlist.");
    removeFromCart(item);
  };

  const removeFromCart = (item) => {
    let tempCart = [...cartProducts];
    const index = tempCart.findIndex((myItem) => myItem.ItemId === item.ItemId);

    if (index !== -1) {
      tempCart.splice(index, 1);
      setCartProducts(tempCart);
    }

    if (tempCart.length === 0) {
      setComponentDisplay("all");
      alert("You had removed everything from cart.");
    }
  };

  if (cartProducts.length === 0)
    return (
      <div className="cart">
        <div className="cart-container">
          <div className="container">
            <p>The Cart is empty!</p>
            <button
              type="button"
              className="main-btn"
              onClick={() => setComponentDisplay("all")}
            >
              Shop Now
            </button>{" "}
          </div>
        </div>
      </div>
    );

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="container">
          <h3>Items On Order</h3>
          <br></br>Total: R {parseFloat(totalPrice()).toFixed(2)}
          <ul>
            {cartProducts.map((item, index) => (
              <li key={index}>
                <div className="row">
                  <div className="col-sm-12 cart-item">
                    <div className="row">
                      <div className="col-sm-7">
                        <h4>{item.ItemName}</h4>
                        <p>
                          {item.ProductDesc}
                          <a href="#" className="cart-item-more-details">
                            more...
                          </a>
                        </p>
                        <h6>Price: R{parseFloat(item.ItemPrice).toFixed(2)}</h6>
                        <h6 className="InStockQuantity-placeholder">
                          <b>
                            InStockQuantity:{" "}
                            {item.InStockQuantity > 0 ? "Yes" : "No"}
                          </b>
                        </h6>
                        <input
                          type="number"
                          min="1"
                          id="quantity"
                          value={item.quantity}
                          onChange={(e) => handledChangeQuantity(e, item)}
                        />
                      </div>
                      <div className="col-sm-5">
                        <img
                          src={item.pictures[0]}
                          height="150"
                          alt="Product Picture"
                        />
                      </div>
                    </div>
                    <div className="remove-from-cart">
                      <i
                        className="fa fa-trash"
                        onClick={() => removeFromCart(item)}
                      >
                        {"\u00A0"}
                        <small className="remove-from-cart-text">remove</small>
                      </i>
                      {"\u00A0"}
                      {"\u00A0"}
                      <i
                        className="fa fa-heart"
                        onClick={() => addToWishList(item)}
                      >
                        <small className="remove-from-cart-text">
                          {"\u00A0"} move to wishlist
                        </small>
                      </i>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="delivery-address">
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
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Add any notes(optional)"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
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
