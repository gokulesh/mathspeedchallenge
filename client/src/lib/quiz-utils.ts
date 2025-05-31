import { Question } from "@/types/quiz";

export function generateQuestion(operation?: string): Question {
  const operations = ['addition', 'subtraction', 'multiplication', 'division', 'square', 'sqrt'];
  const selectedOperation = operation || operations[Math.floor(Math.random() * operations.length)];
  
  let questionText: string;
  let answer: number;
  let id = Math.random();
  
  switch (selectedOperation) {
    case 'addition': {
      const a = Math.floor(Math.random() * 50) + 1;
      const b = Math.floor(Math.random() * 50) + 1;
      questionText = `${a} + ${b}`;
      answer = a + b;
      break;
    }
    
    case 'subtraction': {
      const a = Math.floor(Math.random() * 50) + 20;
      const b = Math.floor(Math.random() * 20) + 1;
      questionText = `${a} - ${b}`;
      answer = a - b;
      break;
    }
    
    case 'multiplication': {
      const a = Math.floor(Math.random() * 12) + 1;
      const b = Math.floor(Math.random() * 12) + 1;
      questionText = `${a} × ${b}`;
      answer = a * b;
      break;
    }
    
    case 'division': {
      const b = Math.floor(Math.random() * 12) + 1;
      const answer_val = Math.floor(Math.random() * 12) + 1;
      const a = b * answer_val;
      questionText = `${a} ÷ ${b}`;
      answer = answer_val;
      break;
    }
    
    case 'square': {
      const base = Math.floor(Math.random() * 20) + 1;
      questionText = `${base}²`;
      answer = base * base;
      break;
    }
    
    case 'sqrt': {
      const root = Math.floor(Math.random() * 20) + 1;
      const square = root * root;
      questionText = `√${square}`;
      answer = root;
      break;
    }
    
    default:
      throw new Error(`Unknown operation: ${selectedOperation}`);
  }
  
  return {
    id,
    question: questionText,
    answer,
    operation: selectedOperation
  };
}

// Pre-generated question sets for consistent practice
const questionSets = {
  beginner: [
    { id: 1, question: "2 + 3", answer: 5, operation: "addition" },
    { id: 2, question: "8 - 4", answer: 4, operation: "subtraction" },
    { id: 3, question: "3 × 4", answer: 12, operation: "multiplication" },
    { id: 4, question: "10 ÷ 2", answer: 5, operation: "division" },
    { id: 5, question: "3²", answer: 9, operation: "square" },
    { id: 6, question: "√16", answer: 4, operation: "sqrt" },
    { id: 7, question: "5 + 7", answer: 12, operation: "addition" },
    { id: 8, question: "15 - 6", answer: 9, operation: "subtraction" },
    { id: 9, question: "2 × 8", answer: 16, operation: "multiplication" },
    { id: 10, question: "21 ÷ 3", answer: 7, operation: "division" }
  ],
  
  intermediate: [
    { id: 1, question: "15 + 28", answer: 43, operation: "addition" },
    { id: 2, question: "42 - 17", answer: 25, operation: "subtraction" },
    { id: 3, question: "7 × 8", answer: 56, operation: "multiplication" },
    { id: 4, question: "84 ÷ 12", answer: 7, operation: "division" },
    { id: 5, question: "9²", answer: 81, operation: "square" },
    { id: 6, question: "√144", answer: 12, operation: "sqrt" },
    { id: 7, question: "36 + 19", answer: 55, operation: "addition" },
    { id: 8, question: "73 - 28", answer: 45, operation: "subtraction" },
    { id: 9, question: "11 × 6", answer: 66, operation: "multiplication" },
    { id: 10, question: "96 ÷ 8", answer: 12, operation: "division" }
  ],
  
  advanced: [
    { id: 1, question: "47 + 68", answer: 115, operation: "addition" },
    { id: 2, question: "91 - 39", answer: 52, operation: "subtraction" },
    { id: 3, question: "12 × 11", answer: 132, operation: "multiplication" },
    { id: 4, question: "144 ÷ 12", answer: 12, operation: "division" },
    { id: 5, question: "15²", answer: 225, operation: "square" },
    { id: 6, question: "√196", answer: 14, operation: "sqrt" },
    { id: 7, question: "58 + 77", answer: 135, operation: "addition" },
    { id: 8, question: "84 - 46", answer: 38, operation: "subtraction" },
    { id: 9, question: "9 × 13", answer: 117, operation: "multiplication" },
    { id: 10, question: "132 ÷ 11", answer: 12, operation: "division" }
  ]
};

export type QuestionMode = 'random' | 'beginner' | 'intermediate' | 'advanced';

export function generateQuestions(count: number = 10, mode: QuestionMode = 'random'): Question[] {
  if (mode === 'random') {
    // Original random generation
    const questions: Question[] = [];
    const operations = ['addition', 'subtraction', 'multiplication', 'division', 'square', 'sqrt'];
    
    for (let i = 0; i < count; i++) {
      const operation = operations[i % operations.length];
      questions.push(generateQuestion(operation));
    }
    
    // Shuffle the questions
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    
    return questions;
  } else {
    // Use pre-generated question set
    const selectedSet = questionSets[mode];
    const shuffled = [...selectedSet];
    
    // Shuffle the pre-generated questions
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
  }
}

export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toFixed(1).padStart(4, '0')}`;
  }
}

export function calculateQuizSummary(results: any[]): {
  score: number;
  totalQuestions: number;
  totalTime: number;
  averageTime: number;
  accuracy: number;
} {
  const totalQuestions = results.length;
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0);
  const averageTime = totalTime / totalQuestions;
  const accuracy = (correctAnswers / totalQuestions) * 100;
  
  return {
    score: correctAnswers,
    totalQuestions,
    totalTime,
    averageTime,
    accuracy
  };
}
