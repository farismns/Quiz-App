import { useState, useCallback } from "react";
import Timer from "./Timer";

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onTimeout,
}) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleSelect = (index) => {
    if (locked) return;

    setSelected(index);
    setLocked(true);

    setTimeout(() => {
      setTransitioning(true);
    }, 700);

    setTimeout(() => {
      onAnswer(index);
    }, 1200);
  };

  const handleTimeout = useCallback(() => {
    if (locked) return;

    setLocked(true);
    setTransitioning(true);

    setTimeout(() => {
      onTimeout();
    }, 700);
  }, [locked, onTimeout]);

  const getButtonClass = (index) => {
    if (!locked) return "option-btn";

    if (index === question.correctIndex) {
      return "option-btn correct";
    }

    if (index === selected && selected !== question.correctIndex) {
      return "option-btn incorrect";
    }

    return "option-btn dimmed";
  };

  const getButtonLabel = (index) => {
    if (!locked) return null;

    if (index === question.correctIndex) {
      return <span className="option-tag correct-tag">✓ Correct</span>;
    }

    if (index === selected) {
      return <span className="option-tag incorrect-tag">✗ Wrong</span>;
    }

    return null;
  };

  return (
    <div className="screen">
      <div className={`question-card ${transitioning ? "slide-next" : ""}`}>
        <div className="card-header">
          <div className="progress-wrap">
            <div className="progress-info">
              <span className="q-counter">
                Question {questionNumber} of {totalQuestions}
              </span>

              <span className="q-pct">
                {Math.round(((questionNumber - 1) / totalQuestions) * 100)}%
              </span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((questionNumber - 1) / totalQuestions) * 100}%`,
                }}
              />
            </div>
          </div>

          <Timer key={question.id} onTimeout={handleTimeout} />
        </div>

        <h2 className="question-text">{question.question}</h2>

        <div className="options-grid">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={getButtonClass(index)}
              onClick={() => handleSelect(index)}
              disabled={locked}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>

              <span className="option-text">{option}</span>

              {getButtonLabel(index)}
            </button>
          ))}
        </div>

        {locked && selected === null && (
          <p className="timeout-msg">
            ⏰ Time's up! Moving to next question...
          </p>
        )}
      </div>
    </div>
  );
}
