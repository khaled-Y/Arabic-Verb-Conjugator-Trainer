import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVerbContext } from '@/contexts/VerbContext';
import { useAppContext } from '@/contexts/AppContext';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { normalizeForSearch } from '@/lib/arabic-utils';
import LanguageToggle from '@/components/ui/language-toggle';

const ConjugationExercise: React.FC = () => {
  const { verbs, addExerciseResult } = useVerbContext();
  const { language } = useAppContext();
  const [currentVerb, setCurrentVerb] = useState(verbs[0]);
  const [currentConjugation, setCurrentConjugation] = useState(0);
  const [currentTense, setCurrentTense] = useState<'past' | 'present'>('past');
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const generateQuestion = () => {
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const randomConjIndex = Math.floor(Math.random() * randomVerb.verb_data.conjugations.length);
    const randomTense = Math.random() > 0.5 ? 'past' : 'present';
    
    setCurrentVerb(randomVerb);
    setCurrentConjugation(randomConjIndex);
    setCurrentTense(randomTense);
  };

  useEffect(() => {
    if (verbs.length > 0) {
      generateQuestion();
    }
  }, [verbs]);

  const getCorrectAnswer = () => {
    const conj = currentVerb.verb_data.conjugations[currentConjugation];
    return currentTense === 'past' ? conj.past_verb_ar : conj.present_verb_ar;
  };

  const handleSubmit = () => {
    const correctAnswer = getCorrectAnswer();
    const correct = normalizeForSearch(userAnswer.trim()) === normalizeForSearch(correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);
    
    addExerciseResult({
      exerciseType: 'conjugation',
      verbId: currentVerb.id,
      correct,
      timestamp: Date.now()
    });
  };

  const nextQuestion = () => {
    generateQuestion();
    setUserAnswer('');
    setShowResult(false);
    setQuestionsAnswered(prev => prev + 1);
  };

  if (verbs.length === 0) {
    return <div>Loading...</div>;
  }

  const currentConj = currentVerb.verb_data.conjugations[currentConjugation];
  const getTranslation = () => {
    return language === 'en' 
      ? currentVerb.verb_data.translations.en 
      : currentVerb.verb_data.translations.ru;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-center flex-1">
              {language === 'en' ? 'Conjugation Drill' : 'Упражнение на спряжение'}
            </CardTitle>
            <LanguageToggle />
          </div>
          <p className="text-center text-blue-100">
            {language === 'en' ? 'Questions: ' : 'Вопросы: '}{questionsAnswered}
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-gray-800">
              {language === 'en' ? 'Conjugate: ' : 'Проспрягать: '}
              <span className="text-blue-600 font-arabic" dir="rtl">{currentVerb.verb_data.infinitive_past}</span>
            </div>
            <div className="text-lg text-gray-600">
              ({getTranslation()})
            </div>
            <div className="text-md text-purple-600">
              {language === 'en' 
                ? `${currentTense} tense for ` 
                : `${currentTense === 'past' ? 'Прошедшее' : 'Настоящее'} время для `}
              <span className="font-arabic" dir="rtl">{currentConj.pronoun_ar}</span> ({currentConj.pronoun_translit})
            </div>
          </div>

          {!showResult ? (
            <div className="space-y-4">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={language === 'en' ? 'Enter the conjugated form' : 'Введите спряженную форму'}
                className="text-center text-lg font-arabic"
                dir="rtl"
              />
              <Button 
                onClick={handleSubmit} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!userAnswer.trim()}
              >
                {language === 'en' ? 'Submit Answer' : 'Отправить ответ'}
              </Button>
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
                    <span className="font-arabic" dir="rtl">{userAnswer}</span>
                  </div>
                  <div className="text-green-600">
                    {language === 'en' ? 'Correct answer: ' : 'Правильный ответ: '}
                    <span className="font-arabic" dir="rtl">{getCorrectAnswer()}</span>
                  </div>
                </div>
              )}
              
              <div className="text-sm text-gray-600">
                {language === 'en' ? 'Translation: ' : 'Перевод: '}
                {language === 'en' ? currentConj.translation_en : currentConj.translation_ru}
              </div>
              
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

export default ConjugationExercise;