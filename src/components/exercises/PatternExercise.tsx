import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useVerbContext } from '@/contexts/VerbContext';
import { useAppContext } from '@/contexts/AppContext';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import LanguageToggle from '@/components/ui/language-toggle';

const PatternExercise: React.FC = () => {
  const { verbs, addExerciseResult } = useVerbContext();
  const { language } = useAppContext();
  const [currentVerb, setCurrentVerb] = useState(verbs[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const patterns = [
    'فَعَلَ', 'فَعِلَ', 'فَعُلَ', 'أَفْعَلَ', 'فَعَّلَ',
    'فَاعَلَ', 'انْفَعَلَ', 'افْتَعَلَ', 'اسْتَفْعَلَ', 'تَفَعَّلَ'
  ];

  const generateOptions = () => {
    const correctPattern = currentVerb.pattern;
    const wrongPatterns = patterns
      .filter(p => p !== correctPattern)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [correctPattern, ...wrongPatterns].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  useEffect(() => {
    generateOptions();
  }, [currentVerb]);

  const handleAnswer = (pattern: string) => {
    setSelectedAnswer(pattern);
    const correct = pattern === currentVerb.pattern;
    setIsCorrect(correct);
    setShowResult(true);
    
    addExerciseResult({
      exerciseType: 'pattern',
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

  const getTranslation = () => {
    return language === 'en' 
      ? currentVerb.verb_data.translations.en 
      : currentVerb.verb_data.translations.ru;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-center flex-1">Pattern Practice</CardTitle>
            <LanguageToggle />
          </div>
          <p className="text-center text-red-100">Questions: {questionsAnswered}</p>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-gray-800 font-arabic" dir="rtl">
              {currentVerb.verb_data.infinitive_past}
            </div>
            <div className="text-lg text-gray-600">
              ({getTranslation()})
            </div>
            <div className="text-md text-red-600">
              {language === 'en' 
                ? 'Which pattern does this verb follow?' 
                : 'Какой шаблон у этого глагола?'}
            </div>
          </div>

          {!showResult ? (
            <div className="grid grid-cols-1 gap-3">
              {options.map((pattern, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(pattern)}
                  variant="outline"
                  className="p-4 text-xl font-arabic hover:bg-red-50 hover:border-red-300"
                  dir="rtl"
                >
                  {pattern}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <div className={`flex items-center justify-center gap-2 text-lg font-semibold ${
                isCorrect ? 'text-green-600' : 'text-red-600'
              }`}>
                {isCorrect ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                {isCorrect 
                  ? (language === 'en' ? 'Correct!' : 'Правильно!') 
                  : (language === 'en' ? 'Incorrect' : 'Неправильно')}
              </div>
              
              {!isCorrect && (
                <div className="space-y-2">
                  <div className="text-red-600">
                    {language === 'en' ? 'Your answer: ' : 'Ваш ответ: '}
                    <span className="font-arabic">{selectedAnswer}</span>
                  </div>
                  <div className="text-green-600">
                    {language === 'en' ? 'Correct answer: ' : 'Правильный ответ: '}
                    <span className="font-arabic">{currentVerb.pattern}</span>
                  </div>
                </div>
              )}
              
              <Button onClick={nextQuestion} className="bg-green-600 hover:bg-green-700">
                {language === 'en' ? 'Next Question' : 'Следующий вопрос'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatternExercise;