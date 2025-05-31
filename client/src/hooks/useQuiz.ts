import { useState, useCallback, useEffect } from "react";
import { Question, QuizResult, QuizState } from "@/types/quiz";
import { generateQuestions } from "@/lib/quiz-utils";

export function useQuiz() {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    questions: [],
    results: [],
    isStarted: false,
    isCompleted: false,
    startTime: null,
    questionStartTime: null,
  });

  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  const startQuiz = useCallback(() => {
    const questions = generateQuestions(10);
    const now = Date.now();
    
    setState({
      currentQuestionIndex: 0,
      questions,
      results: [],
      isStarted: true,
      isCompleted: false,
      startTime: now,
      questionStartTime: now,
    });
    
    setTimer(0);
  }, []);

  const startQuestionTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    const startTime = Date.now();
    setState(prev => ({ ...prev, questionStartTime: startTime }));
    setTimer(0);
    
    const interval = setInterval(() => {
      setTimer((Date.now() - startTime) / 1000);
    }, 100);
    
    setTimerInterval(interval);
  }, [timerInterval]);

  const stopQuestionTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    return timer;
  }, [timerInterval, timer]);

  const submitAnswer = useCallback((userAnswer: number) => {
    const timeSpent = stopQuestionTimer();
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isCorrect = userAnswer === currentQuestion.answer;
    
    const result: QuizResult = {
      questionNumber: state.currentQuestionIndex + 1,
      question: currentQuestion.question,
      userAnswer,
      correctAnswer: currentQuestion.answer,
      isCorrect,
      timeSpent,
      operation: currentQuestion.operation,
    };
    
    setState(prev => ({
      ...prev,
      results: [...prev.results, result],
    }));
    
    return { isCorrect, timeSpent };
  }, [state, stopQuestionTimer]);

  const nextQuestion = useCallback(() => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
      startQuestionTimer();
    } else {
      setState(prev => ({
        ...prev,
        isCompleted: true,
      }));
      stopQuestionTimer();
    }
  }, [state.currentQuestionIndex, state.questions.length, startQuestionTimer, stopQuestionTimer]);

  const previousQuestion = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
      startQuestionTimer();
    }
  }, [state.currentQuestionIndex, startQuestionTimer]);

  const resetQuiz = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    setState({
      currentQuestionIndex: 0,
      questions: [],
      results: [],
      isStarted: false,
      isCompleted: false,
      startTime: null,
      questionStartTime: null,
    });
    setTimer(0);
    setTimerInterval(null);
  }, [timerInterval]);

  // Start question timer when question changes
  useEffect(() => {
    if (state.isStarted && !state.isCompleted) {
      startQuestionTimer();
    }
    
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [state.currentQuestionIndex, state.isStarted]);

  return {
    state,
    timer,
    startQuiz,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    resetQuiz,
    currentQuestion: state.questions[state.currentQuestionIndex],
  };
}
