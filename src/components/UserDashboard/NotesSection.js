import React from "react";

const NotesSection = ({ unlocked, onRead }) => {
  return (
    <div className="card">
      <h2>Course Notes</h2>
      {unlocked ? (
        <>
          <p>Here are your course notes. Review them carefully.</p>
          <button onClick={onRead}>Mark as Read</button>
        </>
      ) : (
        <div className="lock-overlay">
          <span>🔒 Watch videos to unlock notes</span>
        </div>
      )}
    </div>
  );
};

export default NotesSection;
