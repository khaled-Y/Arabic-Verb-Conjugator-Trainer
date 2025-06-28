
import React from 'react';
import { VerbData } from '../types';

interface ConjugationTableProps {
  verb: VerbData;
}

export const ConjugationTable: React.FC<ConjugationTableProps> = ({ verb }) => {
  return (
    <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-2 md:p-6 shadow-xl overflow-hidden">
       <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6 px-4 md:px-0">Conjugations</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-center">
          <thead className="bg-black/30">
            <tr>
              <th className="p-4 font-semibold text-cyan-300 rounded-tl-lg">Pronoun</th>
              <th className="p-4 font-semibold text-cyan-300">Past Tense</th>
              <th className="p-4 font-semibold text-cyan-300">Present Tense</th>
              <th className="p-4 font-semibold text-cyan-300 rounded-tr-lg">English</th>
            </tr>
          </thead>
          <tbody>
            {verb.conjugations.map((c, index) => (
              <tr key={index} className="border-b border-gray-700/50 last:border-b-0 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="font-arabic text-xl">{c.pronoun_ar}</div>
                  <div className="text-sm text-gray-400">{c.pronoun_translit}</div>
                </td>
                <td className="p-4">
                  <div className="font-arabic text-xl">{c.past_verb_ar}</div>
                  <div className="text-sm text-gray-400">{c.past_verb_translit}</div>
                </td>
                <td className="p-4">
                  <div className="font-arabic text-xl">{c.present_verb_ar}</div>
                  <div className="text-sm text-gray-400">{c.present_verb_translit}</div>
                </td>
                <td className="p-4 text-gray-300">{c.translation_en}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
