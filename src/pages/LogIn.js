import React, { useContext} from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Providers/Auth";
import firebaseConfig from "../config.js";

const LogIn = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <div className="login-page">
        <div className="content">
          <div className="form-container shadow">
            <div className="header-part">
              <h3>Welcome Back</h3>
              <p>Enter your credentials to access your account.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
              <button type="submit" className="main-btn">Submit</button>
            </form>
          </div>
          <div className="other-links">
            <p>Forgot your password? <a href="#">Reset password</a></p>
            <p>Don't have an account? <a href="/signup">Register now</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
