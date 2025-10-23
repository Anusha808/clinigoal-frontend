import React, { useState } from "react";
import { FaHome, FaBook, FaVideo, FaFileAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import "./Slidebar.css";

const Sidebar = ({ onSelect, onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2 className="logo">{isOpen ? "Clinigoal" : "CG"}</h2>
        <FaBars className="menu-icon" onClick={toggleSidebar} />
      </div>

      <ul className="sidebar-menu">
        <li onClick={() => onSelect("dashboard")}>
          <FaHome /> {isOpen && <span>Dashboard</span>}
        </li>
        <li onClick={() => onSelect("courses")}>
          <FaBook /> {isOpen && <span>Courses</span>}
        </li>
        <li onClick={() => onSelect("videos")}>
          <FaVideo /> {isOpen && <span>Video Progress</span>}
        </li>
        <li onClick={() => onSelect("notes")}>
          <FaFileAlt /> {isOpen && <span>Notes</span>}
        </li>
      </ul>

      <div className="sidebar-footer" onClick={onLogout}>
        <FaSignOutAlt /> {isOpen && <span>Logout</span>}
      </div>
    </div>
  );
};

export default Sidebar;
