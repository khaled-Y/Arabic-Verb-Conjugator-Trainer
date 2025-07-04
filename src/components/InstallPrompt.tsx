import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

interface InstallPromptProps {
  onDismiss: () => void;
}

export const InstallPrompt: React.FC<InstallPromptProps> = ({ onDismiss }) => {
  const { installApp, isInstallable } = usePWA();

  if (!isInstallable) return null;

  const handleInstall = () => {
    installApp();
    onDismiss();
  };

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Install App</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Install Arabic Trainer for quick access and offline use
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button onClick={handleInstall} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Install App
        </Button>
      </CardContent>
    </Card>
  );
};

