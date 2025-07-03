import React, { createContext, useContext, useState, useEffect } from 'react';
import { ArabicVerb, ExerciseResult, ExerciseType } from '@/types/verb';

interface VerbContextType {
  verbs: ArabicVerb[];
  selectedVerb: ArabicVerb | null;
  searchTerm: string;
  filteredVerbs: ArabicVerb[];
  currentExercise: ExerciseType | null;
  score: number;
  exerciseHistory: ExerciseResult[];
  setSelectedVerb: (verb: ArabicVerb | null) => void;
  setSearchTerm: (term: string) => void;
  setCurrentExercise: (type: ExerciseType | null) => void;
  addExerciseResult: (result: ExerciseResult) => void;
  resetScore: () => void;
  getRandomVerb: () => ArabicVerb;
}

const VerbContext = createContext<VerbContextType | undefined>(undefined);

export const useVerbContext = () => {
  const context = useContext(VerbContext);
  if (!context) {
    throw new Error('useVerbContext must be used within VerbProvider');
  }
  return context;
};

export const VerbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [verbs, setVerbs] = useState<ArabicVerb[]>([]);
  const [selectedVerb, setSelectedVerb] = useState<ArabicVerb | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentExercise, setCurrentExercise] = useState<ExerciseType | null>(null);
  const [score, setScore] = useState(0);
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseResult[]>([]);

  useEffect(() => {
    const loadVerbs = async () => {
      try {
        const response = await fetch('/verbs.json');
        const verbsData = await response.json();
        setVerbs(verbsData);
      } catch (error) {
        console.error('Failed to load verbs:', error);
      }
    };
    loadVerbs();
  }, []);

  const filteredVerbs = verbs.filter(verb => 
    verb.verb_data.translations.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verb.verb_data.root.join('').includes(searchTerm) ||
    verb.verb_data.infinitive_past.includes(searchTerm)
  );

  const addExerciseResult = (result: ExerciseResult) => {
    setExerciseHistory(prev => [...prev, result]);
    if (result.correct) {
      setScore(prev => prev + 1);
    }
  };

  const resetScore = () => {
    setScore(0);
    setExerciseHistory([]);
  };

  const getRandomVerb = (): ArabicVerb => {
    const randomIndex = Math.floor(Math.random() * verbs.length);
    return verbs[randomIndex];
  };

  return (
    <VerbContext.Provider value={{
      verbs,
      selectedVerb,
      searchTerm,
      filteredVerbs,
      currentExercise,
      score,
      exerciseHistory,
      setSelectedVerb,
      setSearchTerm,
      setCurrentExercise,
      addExerciseResult,
      resetScore,
      getRandomVerb
    }}>
      {children}
    </VerbContext.Provider>
  );
};