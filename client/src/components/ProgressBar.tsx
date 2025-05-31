import { formatTime } from "@/lib/quiz-utils";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  timer: number;
}

export function ProgressBar({ currentQuestion, totalQuestions, timer }: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">Time:</span>
          <span className="text-lg font-bold text-accent bg-purple-100 px-3 py-1 rounded-full">
            {formatTime(timer)}
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-accent h-3 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
