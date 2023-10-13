import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Upload.css";
import axios from "axios";

function Upload() {
  const [, setfileURL] = useState("");
  const [selectedFile, setselectedFile] = useState(null);
  const [uploadedFile, setuploadedFile] = useState({});
  const [isUploading, setisUploading] = useState(false);
  const [isFileUploaded, setisFileUploaded] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [contractName, setContractName] = useState("");

  let uploadInput = React.createRef();

  const handleSelectFile = (e) => {
    const selectedFileList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      selectedFileList.push(e.target.files.item(i));
    }
    setselectedFile(selectedFileList);
  };

  const handleUploadFile = async (ev) => {
    ev.preventDefault();
    setisFileUploaded(false);
    setUploadFailed(false);

    setisUploading(true);
    const data = new FormData();
    for (let i = 0; i < uploadInput.files.length; i++) {
      data.append("file", uploadInput.files[i], uploadInput.files[i].name);
    }
    data.append("contractName", contractName); // Adding contract name to the FormData

    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setuploadProgress(Math.round((loaded / total) * 100));
        },
      };
      const response = await axios.post(
        "http://localhost:5000/upload",
        data,
        config
      );
      const body = response.data;
      console.log(body);
      setfileURL(`http://localhost:5000/${body.filename}`);
      if (response.status === 200) {
        setisFileUploaded(true);
        setisUploading(false);
        setuploadedFile(selectedFile);

      } else {
        setUploadFailed(true);
        setisUploading(false);
      }
    } catch (error) {
      console.error(error);
      setUploadFailed(true);
      setisUploading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="upload-container">
        <div></div>
        <div className="form-container">
          <form onSubmit={handleUploadFile}>
            <h1>Upload Smart Contract</h1>
            <div className="form-group">
              <label htmlFor="file">
                Select Smart Contract to upload
                <input
                  id="file"
                  type="file"
                  multiple
                  ref={(ref) => {
                    uploadInput = ref;
                  }}
                  onChange={handleSelectFile}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="contractName">Contract Name</label>
              <input
                type="text"
                id="contractName"
                value={contractName} // Bind input value to contractName state
                onChange={(e) => setContractName(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit">Upload</button>
            </div>
            {isUploading && (
              <>
                <progress
                  value={uploadProgress}
                  max="100"
                  className="progress-bar"
                >
                  {uploadProgress}%
                </progress>
              </>
            )}
            {isFileUploaded && (
              <>
                <div>
                  <div className="response">
                    <h3>Smart Contract uploaded successfully</h3>
                    <h4>Smart Contract will be analyzed and displayed in results page</h4>
                  </div>
                </div>
                <div>
                  <p>Uploaded file</p>
                  <div>
                    {uploadedFile &&
                      uploadedFile.map((item, index) => {
                        return (
                          <p key={index}>
                            <b>{index + 1}. </b>
                            {item.name}
                          </p>
                        );
                      })}
                  </div>
                </div>
              </>
            )}
            {uploadFailed && (
              <div className="response">
                <h3>Failed to upload file (Only .sol files allowed)</h3>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Upload;
