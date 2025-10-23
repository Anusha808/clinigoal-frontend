import React, { useState } from "react";
import { FaPlay, FaTimes, FaCheckCircle } from "react-icons/fa";
import "./UserDashboard.css";

const QuizComponent = ({ quizzes, onQuizComplete }) => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const selectAnswer = (answer) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: answer });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    currentQuiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) correctCount++;
    });
    setScore(correctCount);
    setShowResults(true);
    onQuizComplete();
  };

  if (!currentQuiz)
    return (
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-item">
            <h4>{quiz.title}</h4>
            <p>Questions: {quiz.questions?.length || 0}</p>
            <button className="start-quiz-btn" onClick={() => startQuiz(quiz)}>
              <FaPlay /> Start Quiz
            </button>
          </div>
        ))}
      </div>
    );

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3>{currentQuiz.title}</h3>
        <button className="close-quiz-btn" onClick={() => setCurrentQuiz(null)}>
          <FaTimes />
        </button>
      </div>

      {!showResults ? (
        <div className="question-container">
          <div className="question-progress">
            Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
          </div>
          <div className="question-text">
            {currentQuiz.questions[currentQuestionIndex].question}
          </div>
          <div className="options-container">
            {currentQuiz.questions[currentQuestionIndex].options.map(
              (opt, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${
                    selectedAnswers[currentQuestionIndex] === opt
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => selectAnswer(opt)}
                >
                  {opt}
                </button>
              )
            )}
          </div>
          <button
            className="next-btn"
            onClick={nextQuestion}
            disabled={!selectedAnswers[currentQuestionIndex]}
          >
            {currentQuestionIndex < currentQuiz.questions.length - 1
              ? "Next Question"
              : "Submit Quiz"}
          </button>
        </div>
      ) : (
        <div className="results-container">
          <h3>Results</h3>
          <p>
            Score: {score}/{currentQuiz.questions.length}
          </p>
          <div className="review-answers">
            {currentQuiz.questions.map((q, i) => (
              <div key={i} className="answer-review">
                <p>
                  <strong>Q{i + 1}:</strong> {q.question}
                </p>
                <p>Your Answer: {selectedAnswers[i]}</p>
                <p>Correct Answer: {q.correctAnswer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
