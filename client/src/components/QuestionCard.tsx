import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Question } from "@/types/quiz";

interface QuestionCardProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onSubmitAnswer: (answer: number) => { isCorrect: boolean; timeSpent: number };
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function QuestionCard({
  question,
  currentQuestionIndex,
  totalQuestions,
  onSubmitAnswer,
  onNextQuestion,
  onPreviousQuestion,
  canGoNext,
  canGoPrevious,
}: QuestionCardProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; timeSpent: number } | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserAnswer("");
    setFeedback(null);
    setHasSubmitted(false);
    // Use setTimeout to ensure the input is rendered before focusing
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [question.id]);

  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    if (isNaN(answer)) {
      alert("Please enter a valid number!");
      return;
    }
    
    const result = onSubmitAnswer(answer);
    setFeedback(result);
    setHasSubmitted(true);
    
    // Auto-advance to next question after showing feedback
    setTimeout(() => {
      onNextQuestion();
    }, 2000);
  };

  const handleNext = () => {
    if (hasSubmitted) {
      onNextQuestion();
    } else {
      handleSubmit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!hasSubmitted) {
        handleSubmit();
      } else {
        onNextQuestion();
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Question Card */}
      <Card className="border-4 border-gray-100 shadow-xl">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <div className="text-6xl md:text-7xl font-bold text-gray-800 mb-6">
              {question.question}
            </div>
            <div className="text-xl text-gray-600">What's the answer?</div>
          </div>
          
          {/* Answer Input */}
          <div className="max-w-xs mx-auto mb-8">
            <Input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-4xl font-bold text-center py-6 px-6 border-4 border-gray-200 rounded-2xl focus:border-primary h-auto text-gray-800"
              placeholder="Enter answer here"
              disabled={hasSubmitted}
            />
          </div>

          {/* Submit Button */}
          {!hasSubmitted && (
            <Button
              onClick={handleSubmit}
              className="bg-warning hover:bg-yellow-500 text-white font-semibold py-4 px-8 rounded-xl text-lg h-auto"
            >
              Check Answer
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Answer Feedback */}
      {feedback && (
        <Card className={`border-4 ${feedback.isCorrect ? 'border-success bg-green-50' : 'border-error bg-red-50'}`}>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              {feedback.isCorrect ? (
                <CheckCircle className="text-success" size={24} />
              ) : (
                <XCircle className="text-error" size={24} />
              )}
              <span className={`text-lg font-semibold ${feedback.isCorrect ? 'text-success' : 'text-error'}`}>
                {feedback.isCorrect ? '🎉 Correct! Great job!' : `❌ Not quite right. The answer is ${question.answer}`}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Time taken: {feedback.timeSpent.toFixed(1)}s
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={onPreviousQuestion}
          disabled={!canGoPrevious}
          variant="outline"
          className="flex items-center space-x-2 py-3 px-6 rounded-xl"
        >
          <ChevronLeft size={20} />
          <span>Previous</span>
        </Button>

        <div className="text-gray-500 text-sm">
          Use <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">←</kbd> and{" "}
          <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">→</kbd> to navigate
        </div>

        <Button
          onClick={handleNext}
          disabled={!hasSubmitted && !userAnswer}
          className="flex items-center space-x-2 bg-primary hover:bg-blue-600 text-white py-3 px-6 rounded-xl"
        >
          <span>{currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"}</span>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
}
