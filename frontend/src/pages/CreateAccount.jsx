//Thao Linh Nguyen
// 103843952
// Sign Up page

import React, { useState } from "react";
import "./CreateAccount.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

//  render a form for users to input their username, email, and password when creating an account.
const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    // event.preventDefault(); prevent the page from automatically reloading upon form submisson
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="create-account-container">
        <h2>Create Account</h2>
        {/* Sign Up form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Link to="/Account">
            <button type="submit">Sign Up</button>
          </Link>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CreateAccount;
