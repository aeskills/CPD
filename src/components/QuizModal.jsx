import { useState } from "react";
import Confetti from "./Confetti";

export default function QuizModal({ quiz, moduleTitle, onComplete, onClose }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const total = quiz.length;
  const question = quiz[currentQ];
  const progress = ((currentQ + (showScore ? 1 : 0)) / total) * 100;

  const handleNext = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ < total - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate score
      let correct = 0;
      newAnswers.forEach((ans, idx) => {
        if (ans === quiz[idx].correct) correct++;
      });
      setScore(correct);
      setShowScore(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setShowScore(false);
    setScore(0);
  };

  const passed = score / total >= 0.7;

  if (showScore) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="quiz-modal glass-card"
          onClick={(e) => e.stopPropagation()}
        >
          {passed && <Confetti />}
          <div className="score-card">
            <div className="score-icon">{passed ? "🎉" : "😔"}</div>
            <h2 className="score-title">
              {passed ? "Congratulations!" : "Keep Trying!"}
            </h2>
            <p className="score-subtitle">
              {passed
                ? "You've passed the quiz successfully!"
                : "You need 70% to pass. Review the materials and try again."}
            </p>
            <div className={`score-value ${passed ? "pass" : "fail"}`}>
              {score}/{total}
            </div>
            <p className="score-label">
              Correct Answers ({Math.round((score / total) * 100)}%)
            </p>
            <div className="score-actions">
              {passed ? (
                <button
                  className="btn btn-gold btn-lg"
                  onClick={() => onComplete(score, total)}
                >
                  Continue →
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleRetry}
                  >
                    Retry Quiz
                  </button>
                  <button className="btn btn-ghost" onClick={onClose}>
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="quiz-modal glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="quiz-header">
          <h3 style={{ fontSize: "var(--text-base)", fontWeight: 600 }}>
            {moduleTitle}
          </h3>
          <span className="quiz-progress">
            Question {currentQ + 1} of {total}
          </span>
        </div>

        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="quiz-question">{question.question}</h2>

        <div className="quiz-options">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className={`quiz-option ${selected === idx ? "selected" : ""}`}
              onClick={() => setSelected(idx)}
            >
              <span className="radio" />
              <span>{option}</span>
            </button>
          ))}
        </div>

        <div className="quiz-footer">
          <button
            className="btn btn-primary btn-lg"
            disabled={selected === null}
            onClick={handleNext}
            style={{ opacity: selected === null ? 0.5 : 1 }}
          >
            {currentQ < total - 1 ? "Next →" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
