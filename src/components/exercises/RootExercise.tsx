import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVerbContext } from '@/contexts/VerbContext';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { normalizeForSearch } from '@/lib/arabic-utils';

const RootExercise: React.FC = () => {
  const { verbs, addExerciseResult } = useVerbContext();
  const [currentVerb, setCurrentVerb] = useState(verbs[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const handleSubmit = () => {
    const correctAnswer = currentVerb.verb_data.root.join('');
    const correct = normalizeForSearch(userAnswer.trim()) === normalizeForSearch(correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);
    
    addExerciseResult({
      exerciseType: 'root',
      verbId: currentVerb.id,
      correct,
      timestamp: Date.now()
    });
  };

  const nextQuestion = () => {
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    setCurrentVerb(randomVerb);
    setUserAnswer('');
    setShowResult(false);
    setQuestionsAnswered(prev => prev + 1);
  };

  if (verbs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <CardHeader>
          <CardTitle className="text-center">Root Identification</CardTitle>
          <p className="text-center text-orange-100">Questions: {questionsAnswered}</p>
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
              What is the root of this verb?
            </div>
          </div>

          {!showResult ? (
            <div className="space-y-4">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter the root letters"
                className="text-center text-lg font-arabic"
                dir="rtl"
              />
              <Button 
                onClick={handleSubmit} 
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={!userAnswer.trim()}
              >
                Submit Answer
              </Button>
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
                  <div className="text-red-600">Your answer: <span className="font-arabic" dir="rtl">{userAnswer}</span></div>
                  <div className="text-green-600">Correct answer: <span className="font-arabic" dir="rtl">{currentVerb.verb_data.root.join('')}</span></div>
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

export default RootExercise;