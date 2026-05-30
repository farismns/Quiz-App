import questions from "./data/questions";
import StartScreen from "./components/StartsScreen";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import "./App.css";
import { useCallback, useState } from "react";

export default function App() {
  const [phase, setPhase] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [shuffled, setShuffled] = useState([]);
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

  return (
    <div className="app">
      <div className="app-bg" />
      {phase === "start" && (
        <StartScreen totalQuestions={questions.length} onStart={handleStart} />
      )}
      {phase === "quiz" && (
        <QuestionCard
          key={currentIndex}
          question={shuffled[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={shuffled.length}
          onAnswer={handleAnswer}
          onTimeout={handleTimeout}
        />
      )}
      {phase === "results" && (
        <ResultScreen
          answers={answers}
          questions={shuffled}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
