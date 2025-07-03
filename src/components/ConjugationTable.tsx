import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArabicVerb } from '@/types/verb';
import { useAppContext } from '@/contexts/AppContext';
import LanguageToggle from '@/components/ui/language-toggle';

interface ConjugationTableProps {
  verb: ArabicVerb;
}

const ConjugationTable: React.FC<ConjugationTableProps> = ({ verb }) => {
  const { language } = useAppContext();

  const renderConjugationGrid = (type: 'past' | 'present') => {
    const bgColor = type === 'past' ? 'bg-green-50' : 'bg-blue-50';
    const textColor = type === 'past' ? 'text-green-800' : 'text-blue-800';
    
    return (
      <div className="grid grid-cols-1 gap-2">
        {verb.verb_data.conjugations.map((conj, index) => (
          <Card key={index} className={`${bgColor} border`}>
            <CardContent className="p-3">
              <div className="grid grid-cols-4 gap-3 text-center">
                <div>
                  <div className="text-xs text-gray-600">{conj.pronoun_translit}</div>
                  <div className="font-arabic text-sm" dir="rtl">{conj.pronoun_ar}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">{type === 'past' ? 'Past' : 'Present'}</div>
                  <div className="font-arabic text-lg" dir="rtl">
                    {type === 'past' ? conj.past_verb_ar : conj.present_verb_ar}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {type === 'past' ? conj.past_verb_translit : conj.present_verb_translit}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">
                    {language === 'en' ? 'English' : 'Английский'}
                  </div>
                  <div className="text-sm">{conj.translation_en}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">
                    {language === 'en' ? 'Russian' : 'Русский'}
                  </div>
                  <div className="text-sm">{conj.translation_ru}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-center text-gray-800 flex-1">
            {language === 'en' ? 'Conjugation Table' : 'Таблица спряжения'} - {verb.verb_data.infinitive_past}
          </CardTitle>
          <LanguageToggle />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="past" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="past">
              {language === 'en' ? 'Past' : 'Прошедшее'}
            </TabsTrigger>
            <TabsTrigger value="present">
              {language === 'en' ? 'Present' : 'Настоящее'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="past" className="mt-6">
            {renderConjugationGrid('past')}
          </TabsContent>
          
          <TabsContent value="present" className="mt-6">
            {renderConjugationGrid('present')}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConjugationTable;