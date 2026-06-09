import { useEffect, useRef, useState } from "react";

export default function ResultScreen({
  answers,
  onRestart,
  onQuit,
  questions,
  onScoreSave,
}) {
  const correct = answers.filter((a) => a.correct).length;
  const penalties = answers.filter((a) => a.penalty).length;
  const score = correct - penalties;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  const hasSaved = useRef(false);

  const [showQuitModal, setShowQuitModal] = useState(false);

  useEffect(() => {
    if (!hasSaved.current && onScoreSave) {
      onScoreSave(score, correct, penalties);
      hasSaved.current = true;
    }
  }, [onScoreSave, score, correct, penalties]);

  const grade =
    pct >= 90
      ? { label: "Excellent!", color: "#3CA34D" }
      : pct >= 70
        ? { label: "Good job!", color: "#3b82f6" }
        : pct >= 50
          ? { label: "Not bad.", color: "#f59e0b" }
          : { label: "Keep practicing.", color: "#E63946" };

  return (
    <div className="screen result-screen">
      <div className="result-container">
        <div className="result-header">
          <h2 className="result-title">REVIEW</h2>
          <div className="score-section">
            <div className="score-value">
              <span className="score-num">{score}</span>
              <span className="score-denom">/{total}</span>
            </div>
            <h3 className="grade-label" style={{ color: grade.color }}>
              {grade.label}
            </h3>
            <p className="grade-pct">{pct}% score</p>
          </div>
          <div className="result-stats">
            <div className="stat">
              <span className="stat-val correct-val">{correct}</span>
              <span className="stat-key">Correct</span>
            </div>
            <div className="stat">
              <span className="stat-val incorrect-val">
                {answers.filter((a) => !a.correct && !a.penalty).length}
              </span>
              <span className="stat-key">Wrong</span>
            </div>
            <div className="stat">
              <span className="stat-val penalty-val">{penalties}</span>
              <span className="stat-key">Timed out</span>
            </div>
          </div>
        </div>

        <div className="review-section">
          {questions.map((q, i) => {
            const a = answers[i];
            const isPenalty = a?.penalty;
            const isCorrect = a?.correct;
            const isWrong = !isCorrect && !isPenalty;
            return (
              <div
                key={q.id}
                className={`review-card ${isCorrect ? "card-correct" : isPenalty ? "card-penalty" : "card-wrong"}`}
              >
                <div className="review-card-top">
                  <span className="card-icon">
                    {isCorrect ? "✓" : isPenalty ? "⏰" : "✗"}
                  </span>
                  <span className="card-question">{q.question}</span>
                </div>
                <div className="review-card-bottom">
                  {isPenalty ? (
                    <span className="card-detail penalty-detail">
                      Timed out — no answer given
                    </span>
                  ) : (
                    <>
                      {isWrong && (
                        <span className="card-detail wrong-detail">
                          Your answer: {q.options[a.selected]}
                        </span>
                      )}
                      <span className="card-detail correct-detail">
                        {isCorrect ? "✓ " : "Correct: "}
                        {q.options[q.correctIndex]}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="result-actions">
          <button className="btn-quit" onClick={() => setShowQuitModal(true)}>
            ← Quit
          </button>

          <button className="btn-restart" onClick={onRestart}>
            Try Again →
          </button>
        </div>
      </div>

      {showQuitModal && (
        <div className="modal-overlay">
          <div className="quit-modal">
            <div className="modal-icon">⚠️</div>

            <h3>Quit Quiz?</h3>

            <p>
              Your score has already been saved.
              <br />
              Do you want to return to the home screen?
            </p>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => setShowQuitModal(false)}
              >
                Cancel
              </button>

              <button
                className="modal-confirm"
                onClick={() => {
                  setShowQuitModal(false);
                  onQuit();
                }}
              >
                Yes, Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
