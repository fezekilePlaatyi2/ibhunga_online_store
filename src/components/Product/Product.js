import React, { useContext } from "react";
import dairyProducts from "../../assets/img/dairy.jpg";

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
      <div className="single-product">
        <div className="img-container">
        <img src={dairyProducts} alt="Dairy Products" />
        </div>
        <h3> {product.ItemName} </h3>
        <p className="product-desc">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics</p>
        <h4>
          <b>Price: R{product.ItemPrice}</b>
        </h4>
      </div>
    </>
  );
};

export default Product;
