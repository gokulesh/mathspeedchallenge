import { Calculator, Clock } from "lucide-react";
import { formatTime } from "@/lib/quiz-utils";

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  timer: number;
}

export function QuizHeader({ currentQuestion, totalQuestions, timer }: QuizHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b-2 border-primary p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Calculator className="text-primary" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Math Quiz</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Question</span>
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
              {currentQuestion}
            </span>
            <span className="text-sm text-gray-600">of</span>
            <span className="text-sm font-medium text-gray-600">{totalQuestions}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="text-warning" size={20} />
            <span className="text-lg font-bold text-gray-800">
              {formatTime(timer)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
