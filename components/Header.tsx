
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center p-6 md:p-8 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
        Arabic Verb Conjugator & Trainer
      </h1>
      <h2 className="font-arabic text-3xl md:text-4xl text-cyan-300 mt-2" dir="rtl">
        مُدَرِّب تَصْرِيف الْأَفْعَال الْعَرَبِيَّة
      </h2>
      <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
        Master Arabic verb conjugation through interactive learning, practice exercises, and comprehensive reference tools.
      </p>
    </header>
  );
};
