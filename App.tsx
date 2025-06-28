import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Tabs, Tab } from './components/Tabs';
import { VerbExplorer } from './components/VerbExplorer';
import { Practice } from './components/Practice';
import { Learn } from './components/Learn';
import { getVerbDatabase } from './data/verbs';
import { Verb } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('explorer');
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVerbs = async () => {
      try {
        setLoading(true);
        const verbData = await getVerbDatabase();
        setVerbs(verbData);
      } catch (e) {
        setError("Failed to load verb data.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadVerbs();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center text-gray-400 p-8">Loading verbs...</div>;
    }
    if (error) {
      return <div className="text-center text-red-400 p-8">{error}</div>;
    }
    if (verbs.length > 0) {
      switch (activeTab) {
        case 'explorer':
          return <VerbExplorer verbs={verbs} />;
        case 'practice':
          return <Practice verbs={verbs} />;
        case 'learn':
          return <Learn />;
        default:
          return null;
      }
    }
    return <div className="text-center text-gray-400 p-8">No verb data found.</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a237e] via-gray-900 to-[#0d47a1]">
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="mt-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
