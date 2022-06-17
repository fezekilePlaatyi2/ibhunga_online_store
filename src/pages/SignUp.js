import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../config";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      setCurrentUser(true);
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <div className="signup-page">
        <div className="content">
          <div className="form-container">
          <div className="header-part">
              <h3>Create Account</h3>
              <p>Enter your details so you can start placing orders.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-12">
                  <input type="text" name="name" placeholder="Name" />
                </div>
                <div className="col-sm-12">
                <input type="text" name="surname" placeholder="Surname" />
                </div>
              </div>
              <input type="email" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
              <button type="submit" className="main-btn">Register</button>
            </form>
          </div>
          <div className="other-links">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
