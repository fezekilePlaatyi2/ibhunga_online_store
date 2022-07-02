import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toast";

const Card = ({ product, category, cartProducts, setCartProducts }) => {
  const [addToCarBtnDisabled, setDisable] = useState(false);

  const handledChangeQuantity = (e) => {
    if (product.InStockQuantity == 0) {
      document.getElementById("quantity").value = 0;
      e.preventDefault();
      return;
    }
    let tempCart = [...cartProducts];
    const index = tempCart.findIndex(
      (myItem) => myItem.ItemId === product.ItemId
    );
    if (index === -1) {
      addToCart(product);
    } else {
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

  const addToCart = (item) => {
    if (product.InStockQuantity == 0) return;
    let tempCart = [...cartProducts];
    const index = tempCart.findIndex((myItem) => myItem.ItemId === item.ItemId);
    if (index === -1) {
      document.getElementById("quantity").value = 1;
      item.quantity = 1;
      tempCart.push(item);
      setCartProducts(tempCart);
      setDisable(false);
    } else {
      document.getElementById("quantity").value = 0;
      tempCart.splice(index, 1);
      setCartProducts(tempCart);
      setDisable(true);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="product-card">
        <div className="img-container">
          <img src={product.pictures[0]} alt="Product Picture" />
        </div>
        <div className="product-info">
          <h4 className="product-name">{product.ItemName}</h4>
          <p className="product-desc">{product.ProductDesc}</p>
          <h3 className="product-price">R{  parseFloat(product.ItemPrice).toFixed(2)}</h3>
        </div>
        <span
          className="in-stock"
          title={product.InStockQuantity + " items in stock"}
        >
          {product.InStockQuantity}
        </span>

        <br />
        <input
          type="number"
          min="0"
          id="quantity"
          onChange={(e) => handledChangeQuantity(e)}
        />
        <br />
        <button
          type="button"
          className={`add-to-cart ${
            addToCarBtnDisabled && product.InStockQuantity > 0 ? "main-btn" : ""
          }`}
          onClick={() => addToCart(product)}
        >
          <i className="fa fa-shopping-cart"></i>
        </button>
      </div>
    </>
  );
};

export default Card;
