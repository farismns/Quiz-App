const questions = [
  {
    id: 1,
    question:
      "Which data structure operates on a LIFO (Last In, First Out) principle?",
    options: ["Queue", "Stack", "Linked List", "Heap"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Syntax",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "Which of the following is NOT a JavaScript primitive type?",
    options: ["string", "boolean", "object", "undefined"],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "In React, what hook is used to run side effects after render?",
    options: ["useState", "useEffect", "useRef", "useContext"],
    correctIndex: 1,
  },
  {
    id: 5,
    question: "What is the time complexity of binary search on a sorted array?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctIndex: 2,
  },
  {
    id: 6,
    question:
      "Which HTTP method is idempotent AND should not modify server state?",
    options: ["POST", "PUT", "PATCH", "GET"],
    correctIndex: 3,
  },
  {
    id: 7,
    question: "What does the 'S' in SOLID principles stand for?",
    options: [
      "Separation of Concerns",
      "Single Responsibility",
      "Synchronous Design",
      "Static Typing",
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    question: "Which SQL clause is used to filter results after grouping?",
    options: ["WHERE", "FILTER", "HAVING", "LIMIT"],
    correctIndex: 2,
  },
  {
    id: 9,
    question:
      "In Git, what command creates a new branch AND switches to it in one step?",
    options: [
      "git branch new-branch",
      "git checkout new-branch",
      "git checkout -b new-branch",
      "git switch new-branch",
    ],
    correctIndex: 2,
  },
  {
    id: 10,
    question:
      "Which of these is a valid way to declare a constant in JavaScript?",
    options: [
      "constant x = 5",
      "const x = 5",
      "final x = 5",
      "let const x = 5",
    ],
    correctIndex: 1,
  },
  {
    id: 11,
    question:
      "Which CSS layout model uses rows and columns with explicit areas?",
    options: ["Flexbox", "Grid", "Block layout", "Table layout"],
    correctIndex: 1,
  },
  {
    id: 12,
    question:
      "Which JavaScript method creates a new array with the results of calling a function on every element?",
    options: ["forEach", "map", "reduce", "filter"],
    correctIndex: 1,
  },
  {
    id: 13,
    question: "What does REST stand for in web APIs?",
    options: [
      "Representational State Transfer",
      "Reusable Service Transport",
      "Remote Execution Standard",
      "Resource State Transfer",
    ],
    correctIndex: 0,
  },
  {
    id: 14,
    question: "Which HTML element is used to include JavaScript in a page?",
    options: ["<script>", "<js>", "<code>", "<source>"],
    correctIndex: 0,
  },
  {
    id: 15,
    question: "Which HTTP status code indicates that a resource was not found?",
    options: ["200", "301", "404", "500"],
    correctIndex: 2,
  },
  {
    id: 16,
    question: "In JavaScript, which keyword declares a block-scoped variable?",
    options: ["var", "let", "const", "both let and const"],
    correctIndex: 3,
  },
  {
    id: 17,
    question:
      "Which data format is commonly used for API responses and is a subset of JavaScript?",
    options: ["XML", "YAML", "JSON", "CSV"],
    correctIndex: 2,
  },
  {
    id: 18,
    question:
      "Which React feature lets you return multiple elements without an extra DOM node?",
    options: ["Fragments", "Portals", "Refs", "Hooks"],
    correctIndex: 0,
  },
  {
    id: 19,
    question: "What is the purpose of the 'useEffect' cleanup function?",
    options: [
      "To run code only once",
      "To clean up subscriptions or timers",
      "To update state synchronously",
      "To force a re-render",
    ],
    correctIndex: 1,
  },
  {
    id: 20,
    question: "Which algorithmic complexity grows the fastest as n increases?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    correctIndex: 2,
  },
];

export default questions;
