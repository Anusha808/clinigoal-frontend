import React from "react";

const AssignmentSection = ({ unlocked, onSubmit }) => {
  return (
    <div className="card">
      <h2>Assignment</h2>
      {unlocked ? (
        <>
          <p>Submit your assignment for evaluation.</p>
          <button onClick={onSubmit}>Submit Assignment</button>
        </>
      ) : (
        <div className="lock-overlay">
          <span>🔒 Complete notes to unlock assignment</span>
        </div>
      )}
    </div>
  );
};

export default AssignmentSection;
