import React from "react";

const VideoProgress = ({ unlocked, progress, onWatch }) => {
  return (
    <div className="card">
      <h2>Course Videos</h2>
      {unlocked ? (
        <>
          <p>Watch all course videos to unlock notes.</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <button onClick={onWatch}>
            {progress === 100 ? "Completed" : "Watch Next Video"}
          </button>
        </>
      ) : (
        <div className="lock-overlay">
          <span>🔒 Awaiting Admin Approval</span>
        </div>
      )}
    </div>
  );
};

export default VideoProgress;
