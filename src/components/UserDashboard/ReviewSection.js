import React from "react";

const ReviewSection = ({ unlocked, onReview }) => {
  return (
    <div className="card">
      <h2>Course Review</h2>
      {unlocked ? (
        <>
          <p>Share your thoughts about this course.</p>
          <button onClick={onReview}>Submit Review</button>
        </>
      ) : (
        <div className="lock-overlay">
          <span>🔒 Download certificate to unlock reviews</span>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
