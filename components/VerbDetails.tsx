
import React from 'react';
import { VerbData } from '../types';

interface VerbDetailsProps {
  verb: VerbData;
}

const InfoItem: React.FC<{ label: string; value: string; isArabic?: boolean }> = ({ label, value, isArabic }) => (
  <div className="bg-gray-800/50 p-4 rounded-lg">
    <p className="text-sm text-cyan-300">{label}</p>
    <p className={`text-xl font-semibold ${isArabic ? 'font-arabic' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>{value}</p>
  </div>
);


export const VerbDetails: React.FC<VerbDetailsProps> = ({ verb }) => {
  return (
    <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">Verb Information</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <InfoItem label="Past Tense" value={verb.infinitive_past} isArabic />
        <InfoItem label="Present Tense" value={verb.infinitive_present} isArabic />
        <InfoItem label="Root" value={verb.root.join(' - ')} isArabic />
        <InfoItem label="Form" value={verb.form} />
        <InfoItem label="Type" value={verb.verb_type_en} />
        <InfoItem label="Masdar (Verbal Noun)" value={verb.masdar} isArabic />
        <InfoItem label="English" value={verb.translations.en} />
        {verb.translations.ru && <InfoItem label="Russian" value={verb.translations.ru} />}
      </div>
      
      {verb.example_sentences.length > 0 && (
        <div className="mt-8">
            <h4 className="text-xl font-bold text-cyan-300 mb-4">Example Sentences</h4>
            <div className="space-y-4">
                {verb.example_sentences.map((ex, index) => (
                    <div key={index} className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-cyan-400">
                        <p className="font-arabic text-2xl text-right text-white" dir="rtl">{ex.ar}</p>
                        <p className="text-md text-gray-400 text-right" dir="rtl"><em>{ex.translit}</em></p>
                        <p className="mt-2 text-gray-300">{ex.en}</p>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};
