import questions from "./data/questions";
import StartScreen from "./components/StartsScreen";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";

import "./App.css";
import { useCallback, useEffect, useState } from "react";
import {
  getHighScore,
  saveHighScore,
  getQuizHistory,
  saveQuizHistory,
} from "./utils/storage";
import {
  getSoundPreference,
  setSoundPreference,
  useSoundEffects,
} from "./utils/sound";

const SOUND_SOURCES = {
  correct: "/sounds/correct.wav",
  wrong: "/sounds/wrong.wav",
  result: "/sounds/result.wav",
};

export default function App() {
  const [phase, setPhase] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [highScore, setHighScore] = useState(() => getHighScore());
  const [history, setHistory] = useState(() => getQuizHistory());
  const [soundEnabled, setSoundEnabled] = useState(() => getSoundPreference());
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("quizTheme");
    const normalized = stored === "sakura" ? "pink" : stored;
    return ["light", "dark", "ocean", "royal", "pink"].includes(normalized)
      ? normalized
      : "dark";
  });

  const {
    playCorrectSound,
    playWrongSound,
    playResultSound,
  } = useSoundEffects(soundEnabled, SOUND_SOURCES);

  useEffect(() => {
    setSoundPreference(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    if (phase === "results") {
      playResultSound?.();
    }
  }, [phase, playResultSound]);

  const toggleSoundEnabled = useCallback(() => {
    setSoundEnabled((enabled) => !enabled);
  }, []);
  const QUIZ_LENGTH = 10; // number of questions to show per quiz

  const shuffle = useCallback((arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, []);

  // Shuffle and return a sampled quiz of QUIZ_LENGTH
  const sampleQuiz = useCallback(
    (pool) => shuffle(pool).slice(0, QUIZ_LENGTH),
    [shuffle, QUIZ_LENGTH],
  );

  const handleStart = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setShuffled(sampleQuiz(questions));
    setPhase("quiz");
  };

  const advance = useCallback(
    (answerEntry) => {
      const next = [...answers, answerEntry];
      setAnswers(next);
      if (currentIndex + 1 >= shuffled.length) {
        setPhase("results");
      } else {
        setCurrentIndex((i) => i + 1);
      }
    },
    [answers, currentIndex, shuffled.length],
  );

  const handleAnswer = useCallback(
    (selectedIndex) => {
      const q = shuffled[currentIndex];
      advance({
        selected: selectedIndex,
        correct: selectedIndex === q.correctIndex,
        penalty: false,
      });
    },
    [currentIndex, advance, shuffled],
  );

  const handleTimeout = useCallback(() => {
    advance({ selected: null, correct: false, penalty: true });
  }, [advance]);

  const handleRestart = useCallback(() => {
    // reshuffle a new sampled quiz on retry
    setShuffled(sampleQuiz(questions));
    setAnswers([]);
    setCurrentIndex(0);
    setPhase("quiz");
  }, [sampleQuiz]);

  const handleScoreSave = useCallback(
    (score, correct, penalties) => {
      // Update high score if needed
      if (score > highScore) {
        saveHighScore(score);
        setHighScore(score);
      }

      // Save to quiz history
      const newEntry = {
        id: Date.now(),
        score,
        correct,
        penalties,
        total: shuffled.length,
        percentage: Math.round((score / shuffled.length) * 100),
        date: new Date().toLocaleString(),
      };

      const updatedHistory = [newEntry, ...history].slice(0, 10); // Keep last 10 quizzes
      saveQuizHistory(updatedHistory);
      setHistory(updatedHistory);
    },
    [highScore, history, shuffled.length],
  );

  useEffect(() => {
    localStorage.setItem("quizTheme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="app">
      <div className="app-bg" />
      <div className="theme-switcher">
        <label htmlFor="theme-select">Theme</label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="ocean">Ocean Blue</option>
          <option value="royal">Royal Purple</option>
          <option value="pink">Pink</option>
        </select>
        <button
          type="button"
          className={`sound-toggle ${soundEnabled ? "enabled" : "disabled"}`}
          onClick={toggleSoundEnabled}
        >
          {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
        </button>
      </div>
      {phase === "start" && (
        <StartScreen
          totalQuestions={questions.length}
          poolSize={questions.length}
          quizLength={QUIZ_LENGTH}
          onStart={handleStart}
          highScore={highScore}
          history={history}
        />
      )}
      {phase === "quiz" && (
        <QuestionCard
          key={currentIndex}
          question={shuffled[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={shuffled.length}
          onAnswer={handleAnswer}
          onTimeout={handleTimeout}
          onPlayCorrectSound={playCorrectSound}
          onPlayWrongSound={playWrongSound}
          onPlayTimeoutSound={playWrongSound}
        />
      )}
      {phase === "results" && (
        <ResultScreen
          answers={answers}
          questions={shuffled}
          onRestart={handleRestart}
          onScoreSave={handleScoreSave}
        />
      )}
    </div>
  );
}
