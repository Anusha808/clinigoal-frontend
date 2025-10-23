import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserShield, FaEnvelope, FaLock, FaSave } from "react-icons/fa";
import "./AdminSettings.css";

// ✅ Updated backend link
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://clinigoal-backend.onrender.com/api";

const AdminSettings = () => {
  const [adminData, setAdminData] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mocked Admin Data
    setAdminData({
      name: "Clinigoal Admin",
      email: "admin@clinigoal.com",
    });
  }, []);

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handlePasswordSave = async () => {
    setMessage("");
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("❌ New passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      // ✅ Correct backend route
      await axios.put(`${API_BASE_URL}/admin/change-password`, passwords);
      setMessage("✅ Password changed successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="settings-container"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="settings-title">⚙️ Admin Settings</h2>

      <div className="settings-card">
        <h3 className="section-title">👤 Profile Information</h3>

        <div className="settings-item">
          <label>
            <FaUserShield className="icon" /> Admin Name
          </label>
          <input
            type="text"
            value={adminData.name}
            readOnly
            className="readonly"
          />
        </div>

        <div className="settings-item">
          <label>
            <FaEnvelope className="icon" /> Email Address
          </label>
          <input
            type="email"
            value={adminData.email}
            readOnly
            className="readonly"
          />
        </div>
      </div>

      <div className="settings-card password-section">
        <h3 className="section-title">🔐 Change Password</h3>

        <div className="settings-item">
          <label>
            <FaLock className="icon" /> Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Enter current password"
          />
        </div>

        <div className="settings-item">
          <label>
            <FaLock className="icon" /> New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
          />
        </div>

        <div className="settings-item">
          <label>
            <FaLock className="icon" /> Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm new password"
          />
        </div>

        <button
          className="save-btn"
          onClick={handlePasswordSave}
          disabled={loading}
        >
          <FaSave /> {loading ? "Updating..." : "Change Password"}
        </button>

        {message && <p className="status-message">{message}</p>}
      </div>
    </motion.div>
  );
};

export default AdminSettings;
