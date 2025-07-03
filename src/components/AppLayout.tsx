import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VerbProvider } from '@/contexts/VerbContext';
import VerbExplorer from './VerbExplorer';
import PracticeSection from './PracticeSection';
import { BookOpen, Target, GraduationCap } from 'lucide-react';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('explorer');

  return (
    <VerbProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 my-4">
                <TabsTrigger value="explorer" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Explorer</span>
                </TabsTrigger>
                <TabsTrigger value="practice" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span className="hidden sm:inline">Practice</span>
                </TabsTrigger>
                <TabsTrigger value="learn" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Learn</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="explorer" className="mt-0">
            <VerbExplorer />
          </TabsContent>

          <TabsContent value="practice" className="mt-0">
            <PracticeSection />
          </TabsContent>

          <TabsContent value="learn" className="mt-0">
            <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 p-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center">
                  <GraduationCap className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Learning Center</h2>
                  <p className="text-gray-600 text-lg">
                    Comprehensive Arabic verb lessons and tutorials coming soon!
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </VerbProvider>
  );
};

export default AppLayout;