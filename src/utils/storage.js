// High Score
export const getHighScore = () => {
  return Number(localStorage.getItem("highScore")) || 0;
};

export const saveHighScore = (score) => {
  localStorage.setItem("highScore", score);
};

// History
export const getQuizHistory = () => {
  const data = localStorage.getItem("quizHistory");
  return data ? JSON.parse(data) : [];
};

export const saveQuizHistory = (history) => {
  localStorage.setItem("quizHistory", JSON.stringify(history));
};

export const clearQuizHistory = () => {
  localStorage.removeItem("quizHistory");
};

export const clearHighScore = () => {
  localStorage.removeItem("highScore");
};
