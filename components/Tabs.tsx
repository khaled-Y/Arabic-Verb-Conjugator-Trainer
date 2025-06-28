
import React from 'react';

export type Tab = 'explorer' | 'practice' | 'learn';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabOptions: { id: Tab; label: string }[] = [
  { id: 'explorer', label: 'Verb Explorer' },
  { id: 'practice', label: 'Practice' },
  { id: 'learn', label: 'Learn' },
];

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="mt-8 flex justify-center items-center bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-2 shadow-lg">
      <ul className="flex space-x-2">
        {tabOptions.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm md:px-6 md:py-3 md:text-base font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
