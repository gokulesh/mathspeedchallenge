import { useEffect } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuizHeader } from "@/components/QuizHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsScreen } from "@/components/ResultsScreen";
import { useQuiz } from "@/hooks/useQuiz";

export default function Quiz() {
  const {
    state,
    timer,
    startQuiz,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    resetQuiz,
    currentQuestion,
  } = useQuiz();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!state.isStarted || state.isCompleted) return;
      
      if (e.key === "ArrowLeft" && state.currentQuestionIndex > 0) {
        e.preventDefault();
        previousQuestion();
      } else if (e.key === "ArrowRight" && state.currentQuestionIndex < state.questions.length - 1) {
        e.preventDefault();
        // Only allow next if user has submitted an answer for current question
        const hasAnswered = state.results.some(r => r.questionNumber === state.currentQuestionIndex + 1);
        if (hasAnswered) {
          nextQuestion();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state, nextQuestion, previousQuestion]);

  if (!state.isStarted) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <WelcomeScreen onStartQuiz={startQuiz} />
        </div>
      </div>
    );
  }

  if (state.isCompleted) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ResultsScreen
            results={state.results}
            onRestartQuiz={() => {
              resetQuiz();
              startQuiz();
            }}
            onGoHome={resetQuiz}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <QuizHeader
        currentQuestion={state.currentQuestionIndex + 1}
        totalQuestions={state.questions.length}
        timer={timer}
      />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <ProgressBar
            currentQuestion={state.currentQuestionIndex + 1}
            totalQuestions={state.questions.length}
            timer={timer}
          />
          
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              currentQuestionIndex={state.currentQuestionIndex}
              totalQuestions={state.questions.length}
              onSubmitAnswer={submitAnswer}
              onNextQuestion={nextQuestion}
              onPreviousQuestion={previousQuestion}
              canGoNext={state.currentQuestionIndex < state.questions.length - 1}
              canGoPrevious={state.currentQuestionIndex > 0}
            />
          )}
        </div>
      </main>
    </div>
  );
}
