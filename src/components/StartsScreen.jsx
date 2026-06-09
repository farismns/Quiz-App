export default function StartScreen({
  totalQuestions,
  onStart,
  poolSize = totalQuestions,
  quizLength = totalQuestions,
  highScore = 0,
  history = [],
}) {
  const recentQuizzes = history.slice(0, 3); // Show last 3 quizzes
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
            <span className="meta-label">15 sec per question</span>
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
            <li>You have 15 seconds for each question.</li>
            <li>Correct answers add 1 point.</li>
            <li>Skipping or timing out subtracts 1 point.</li>
            <li>Review your final score and answers at the end.</li>
          </ul>
        </div>
        <button className="btn-start" onClick={onStart}>
          Start Quiz <span className="btn-arrow">→</span>
        </button>
      </div>

      {(highScore > 0 || recentQuizzes.length > 0) && (
        <div className="stats-card">
          {highScore > 0 && (
            <div className="stats-section">
              <h3 className="stats-title">🏆 High Score</h3>
              <div className="high-score-display">{highScore}</div>
            </div>
          )}

          {recentQuizzes.length > 0 && (
            <div className="stats-section">
              <h3 className="stats-title">📊 Recent Quizzes</h3>
              <div className="history-list">
                {recentQuizzes.map((quiz, index) => (
                  <div key={quiz.id || index} className="history-item">
                    <div className="history-score">
                      {quiz.score}/{quiz.total}
                    </div>

                    <div className="history-details">
                      <span className="history-pct">
                        {quiz.percentage}% Correct
                      </span>

                      <span className="history-date">🕒 {quiz.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
