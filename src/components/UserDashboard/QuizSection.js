import React from "react";

const QuizSection = ({ unlocked, onComplete }) => {
  return (
    <div className="card">
      <h2>Quiz</h2>
      {unlocked ? (
        <>
          <p>Take the quiz to test your knowledge.</p>
          <button onClick={onComplete}>Take Quiz</button>
        </>
      ) : (
        <div className="lock-overlay">
          <span>🔒 Submit assignment to unlock quiz</span>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
