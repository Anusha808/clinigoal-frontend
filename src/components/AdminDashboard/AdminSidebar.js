import React from "react";
import "./AdminDashboard.css";

const AdminSidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "courses", label: "Courses" },
    { id: "videos", label: "Videos" },
    { id: "notes", label: "Notes" },
    { id: "quizzes", label: "Quizzes" },
    { id: "approvals", label: "Approvals" },
    { id: "analytics", label: "Analytics" },
    { id: "reviews", label: "Testimonials" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="admin-sidebar">
      <h2 className="logo">Clinigoal Admin</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={activePage === item.id ? "active" : ""}
            onClick={() => setActivePage(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
