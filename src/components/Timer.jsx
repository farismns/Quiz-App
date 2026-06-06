import { useState, useEffect } from "react";

const TIMER_SECONDS = 15;

export default function Timer({ onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const id = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [timeLeft, onTimeout]);

  const pct = (timeLeft / TIMER_SECONDS) * 100;

  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  let color = "var(--correct)";

  if (timeLeft <= 5) {
    color = "var(--incorrect)";
  } else if (timeLeft <= 10) {
    color = "var(--warning)";
  }

  return (
    <div className="timer-wrap">
      <svg className="timer-svg" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="8"
        />

        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.4s ease",
          }}
        />
      </svg>

      <div className="timer-content">
        <span className="timer-number">{timeLeft}</span>
        <span className="timer-total">/15</span>
      </div>
    </div>
  );
}
