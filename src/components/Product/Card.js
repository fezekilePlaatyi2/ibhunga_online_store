import React, { useContext } from "react";

const Card = ({ product }) => {
  return (
    <div className="product-card-small">
      {product.ItemName} <br></br>Price : R {product.ItemPrice}
    </div>
  );
};

export default Card;
