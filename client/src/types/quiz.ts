export interface Question {
  id: number;
  question: string;
  answer: number;
  operation: string;
  userAnswer?: number;
  timeSpent?: number;
  isCorrect?: boolean;
}

export interface QuizResult {
  questionNumber: number;
  question: string;
  userAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  operation: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  questions: Question[];
  results: QuizResult[];
  isStarted: boolean;
  isCompleted: boolean;
  startTime: number | null;
  questionStartTime: number | null;
}

export interface QuizSummary {
  score: number;
  totalQuestions: number;
  totalTime: number;
  averageTime: number;
  accuracy: number;
}
