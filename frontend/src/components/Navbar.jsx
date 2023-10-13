// Arvan Talaska
// 103952502
// Homepage

import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">Cybuzz</Link>
      </div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">
        <span></span>
      </label>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Upload">Upload</Link>
        </li>
        <li>
          <Link to="/Account">Account</Link>
        </li>
        <li>
          <Link to="/Payment">Payments</Link>
        </li>
        <li>
          <Link to="/Login">
            <button className="nav-button">Login</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
