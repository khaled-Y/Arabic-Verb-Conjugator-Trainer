import React from 'react';
import AppLayout from '@/components/AppLayout';
import { AppProvider } from '@/contexts/AppContext';
import { VerbProvider } from '@/contexts/VerbContext';

const Index: React.FC = () => {
  return (
    <AppProvider>
      <VerbProvider>
        <AppLayout />
      </VerbProvider>
    </AppProvider>
  );
};

export default Index;