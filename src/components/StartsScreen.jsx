export default function StartScreen({
  totalQuestions,
  onStart,
  poolSize = totalQuestions,
  quizLength = totalQuestions,
}) {
  return (
    <div className="screen start-screen">
      <div className="start-card">
        <div className="start-badge">Quiz Time</div>
        <h1 className="start-title">
          General
          <br />
          Knowledge Check
        </h1>
        <p className="start-desc">
          Test your general knowledge with a quick quiz.
        </p>
        <div className="start-meta">
          <div className="meta-item">
            <span className="meta-icon">📋</span>
            <span className="meta-label">
              {quizLength} Questions (from {poolSize})
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">⏱</span>
            <span className="meta-label">30 sec per question</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">⚡</span>
            <span className="meta-label">Instant feedback</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">⚠️</span>
            <span className="meta-label">–1 for timeouts</span>
          </div>
        </div>
        <div className="start-rules">
          <h3 className="rules-title">How the quiz works</h3>
          <ul className="rules-list">
            <li>Press Start to begin.</li>
            <li>Choose one answer per question.</li>
            <li>You have 30 seconds for each question.</li>
            <li>Correct answers add 1 point.</li>
            <li>Skipping or timing out subtracts 1 point.</li>
            <li>Review your final score and answers at the end.</li>
          </ul>
        </div>
        <button className="btn-start" onClick={onStart}>
          Start Quiz <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}
