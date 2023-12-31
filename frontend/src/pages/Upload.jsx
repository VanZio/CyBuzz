// Arvan Talaska
// 103952502
// upload page

import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Upload.css";
import { Link } from "react-router-dom";

function Upload() {
  // State variables to manage form input and upload status
  const [contractName, setContractName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // This function is called when the file input changes
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // This function is called when the form is submitted to upload the file
  const handleUploadFile = async (e) => {
    e.preventDefault();

    if (!contractName || !selectedFile) {
      setUploadError("Please provide both contract name and a file.");
      return;
    }

    // Create a FormData object to send the file and contractName to the server
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("contractName", contractName);

    try {
      // Make an HTTP POST request to the server to upload the file
      const response = await axios.post("http://localhost:5000/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });
      //error checking
      if (response.status === 200) {
        setUploadStatus("success");
      } else {
        setUploadStatus("failed");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus("failed");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="upload-container">
        <div></div>
        <div className="form-container">
          <form onSubmit={handleUploadFile}>
            <h1>Upload Smart Contract</h1>
            <div className="form-group">
              <label htmlFor="file">Select Smart Contract to upload</label>
              <input
                id="file"
                type="file"
                accept=".sol"
                onChange={handleFileChange} //update file
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contractName">Contract Name</label>
              <input
                type="text"
                id="contractName"
                value={contractName}
                onChange={(e) => setContractName(e.target.value)} //update contract name
                required
              />
            </div>
            {uploadError && <div className="response">{uploadError}</div>}
            <button type="submit">Upload</button>
            {uploadProgress > 0 && (
              <progress value={uploadProgress} max="100" className="progress-bar"> 
                {uploadProgress}%
              </progress>
            )} 
            {uploadStatus === "success" && (
              <div className="response">
                <h3>Smart Contract uploaded successfully</h3>
                <h4>Smart Contract will be analyzed and displayed in <Link to="/Result">results page</Link></h4>
              </div>
            )}
            {uploadStatus === "failed" && (
              <div className="response">
                <h3>Failed to upload file (Only .sol files allowed)</h3>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Upload;
