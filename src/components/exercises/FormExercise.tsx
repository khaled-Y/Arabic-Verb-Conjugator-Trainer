import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useVerbContext } from '@/contexts/VerbContext';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const FormExercise: React.FC = () => {
  const { verbs, addExerciseResult } = useVerbContext();
  const [currentVerb, setCurrentVerb] = useState(verbs[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const forms = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentVerb.verb_data.form;
    setIsCorrect(correct);
    setShowResult(true);
    
    addExerciseResult({
      exerciseType: 'form',
      verbId: currentVerb.id,
      correct,
      timestamp: Date.now()
    });
  };

  const nextQuestion = () => {
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    setCurrentVerb(randomVerb);
    setSelectedAnswer('');
    setShowResult(false);
    setQuestionsAnswered(prev => prev + 1);
  };

  if (verbs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <CardHeader>
          <CardTitle className="text-center">Verb Form Quiz</CardTitle>
          <p className="text-center text-purple-100">Questions: {questionsAnswered}</p>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-gray-800 font-arabic" dir="rtl">
              {currentVerb.verb_data.infinitive_past}
            </div>
            <div className="text-lg text-gray-600">
              ({currentVerb.verb_data.translations.en} / {currentVerb.verb_data.translations.ru})
            </div>
            <div className="text-md text-purple-600">
              What form is this verb?
            </div>
          </div>

          {!showResult ? (
            <div className="grid grid-cols-5 gap-2">
              {forms.map((form) => (
                <Button
                  key={form}
                  onClick={() => handleAnswer(form)}
                  variant="outline"
                  className="p-3 hover:bg-purple-50 hover:border-purple-300"
                >
                  {form}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <div className={`flex items-center justify-center gap-2 text-lg font-semibold ${
                isCorrect ? 'text-green-600' : 'text-red-600'
              }`}>
                {isCorrect ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
              
              {!isCorrect && (
                <div className="space-y-2">
                  <div className="text-red-600">Your answer: Form {selectedAnswer}</div>
                  <div className="text-green-600">Correct answer: Form {currentVerb.verb_data.form}</div>
                </div>
              )}
              
              <Button onClick={nextQuestion} className="bg-green-600 hover:bg-green-700">
                Next Question <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormExercise;