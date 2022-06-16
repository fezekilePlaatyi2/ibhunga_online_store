import React, { useContext } from "react";

const Product = ({ product }) => {
  if (product.ItemId === "NotValid") {
    return (
      <>
        <h3>Warning</h3>
        <p>
          This product doesn't exist. Product may have been deleted or the user
          has modified the product original URL.
        </p>
        <p>
          Click <a href="/">here</a> to go to home.
        </p>
      </>
    );
  }

  return (
    <>
      Single Product
      <h3> {product.ItemName} </h3>
      <br></br>
      <h4>
        <b>Price: R{product.ItemPrice}</b>
      </h4>
    </>
  );
};

export default Product;
