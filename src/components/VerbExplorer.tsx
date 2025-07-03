import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VerbSearch from './VerbSearch';
import VerbCard from './VerbCard';
import ConjugationTable from './ConjugationTable';
import { useVerbContext } from '@/contexts/VerbContext';
import { BookOpen, Search, Shuffle } from 'lucide-react';

const VerbExplorer: React.FC = () => {
  const { selectedVerb, setSelectedVerb, getRandomVerb } = useVerbContext();

  const handleRandomVerb = () => {
    const randomVerb = getRandomVerb();
    setSelectedVerb(randomVerb);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
              <BookOpen className="h-8 w-8" />
              Arabic Verb Explorer
            </CardTitle>
            <p className="text-blue-100 text-lg mt-2">
              Discover and explore Arabic verb conjugations
            </p>
          </CardHeader>
        </Card>

        {/* Search Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-gray-500" />
                <VerbSearch />
              </div>
              <Button 
                onClick={handleRandomVerb}
                variant="outline"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600"
              >
                <Shuffle className="h-4 w-4" />
                Random Verb
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Verb Display */}
        {selectedVerb ? (
          <div className="space-y-6">
            <VerbCard verb={selectedVerb} />
            <ConjugationTable verb={selectedVerb} />
          </div>
        ) : (
          <Card className="bg-white/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto" />
                <h3 className="text-2xl font-semibold text-gray-600">
                  Select a Verb to Explore
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Use the search box above to find a specific verb, or click "Random Verb" to discover new vocabulary.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VerbExplorer;