import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, CheckCircle, XCircle, RotateCcw, Home } from "lucide-react";
import { QuizResult } from "@/types/quiz";
import { calculateQuizSummary, formatTime } from "@/lib/quiz-utils";

interface ResultsScreenProps {
  results: QuizResult[];
  onRestartQuiz: () => void;
  onGoHome: () => void;
}

export function ResultsScreen({ results, onRestartQuiz, onGoHome }: ResultsScreenProps) {
  const summary = calculateQuizSummary(results);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
          <Trophy className="text-warning" size={48} />
          Quiz Complete!
        </h2>
        
        <Card className="border-4 border-success shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-success mb-2">
                  {summary.score}/{summary.totalQuestions}
                </div>
                <div className="text-gray-600">Correct Answers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">
                  {formatTime(summary.averageTime)}
                </div>
                <div className="text-gray-600">Average Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {formatTime(summary.totalTime)}
                </div>
                <div className="text-gray-600">Total Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Question Details:</h3>
        
        {results.map((result, index) => (
          <Card
            key={index}
            className={`border-l-4 ${
              result.isCorrect ? "border-success" : "border-error"
            } shadow-md`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-xl font-semibold text-gray-800 mb-1">
                    Question {result.questionNumber}: {result.question} = {result.correctAnswer}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {result.isCorrect ? (
                        <CheckCircle className="text-success" size={20} />
                      ) : (
                        <XCircle className="text-error" size={20} />
                      )}
                      <span
                        className={`font-medium ${
                          result.isCorrect ? "text-success" : "text-error"
                        }`}
                      >
                        {result.isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      Your answer: <span className="font-medium">{result.userAnswer}</span>
                    </span>
                    {!result.isCorrect && (
                      <span className="text-gray-600">
                        Correct: <span className="font-medium text-success">{result.correctAnswer}</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">
                    {formatTime(result.timeSpent)}
                  </div>
                  <div className="text-sm text-gray-500">Time taken</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-8">
        <Button
          onClick={onRestartQuiz}
          className="bg-primary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 h-auto"
        >
          <RotateCcw className="mr-2" size={20} />
          Try Again
        </Button>
        <Button
          onClick={onGoHome}
          variant="outline"
          className="font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 h-auto"
        >
          <Home className="mr-2" size={20} />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
