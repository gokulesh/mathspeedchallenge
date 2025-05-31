import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Plus, Minus, X, Divide } from "lucide-react";

interface WelcomeScreenProps {
  onStartQuiz: () => void;
}

export function WelcomeScreen({ onStartQuiz }: WelcomeScreenProps) {
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
          
          <Button 
            onClick={onStartQuiz}
            size="lg"
            className="bg-primary hover:bg-blue-600 text-white text-xl font-bold py-6 px-12 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 h-auto"
          >
            Start Quiz! 🚀
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
