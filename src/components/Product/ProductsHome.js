import React, { useContext } from "react";
import Categories from "./Categories";
import Products from "./Products";

const ProductsHome = ({ categories, category, updateCategory }) => {
  return (
    <div className="products-home">
      <div className="side-bar">
        <Categories updateCategory={updateCategory} categories={categories} />
      </div>
      <div className="main-side">
        <div className="action-part">
          <div className="search">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-success btn-md">search...</button>
          </div>
        </div>
        <h2>
            <b>
              {
                categories[
                  categories.findIndex((element) => element.Index === category)
                ].Name
              }
            </b>
          </h2>
          <Products categories={categories} category={category} />
      </div>
    </div>
  );
};

export default ProductsHome;
