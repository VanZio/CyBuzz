// Elishua Ma
// 103989568
// Account Page
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Account.css';
import {Audits} from "./data";
import Table from "./Table";


function Account() {
    const [query, setQuery] = useState("");

    const keys = ["name","result","date"];
    
    const search = (data)=> {
      return data.filter
      (item=>keys.some(key=>item[key].toLowerCase().includes(query)));
    };
  return (
    <div id="account">
      <Navbar></Navbar>

      <h1>Account and History</h1>
        <div id="cont">

          <div id="audit">
            <h2>Audit History</h2>
            <input type="text" placeholder="Search..." className="search" 
            onChange={(e) => setQuery(e.target.value)}/> {/* search for entered text */}
            <div id="audit-cont">
              <Table data={search(Audits)} /> {/* Table created from array file (allows for search*/}

            </div>
          </div>
          

          <div id="info">
            <h2>Account Information</h2>
            <ul>
              <li><strong>Name</strong> <br/>James Willcock</li>
              <li><strong>Email</strong><br/>**********@hotmail.com</li>
              <li><strong>Phone Number</strong><br/>*******893</li>
              <li><strong>Plan</strong><br/>Standard</li>
            </ul>
            <button type="submit">Edit Account Settings</button>
          </div>
        </div>

      <Footer></Footer>
    </div>
  );
}

export default Account;
