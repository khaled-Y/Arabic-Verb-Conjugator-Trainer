import React, { useState, useMemo, useEffect } from 'react';
import { Verb } from '../types';
import { ConjugationTable } from './ConjugationTable';
import { VerbDetails } from './VerbDetails';

interface VerbExplorerProps {
  verbs: Verb[];
}

const stripDiacritics = (text: string) => {
    if (typeof text !== 'string') return '';
    return text.replace(/[ًٌٍَُِّْ]/g, '');
};


export const VerbExplorer: React.FC<VerbExplorerProps> = ({ verbs }) => {
  const [query, setQuery] = useState('');
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  
  useEffect(() => {
    if (verbs.length > 0 && !selectedVerb) {
      setSelectedVerb(verbs[0]);
    }
  }, [verbs, selectedVerb]);

  const suggestions = useMemo(() => {
    if (!query) return [];
    const lowerCaseQuery = query.toLowerCase();
    const strippedQuery = stripDiacritics(query);

    return verbs.filter(verb =>
      verb.verb_data.translations.en.toLowerCase().includes(lowerCaseQuery) ||
      stripDiacritics(verb.verb_data.infinitive_past).includes(strippedQuery) ||
      stripDiacritics(verb.verb_data.infinitive_present).includes(strippedQuery)
    ).slice(0, 5);
  }, [query, verbs]);
  
  const handleSelectVerb = (verb: Verb) => {
    setSelectedVerb(verb);
    setQuery('');
    setIsSuggestionsVisible(false);
  }

  return (
    <div className="space-y-8 animate-fadeIn">
       <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl">
         <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSuggestionsVisible(true)}
              onBlur={() => setTimeout(() => setIsSuggestionsVisible(false), 200)}
              placeholder="Search Arabic verb (e.g. كتب) or English meaning..."
              className="w-full bg-gray-900/50 border-2 border-gray-600 rounded-lg p-4 text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
            />
            {isSuggestionsVisible && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl overflow-hidden">
                {suggestions.map(verb => (
                  <li
                    key={verb.id}
                    onMouseDown={() => handleSelectVerb(verb)}
                    className="p-4 cursor-pointer hover:bg-cyan-600/50 transition duration-150"
                  >
                    <div className="flex justify-between items-center">
                       <span className="font-arabic text-xl text-right" dir="rtl">{verb.verb_data.infinitive_past}</span>
                       <span className="text-gray-300">{verb.verb_data.translations.en}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
         </div>
      </div>
      
      {selectedVerb ? (
        <div className="space-y-8">
          <VerbDetails verb={selectedVerb.verb_data} />
          <ConjugationTable verb={selectedVerb.verb_data} />
        </div>
      ) : (
        <div className="text-center py-16 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl">
          <p className="text-xl text-gray-400">Select a verb to see its details.</p>
        </div>
      )}
    </div>
  );
};
