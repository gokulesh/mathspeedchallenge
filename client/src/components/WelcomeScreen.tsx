import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Plus, Minus, X, Divide, Shuffle, BookOpen } from "lucide-react";
import { QuestionMode } from "@/lib/quiz-utils";
import { useState } from "react";

interface WelcomeScreenProps {
  onStartQuiz: (mode: QuestionMode) => void;
}

export function WelcomeScreen({ onStartQuiz }: WelcomeScreenProps) {
  const [selectedMode, setSelectedMode] = useState<QuestionMode>('random');

  return (
    <div className="text-center space-y-8">
      <Card className="border-4 border-primary shadow-xl">
        <CardContent className="p-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Calculator className="text-primary" size={48} />
              Math Quiz Adventure!
            </h1>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Practice mental math with fun questions. You'll have 10 questions to solve as quickly as you can!
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
              <Plus className="text-blue-600 mx-auto mb-2" size={24} />
              <div className="text-sm font-medium text-blue-700">Addition</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
              <Minus className="text-green-600 mx-auto mb-2" size={24} />
              <div className="text-sm font-medium text-green-700">Subtraction</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
              <X className="text-purple-600 mx-auto mb-2" size={24} />
              <div className="text-sm font-medium text-purple-700">Multiplication</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
              <Divide className="text-yellow-600 mx-auto mb-2" size={24} />
              <div className="text-sm font-medium text-yellow-700">Division</div>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200">
              <div className="text-2xl mb-2 text-red-600">x²</div>
              <div className="text-sm font-medium text-red-700">Squares</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border-2 border-indigo-200">
              <div className="text-2xl mb-2 text-indigo-600">√</div>
              <div className="text-sm font-medium text-indigo-700">Square Roots</div>
            </div>
          </div>

          {/* Question Mode Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Choose Your Challenge:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => setSelectedMode('random')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedMode === 'random'
                    ? 'border-primary bg-blue-50 text-primary'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <Shuffle className="mx-auto mb-2" size={24} />
                <div className="text-sm font-medium">Random</div>
                <div className="text-xs text-gray-500">New every time</div>
              </button>
              
              <button
                onClick={() => setSelectedMode('beginner')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedMode === 'beginner'
                    ? 'border-green-500 bg-green-50 text-green-600'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <BookOpen className="mx-auto mb-2" size={24} />
                <div className="text-sm font-medium">Beginner</div>
                <div className="text-xs text-gray-500">Easy questions</div>
              </button>
              
              <button
                onClick={() => setSelectedMode('intermediate')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedMode === 'intermediate'
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-600'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <BookOpen className="mx-auto mb-2" size={24} />
                <div className="text-sm font-medium">Intermediate</div>
                <div className="text-xs text-gray-500">Medium difficulty</div>
              </button>
              
              <button
                onClick={() => setSelectedMode('advanced')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedMode === 'advanced'
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <BookOpen className="mx-auto mb-2" size={24} />
                <div className="text-sm font-medium">Advanced</div>
                <div className="text-xs text-gray-500">Challenging</div>
              </button>
            </div>
          </div>
          
          <Button 
            onClick={() => onStartQuiz(selectedMode)}
            size="lg"
            className="bg-primary hover:bg-blue-600 text-white text-xl font-bold py-6 px-12 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 h-auto"
          >
            Start Quiz!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
