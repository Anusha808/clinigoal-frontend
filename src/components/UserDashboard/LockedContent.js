import React from "react";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import "./UserDashboard.css";

const LockedContent = ({ section, progress, onBackToDashboard }) => (
  <>
    <h3>{section}</h3>
    <div className="locked-content">
      <FaLock size={48} color="#ccc" />
      <h4>Content Locked</h4>
      {progress ? (
        <div className="progress-indicator">
          <p>Please complete all course sections to unlock your certificate.</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  (Object.values(progress).filter(Boolean).length / 4) * 100
                }%`,
              }}
            ></div>
          </div>
          <ul className="progress-list">
            {["videos", "notes", "assignments", "quiz"].map((s) => (
              <li key={s} className={progress[s] ? "completed" : ""}>
                <FaCheckCircle /> {s.charAt(0).toUpperCase() + s.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>
          Please complete payment and wait for admin approval to access this
          content.
        </p>
      )}
      <button onClick={onBackToDashboard} className="back-btn">
        Back to Dashboard
      </button>
    </div>
  </>
);

export default LockedContent;
