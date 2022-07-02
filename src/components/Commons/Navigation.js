import React, { useContext } from "react";
import firebaseConfig from "../../config.js";

const Navigation = ({ setComponentDisplay, cartProducts, setCartProducts }) => {
  const updateComponent = (componentName) => {
    setComponentDisplay(componentName);
  };

  return (
    <nav className="navbar navbar-expand-lg" id="navigation_bar">
      <h2
        className="navbar-brand navbar-inverse"
        onClick={() => updateComponent("all")}
      >
        IBhunga
      </h2>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link"></a>
          </li>
        </ul>
        <span className="nav-item" onClick={() => updateComponent("orders")}>
          <a className="nav-link">My Orders</a>
        </span>
        <span className="nav-item" onClick={() => updateComponent("cart")}>
          <a className="nav-link">({cartProducts.length})Cart</a>
        </span>
        <span className="nav-item">
          <a className="nav-link">Contact</a>
        </span>
        <span className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Account
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a
              className="dropdown-item"
              onClick={() => firebaseConfig.auth().signOut()}
            >
              Sign out
            </a>
            <a className="dropdown-item">My Profile</a>
            <div className="dropdown-divider" />
            <a className="dropdown-item">Get Help</a>
          </div>
        </span>
        <span className="nav-item action-btn">
          <button
            type="button"
            className="main-btn"
            onClick={() => setComponentDisplay("all")}
          >
            Shop Now
          </button>
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
