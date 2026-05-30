export default function ResultScreen({ answers, onRestart, questions }) {
  const correct = answers.filter((a) => a.correct).length;
  const penalties = answers.filter((a) => a.penalty).length;
  const score = correct - penalties;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  const grade =
    pct >= 90
      ? { label: "Excellent!", color: "#22c55e" }
      : pct >= 70
        ? { label: "Good job!", color: "#3b82f6" }
        : pct >= 50
          ? { label: "Not bad.", color: "#f59e0b" }
          : { label: "Keep practicing.", color: "#ef4444" };

  return (
    <div className="screen result-screen">
      <div className="result-card">
        <div className="result-header">
          <div className="score-value">
            <span className="score-num">{score}</span>
            <span className="score-denom">/{total}</span>
          </div>
          <h2 className="grade-label" style={{ color: grade.color }}>
            {grade.label}
          </h2>
          <p className="grade-pct">{pct}% score</p>
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

        <div className="answers-list">
          <h3 className="answers-heading">Review</h3>
          {questions.map((q, i) => {
            const a = answers[i];
            const isPenalty = a?.penalty;
            const isCorrect = a?.correct;
            const isWrong = !isCorrect && !isPenalty;
            return (
              <div
                key={q.id}
                className={`answer-row ${isCorrect ? "row-correct" : isPenalty ? "row-penalty" : "row-wrong"}`}
              >
                <div className="answer-row-top">
                  <span className="row-icon">
                    {isCorrect ? "✓" : isPenalty ? "⏰" : "✗"}
                  </span>
                  <span className="row-question">{q.question}</span>
                </div>
                <div className="answer-row-bottom">
                  {isPenalty ? (
                    <span className="row-detail penalty-detail">
                      Timed out — no answer given
                    </span>
                  ) : (
                    <>
                      {isWrong && (
                        <span className="row-detail wrong-detail">
                          Yours: {q.options[a.selected]}
                        </span>
                      )}
                      <span className="row-detail correct-detail">
                        {isCorrect ? "You got it: " : "Correct: "}
                        {q.options[q.correctIndex]}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button className="btn-restart" onClick={onRestart}>
          Try Again →
        </button>
      </div>
    </div>
  );
}
