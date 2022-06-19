import React, { useContext } from "react";
import dairyProducts from "../../assets/img/dairy.jpg";

const Card = ({ product }) => {
  return (
    <>
      <div className="product-card">
        <div className="img-container">
          <img src={dairyProducts} alt="Dairy Products" />
        </div>
        <div className="product-info">
          <h4 className="product-name">{product.ItemName}</h4>
          <p className="product-desc">
            {product.ProductDesc}
          </p>
          <h3 className="product-price">R{product.ItemPrice}</h3>
        </div>
        <span className="in-stock" title={product.InStockQuantity + " items in stock"}>{product.InStockQuantity}</span>
        <button type="button" className="add-to-cart main-btn"><i className="fa fa-shopping-cart"></i></button>
      </div>
    </>
  );
};

export default Card;
