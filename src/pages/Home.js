import React, { useState, useEffect } from "react";
import Navigation from "../components/Commons/Navigation";
import ProductsHome from "../components/Product/ProductsHome";
import Product from "../components/Product/Product";
import Cart from "../components/Cart/Cart";
import * as qs from "query-string";

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
            Home <button onClick={() => updateComponent("all")}>Shop</button>
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
