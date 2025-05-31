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

export function generateQuestions(count: number = 10): Question[] {
  const questions: Question[] = [];
  const operations = ['addition', 'subtraction', 'multiplication', 'division', 'square', 'sqrt'];
  
  for (let i = 0; i < count; i++) {
    // Ensure we get a good mix of operations
    const operation = operations[i % operations.length];
    questions.push(generateQuestion(operation));
  }
  
  // Shuffle the questions
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  
  return questions;
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
