// Arvan Talaska
// 103952502
// Homepage

import React from "react";
import "./App.css";
import Navbar from "../src/components/Navbar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="home">
      <Navbar></Navbar> {/* Navigation bar Component */}
      <header className="banner">
        <div className="banner-content">
          {" "}
          {/* Homepage banner and styling */}
          <h1>Verify Smart Contracts with Confidence</h1>
          <p>
            Ensure the security and integrity of your blockchain smart
            contracts.
          </p>
          <Link to="/upload">
            <button className="home-button">Get Started</button>
          </Link>
        </div>
      </header>
      <section className="features">
        {" "}
        {/* adding features of the website within grids using MUI */}
        <div item xs={4}>
          <div className="feature">
            <h2>Transparent Analysis</h2>
            <p>
              Gain insights into the inner workings of your smart contracts
              through detailed analysis reports.
            </p>
          </div>
        </div>
        <div item xs={4}>
          <div className="feature">
            <h2>Security Audits</h2>
            <p>
              Identify vulnerabilities and potential risks in your smart
              contracts with thorough security audits.
            </p>
          </div>
        </div>
        <div item xs={4}>
          <div className="feature">
            <h2>User-Friendly Interface</h2>
            <p>
              Our platform offers an intuitive interface for easy interaction
              and understanding of your contract's code.
            </p>
          </div>
        </div>
      </section>
      <Footer></Footer> {/* Footer component */}
    </div>
  );
}

export default App;
// import React, { useState } from "react";

// function App() {
//   const [response, setResponse] = useState(null);

//   const handleTestRequest = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/test/", {
//         method: "POST",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setResponse(data);
//       } else {
//         setResponse({ error: "Request failed" });
//       }
//     } catch (error) {
//       setResponse({ error: "An error occurred" });
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleTestRequest}>Make Test Request</button>
//       <div>
//         <h2>Response:</h2>
//         <pre>{JSON.stringify(response, null, 2)}</pre>
//       </div>
//     </div>
//   );
// }

// export default App;
