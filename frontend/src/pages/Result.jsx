import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Result.css";

const Result = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [contractName, setContractName] = useState("");
  const [contractId, setContractId] = useState("");

  useEffect(() => {
    // Fetch vulnerabilities from your API
    fetch("http://localhost:5000/api/results")
      .then((response) => response.json())
      .then((response) => {
        setVulnerabilities(response);
      })
      .catch((error) => console.error(error));

    // Fetch contract information from your API
    fetch("http://localhost:5000/api/reports")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array with a single item
        if (data.length > 0) {
          setContractName(data[0].contract_name);
          setContractId(data[0].report_id);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="result-container">
        <h1 className="center-heading">Result</h1>
        <p className="result-p">Contract name: {contractName}</p>
        <p className="result-p">Contract ID: {contractId}</p>
        {vulnerabilities.map((vulnerability) => (
          <details className="collapsible" key={vulnerability.vulnerability_id}>
            <summary>{vulnerability.vulnerability_name}</summary>
            <div className="paragraph-content">
              <p>Results: {vulnerability.results}</p>
              <p>Impact: {vulnerability.impact}</p>
              <p>Description: {vulnerability.description}</p>
            </div>
          </details>
        ))}
        <p className="result-p" id="result-p">
          {vulnerabilities.length} vulnerabilities found
        </p>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Result;