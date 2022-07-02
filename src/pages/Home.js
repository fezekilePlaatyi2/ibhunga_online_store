import React, { useState, useEffect } from "react";
import Navigation from "../components/Commons/Navigation";
import ProductsHome from "../components/Product/ProductsHome";
import Product from "../components/Product/Product";
import Cart from "../components/Cart/Cart";
import Orders from "../components/Orders/Orders";
import * as qs from "query-string";
import shoppingImg from "../assets/img/shopping.svg";
import dairyProducts from "../assets/img/dairy.jpg";
import Store from "../services/Store";
import { ToastContainer, toast } from "react-toast";

const Home = () => {
  const parsed = qs.parse(window.location.search);
  const store = new Store();
  const [categories, setCategories] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [component, setComponentDisplay] = useState("");
  const [category, updateCategory] = useState("");
  const [productOnView, setProductOnView] = useState({});

  const updateComponent = (componentName) => {
    console.log(componentName);
    setComponentDisplay(componentName);
  };

  useEffect(() => {
    categories.length > 0 && updateCategory(categories[0].Index);
  }, [categories]);

  useEffect(async () => {
    try {
      const productCategoriesResponse = await store.getAllCategories();
      const productCategories = productCategoriesResponse.docs.map((doc) => {
        return {
          Index: doc.id,
          Name: doc.data().Name,
        };
      });
      setCategories(productCategories);
    } catch (e) {
      console.log(e);
      toast("An error occured while proccessing your request");
    }
  }, []);

  useEffect(() => {
    categories.forEach((category, index) => {
      store.getProductsByCategoriesId(category.Index, {
        next: (querySnapshot) => {
          const categoryProductsList = querySnapshot.docs.map((docSnapshot) => {
            return {
              ItemId: docSnapshot.id,
              ItemName: docSnapshot.data().name,
              ItemPrice: docSnapshot.data().price,
              InStockQuantity: docSnapshot.data().inStockQuantity,
              ProductDesc: docSnapshot.data().productDesc,
              pictures: docSnapshot.data().pictures,
            };
          });

          let tempCategoryProducts = categories;

          const categoryIndex = categories.findIndex(
            (myCategory) => myCategory.Index === category.Index
          );

          if (categoryIndex !== -1) {
            tempCategoryProducts[categoryIndex].Items = categoryProductsList;
          }

          querySnapshot.docChanges().forEach((change) => {
            // console.log((change.doc.id, change.doc.data()))
            if (change.type === "modified") {
              console.log("Modified document: ", change.doc.data());
            }
            if (change.type === "removed") {
              console.log("Removed document: ", change.doc.data());
            }
          });
        },
        error: (error) => {
          console.log(error);
          toast("Error getting products");
        },
      });
    });
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
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        );
      }
      case "single": {
        return (
          <Product
            product={productOnView}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        );
      }

      case "cart": {
        return (
          <Cart
            setComponentDisplay={setComponentDisplay}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        );
      }

      case "orders": {
        return <Orders />;
      }

      default: {
        return (
          <>
            <div className="hero-part">
              <div className="text-side">
                <h1>Welcome to our store</h1>
                <p>
                  Ibhunga store is one of the cheapest shop selling a variety of
                  products. You can shop anything from our catalogue, and they
                  will be delivered to you instantly. Delivery time is same day
                  to orders placed before 3pm.
                </p>
                <button
                  type="button"
                  className="main-btn"
                  onClick={() => updateComponent("all")}
                >
                  Shop Now
                </button>
                <button type="button">Create account</button>
              </div>
              <div className="img-side">
                <img src={shoppingImg} alt="Shopping image" />
              </div>
            </div>
            <div className="featured-categories">
              <div className="header">
                <h2>Featured Categories</h2>
                <p>
                  We have more than 100 products available, here are our
                  categories.
                </p>
              </div>
              <div className="category-container">
                <div className="category">
                  <img src={dairyProducts} alt="Dairy Products" />
                  <h3>Diary Products</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <div className="category">
                  <img src={dairyProducts} alt="Dairy Products" />
                  <h3>Diary Products</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <div className="category">
                  <img src={dairyProducts} alt="Dairy Products" />
                  <h3>Diary Products</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <div className="category">
                  <img src={dairyProducts} alt="Dairy Products" />
                  <h3>Diary Products</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="navigation">
        <Navigation
          setComponentDisplay={setComponentDisplay}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
        />{" "}
      </div>
      <div className="main-content">{componentDisplay()}</div>
    </>
  );
};

export default Home;
