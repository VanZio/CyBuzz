// Thao Linh Nguyen 
// 103843952
// Sign In page


import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform authentication logic using the entered username and password
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="login-container">
        {/* Login form */}
        <div className="form-container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <p className="p">
                <strong>New user? </strong>
                <Link to="/CreateAccount">Sign Up</Link>
              </p>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
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
              <button type="submit">Sign In</button>
            </Link>
          </form>
        </div>
        <div className="image-container">
          {/* image link */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="330.907"
            height="275.585"
            viewBox="0 0 330.907 275.585"
          >
            <path
              id="Path"
              d="M555.031,475.179H691.594a73.21,73.21,0,1,1,0,33.063H656.581v11.808a16.531,16.531,0,0,1-33.062,0V508.241H599.9v30.7a16.531,16.531,0,0,1-33.063,0v-30.7H555.031a16.531,16.531,0,1,1,0-33.063Zm207.822,56.679a40.147,40.147,0,1,0-40.147-40.147A40.192,40.192,0,0,0,762.853,531.857Z"
              transform="translate(-183.895 -631.682) rotate(30)"
              fill="#007bff"
            />
          </svg>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
