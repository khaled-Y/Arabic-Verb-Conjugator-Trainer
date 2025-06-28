
import React, { useState, useCallback } from 'react';
import { generateExampleSentence } from '../services/geminiService';

export const Learn: React.FC = () => {
  const [verb, setVerb] = useState('كَتَبَ');
  const [tense, setTense] = useState('past');
  const [generatedSentence, setGeneratedSentence] = useState<{ ar: string; translit: string; en: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!verb) {
      setError('Please enter a verb.');
      return;
    }
    setLoading(true);
    setError(null);
    setGeneratedSentence(null);
    try {
      const result = await generateExampleSentence(verb, tense);
      setGeneratedSentence(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, [verb, tense]);

  return (
    <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl animate-fadeIn">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
        AI Sentence Generator
      </h2>
      <p className="text-center text-gray-400 mb-8">Generate unique example sentences using AI.</p>
      
      <div className="max-w-xl mx-auto space-y-4">
        <div>
          <label htmlFor="verb-input" className="block mb-2 text-sm font-medium text-cyan-300">Verb (in Arabic)</label>
          <input
            id="verb-input"
            type="text"
            value={verb}
            onChange={(e) => setVerb(e.target.value)}
            placeholder="e.g., كَتَبَ"
            className="font-arabic text-right w-full bg-gray-900/50 border-2 border-gray-600 rounded-lg p-3 text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
            dir="rtl"
          />
        </div>
        <div>
           <label htmlFor="tense-select" className="block mb-2 text-sm font-medium text-cyan-300">Tense</label>
           <select 
             id="tense-select"
             value={tense}
             onChange={(e) => setTense(e.target.value)}
             className="w-full bg-gray-900/50 border-2 border-gray-600 rounded-lg p-3 text-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
            >
               <option value="past">Past</option>
               <option value="present">Present</option>
           </select>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-wait flex items-center justify-center"
        >
          {loading ? (
             <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
             </>
          ) : '✨ Generate Sentence'}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 rounded-lg bg-red-500/80 text-white font-bold text-center">
          <p>Error: {error}</p>
        </div>
      )}
      
      {generatedSentence && (
         <div className="mt-8">
            <h4 className="text-xl font-bold text-cyan-300 mb-4 text-center">Generated Example</h4>
            <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-purple-400">
                <p className="font-arabic text-2xl text-right text-white" dir="rtl">{generatedSentence.ar}</p>
                <p className="text-md text-gray-400 text-right" dir="rtl"><em>{generatedSentence.translit}</em></p>
                <p className="mt-2 text-gray-300">{generatedSentence.en}</p>
            </div>
        </div>
      )}
    </div>
  );
};
