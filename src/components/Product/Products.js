import React, { useState, useEffect } from "react";
import Card from "./Card";

const Products = ({ categories, category, cartProducts, setCartProducts }) => {
  const [products, updateProducts] = useState([]);

  useEffect(() => {
    updateProducts(
      categories[categories.findIndex((element) => element.Index === category)]
        .Items
    );
  }, [category]);

  return (
    <>
      <div className="products-part">
        {products.map((product, index) => (
          <div className="product-col" key={index}>
            <Card
              product={product}
              category={category}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
