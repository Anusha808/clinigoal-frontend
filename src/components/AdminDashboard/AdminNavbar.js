import React from "react";

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <h3>Clinigoal Admin Dashboard</h3>
      <button
        className="action-btn"
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
