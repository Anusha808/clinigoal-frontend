import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./AdminUserTracking.css";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/admin/user-tracking"
    : "https://clinigoal-server-side.onrender.com/api/admin/user-tracking";

const AdminUserTracking = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all user tracking data
  useEffect(() => {
    fetchUserTracking();
  }, []);

  const fetchUserTracking = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("❌ Error fetching user tracking:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve / Reject certificate
  const handleCertificateUpdate = async (userId, status) => {
    try {
      await axios.put(`${API_BASE_URL}/${userId}/certificate`, {
        certificateStatus: status,
      });
      fetchUserTracking(); // refresh data
    } catch (err) {
      console.error("❌ Error updating certificate:", err);
    }
  };

  if (loading) return <p className="loading">Loading user activity...</p>;

  return (
    <div className="user-tracking-container">
      <motion.h2
        className="tracking-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        👥 User Tracking Dashboard
      </motion.h2>

      {users.length === 0 ? (
        <p className="no-users">No users found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="tracking-table-wrapper"
        >
          <table className="tracking-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Purchase Time</th>
                <th>Quiz Score</th>
                <th>Assignment</th>
                <th>Certificate</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.lastLogin
                      ? new Date(u.lastLogin).toLocaleString()
                      : "—"}
                  </td>
                  <td>
                    {u.purchaseTime
                      ? new Date(u.purchaseTime).toLocaleString()
                      : "—"}
                  </td>
                  <td>
                    <span className="quiz-score">
                      {u.quizScore !== undefined ? `${u.quizScore}%` : "—"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        u.assignmentSubmitted ? "submitted" : "pending"
                      }`}
                    >
                      {u.assignmentSubmitted ? "Submitted" : "Pending"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`cert-status ${
                        u.certificateStatus === "approved"
                          ? "approved"
                          : u.certificateStatus === "rejected"
                          ? "rejected"
                          : "pending"
                      }`}
                    >
                      {u.certificateStatus.charAt(0).toUpperCase() +
                        u.certificateStatus.slice(1)}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button
                      className="approve-btn"
                      onClick={() => handleCertificateUpdate(u._id, "approved")}
                    >
                      <FaCheckCircle /> Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleCertificateUpdate(u._id, "rejected")}
                    >
                      <FaTimesCircle /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default AdminUserTracking;
