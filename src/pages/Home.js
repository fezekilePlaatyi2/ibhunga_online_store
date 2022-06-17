import React, { useState, useEffect } from "react";
import Navigation from "../components/Commons/Navigation";
import ProductsHome from "../components/Product/ProductsHome";
import Product from "../components/Product/Product";
import Cart from "../components/Cart/Cart";
import * as qs from "query-string";
import shoppingImg from "../assets/img/Shopping.svg"

const categories = [
  {
    Index: "diary",
    Name: "Diary Products",
    Items: [
      {
        ItemId: "Yogurt1",
        ItemName: "Yogurt 1",
        ItemPrice: 11.0,
        InStockQuantity: 30,
      },
      {
        ItemId: "Yogurt2",
        ItemName: "Yogurt 2",
        ItemPrice: 11.0,
        InStockQuantity: 30,
      },
    ],
  },
  {
    Index: "drinks",
    Name: "Drinks",
    Items: [
      {
        ItemId: "EnegryDrink1",
        ItemName: "Enegry Drink 1",
        ItemPrice: 11.0,
        InStockQuantity: 30,
      },
      {
        ItemId: "EnegryDrink2",
        ItemName: "Enegry Drink  2",
        ItemPrice: 11.0,
        InStockQuantity: 30,
      },
    ],
  },
];

const Home = (props) => {
  const parsed = qs.parse(window.location.search);
  const [component, setComponentDisplay] = useState("");
  const [category, updateCategory] = useState("");
  const [productOnView, setProductOnView] = useState({});

  const updateComponent = (componentName) => {
    console.log(componentName);
    setComponentDisplay(componentName);
  };

  useEffect(() => {
    updateCategory(categories[0].Index);
  }, [categories]);

  useEffect(() => {
    if ("product_id" in parsed) {
      let found = false;

      categories.forEach((category, categoryIndex) => {
        const index = category.Items.findIndex(
          (item) => item.ItemId === parsed.product_id
        );

        if (index !== -1) {
          found = true;
          const product = categories[categoryIndex].Items[index];
          setProductOnView(product);
        }
      });

      updateComponent("single");

      if (!found) {
        setProductOnView({
          ItemId: "NotValid",
        });
      }
    }
  }, []);

  const componentDisplay = () => {
    switch (component) {
      case "all": {
        return (
          <ProductsHome
            updateCategory={updateCategory}
            category={category}
            categories={categories}
          />
        );
      }
      case "single": {
        return <Product product={productOnView} />;
      }

      case "cart": {
        return <Cart />;
      }

      case "orders": {
        return <>My Orders</>;
      }

      default: {
        return (
          <>
            <div className="hero-part">
              <div className="text-side">
                <h1>Welcome to our store</h1>
                <p>
                  Ibhunga store is one of the cheapest shop selling a variety of products. You can shop anything from our catalogue, and they will be delivered to you instantly. Delivery time is same day to orders placed before 3pm. 
                </p>
                <button type="button" className="main-btn" onClick={() => updateComponent("all")}>Shop Now</button>
              </div>
              <div className="img-side">
                <img src={shoppingImg} alt="Shopping image" />
              </div>
            </div>
            
          </>
        );
      }
    }
  };

  return (
    <>
      <Navigation setComponentDisplay={setComponentDisplay} />
      {componentDisplay()}
    </>
  );
};

export default Home;
