import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./UserDashboard.css";

const AssignmentComponent = ({ onAssignmentComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!file) return alert("Please select a file!");
    setUploading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSuccess(true);
    onAssignmentComplete();
    setUploading(false);
  };

  return (
    <div className="assignment-content">
      <h4>Assignment Upload</h4>
      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="file" className="upload-btn">
        {file ? file.name : "Choose File"}
      </label>
      <button
        className="submit-assignment-btn"
        onClick={handleSubmit}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Submit Assignment"}
      </button>
      {success && (
        <p className="success-message">
          <FaCheckCircle /> Uploaded Successfully!
        </p>
      )}
    </div>
  );
};

export default AssignmentComponent;
