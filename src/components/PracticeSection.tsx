import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVerbContext } from '@/contexts/VerbContext';
import { ExerciseType } from '@/types/verb';
import { Target, Brain, BookOpen, Zap, Trophy } from 'lucide-react';
import ExerciseContainer from './ExerciseContainer';

const PracticeSection: React.FC = () => {
  const { currentExercise, setCurrentExercise, score, exerciseHistory, resetScore } = useVerbContext();

  const exerciseTypes: { type: ExerciseType; title: string; description: string; icon: React.ReactNode; color: string }[] = [
    {
      type: 'conjugation',
      title: 'Conjugation Drill',
      description: 'Practice verb conjugations in different tenses and persons',
      icon: <Target className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'meaning',
      title: 'Meaning Match',
      description: 'Match Arabic verbs with their English meanings',
      icon: <Brain className="h-6 w-6" />,
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'form',
      title: 'Form Recognition',
      description: 'Identify the correct verb form (I-X)',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      type: 'root',
      title: 'Root Extraction',
      description: 'Extract the three-letter root from verb forms',
      icon: <Zap className="h-6 w-6" />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      type: 'pattern',
      title: 'Pattern Practice',
      description: 'Learn verb patterns and weights',
      icon: <Trophy className="h-6 w-6" />,
      color: 'from-red-500 to-red-600'
    }
  ];

  const handleStartExercise = (type: ExerciseType) => {
    setCurrentExercise(type);
  };

  const correctAnswers = exerciseHistory.filter(result => result.correct).length;
  const totalAnswers = exerciseHistory.length;
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

  // If an exercise is active, show the exercise container
  if (currentExercise) {
    return <ExerciseContainer />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
              <Target className="h-8 w-8" />
              Practice Center
            </CardTitle>
            <p className="text-green-100 text-lg mt-2">
              Master Arabic verbs through interactive exercises
            </p>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-blue-700">Current Score</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
              <div className="text-sm text-green-700">Accuracy</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{totalAnswers}</div>
              <div className="text-sm text-purple-700">Questions Answered</div>
            </CardContent>
          </Card>
        </div>

        {/* Exercise Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exerciseTypes.map((exercise) => (
            <Card 
              key={exercise.type}
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className={`bg-gradient-to-r ${exercise.color} text-white rounded-t-lg`}>
                <CardTitle className="flex items-center gap-3 text-lg">
                  {exercise.icon}
                  {exercise.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">Available</Badge>
                  <Button 
                    onClick={() => handleStartExercise(exercise.type)}
                    size="sm" 
                    className={`bg-gradient-to-r ${exercise.color} text-white border-none hover:opacity-90`}
                  >
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reset Button */}
        {totalAnswers > 0 && (
          <div className="text-center">
            <Button 
              onClick={resetScore}
              variant="outline"
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-none hover:from-red-600 hover:to-pink-600"
            >
              Reset Progress
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeSection;