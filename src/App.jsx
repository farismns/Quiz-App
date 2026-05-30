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

  const handleStart = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setPhase("quiz");
  };

  const advance = useCallback(
    (answerEntry) => {
      const next = [...answers, answerEntry];
      setAnswers(next);
      if (currentIndex + 1 >= questions.length) {
        setPhase("results");
      } else {
        setCurrentIndex((i) => i + 1);
      }
    },
    [answers, currentIndex],
  );

  const handleAnswer = useCallback(
    (selectedIndex) => {
      const q = questions[currentIndex];
      advance({
        selected: selectedIndex,
        correct: selectedIndex === q.correctIndex,
        penalty: false,
      });
    },
    [currentIndex, advance],
  );

  const handleTimeout = useCallback(() => {
    advance({ selected: null, correct: false, penalty: true });
  }, [advance]);

  return (
    <div className="app">
      <div className="app-bg" />
      {phase === "start" && (
        <StartScreen totalQuestions={questions.length} onStart={handleStart} />
      )}
      {phase === "quiz" && (
        <QuestionCard
          key={currentIndex}
          question={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onTimeout={handleTimeout}
        />
      )}
      {phase === "results" && (
        <ResultScreen answers={answers} onRestart={() => setPhase("start")} />
      )}
    </div>
  );
}
