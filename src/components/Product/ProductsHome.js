import React, { useContext } from "react";
import Categories from "./Categories";
import Products from "./Products";

const ProductsHome = ({
  categories,
  category,
  updateCategory,
  cartProducts,
  setCartProducts,
}) => {
  return (
    <div className="products-home">
      <div className="side-bar">
        <Categories
          updateCategory={updateCategory}
          category={category}
          categories={categories}
        />
      </div>
      <div className="main-side">
        <div className="action-part">
          <div className="search">
            <div className="input-group mb-3">
              <input
                type="search"
                className="form-control"
                placeholder="Enter item name"
                aria-label="Enter item name"
                aria-describedby="button-addon2"
              />
              <button className="btn" type="button" id="button-addon2">
                Find
              </button>
            </div>
          </div>
        </div>
        <div className="products">
          <h2 className="category-name">
            {
              categories[
                categories.findIndex((element) => element.Index === category)
              ].Name
            }
          </h2>
          <Products
            categories={categories}
            category={category}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsHome;
