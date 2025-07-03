import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useVerbContext } from '@/contexts/VerbContext';
import { useAppContext } from '@/contexts/AppContext';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import LanguageToggle from '@/components/ui/language-toggle';

const MeaningExercise: React.FC = () => {
  const { verbs, addExerciseResult } = useVerbContext();
  const { language } = useAppContext();
  const [currentVerb, setCurrentVerb] = useState(verbs[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const generateOptions = () => {
    const correctAnswer = language === 'en' ? currentVerb.verb_data.translations.en : currentVerb.verb_data.translations.ru;
    const wrongAnswers = verbs
      .filter(v => v.id !== currentVerb.id)
      .map(v => language === 'en' ? v.verb_data.translations.en : v.verb_data.translations.ru)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  useEffect(() => {
    if (verbs.length > 0) {
      generateOptions();
    }
  }, [currentVerb, language, verbs]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correctAnswer = language === 'en' ? currentVerb.verb_data.translations.en : currentVerb.verb_data.translations.ru;
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    addExerciseResult({
      exerciseType: 'meaning',
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
      <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-center flex-1">
              {language === 'en' ? 'Meaning Match' : 'Сопоставление значений'}
            </CardTitle>
            <LanguageToggle />
          </div>
          <p className="text-center text-green-100">
            {language === 'en' ? 'Questions: ' : 'Вопросы: '}{questionsAnswered}
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-gray-800 font-arabic" dir="rtl">
              {currentVerb.verb_data.infinitive_past}
            </div>
            <div className="text-lg text-gray-600">
              {language === 'en' 
                ? `What does this verb mean in ${language === 'en' ? 'English' : 'Russian'}?`
                : `Что означает этот глагол на ${language === 'en' ? 'английском' : 'русском'}?`}
            </div>
          </div>

          {!showResult ? (
            <div className="grid grid-cols-1 gap-3">
              {options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  variant="outline"
                  className="p-4 text-left hover:bg-blue-50 hover:border-blue-300"
                >
                  {option}
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
                    {language === 'en' ? 'Your answer: ' : 'Ваш ответ: '}{selectedAnswer}
                  </div>
                  <div className="text-green-600">
                    {language === 'en' ? 'Correct answer: ' : 'Правильный ответ: '}
                    {language === 'en' ? currentVerb.verb_data.translations.en : currentVerb.verb_data.translations.ru}
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

export default MeaningExercise;