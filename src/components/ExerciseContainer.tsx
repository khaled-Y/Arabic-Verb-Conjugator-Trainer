import React from 'react';
import { useVerbContext } from '@/contexts/VerbContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ConjugationExercise from './exercises/ConjugationExercise';
import MeaningExercise from './exercises/MeaningExercise';
import FormExercise from './exercises/FormExercise';
import RootExercise from './exercises/RootExercise';
import PatternExercise from './exercises/PatternExercise';

const ExerciseContainer: React.FC = () => {
  const { currentExercise, setCurrentExercise } = useVerbContext();

  const handleBackToPractice = () => {
    setCurrentExercise(null);
  };

  const renderExercise = () => {
    switch (currentExercise) {
      case 'conjugation':
        return <ConjugationExercise />;
      case 'meaning':
        return <MeaningExercise />;
      case 'form':
        return <FormExercise />;
      case 'root':
        return <RootExercise />;
      case 'pattern':
        return <PatternExercise />;
      default:
        return null;
    }
  };

  if (!currentExercise) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-start">
          <Button
            onClick={handleBackToPractice}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practice
          </Button>
        </div>
        
        {renderExercise()}
      </div>
    </div>
  );
};

export default ExerciseContainer;