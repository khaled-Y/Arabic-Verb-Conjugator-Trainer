import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArabicVerb } from '@/types/verb';

interface VerbCardProps {
  verb: ArabicVerb;
}

const VerbCard: React.FC<VerbCardProps> = ({ verb }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {verb.verb_data.translations.en}
        </CardTitle>
        <div className="text-lg text-gray-600 mt-1">
          {verb.verb_data.translations.ru}
        </div>
        <div className="flex justify-center gap-2 mt-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Form {verb.verb_data.form}
          </Badge>
          <Badge variant="outline" className="border-purple-300 text-purple-700">
            {verb.verb_data.verb_type_en}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Root</div>
            <div className="font-arabic text-2xl text-blue-600 font-bold" dir="rtl">
              {verb.verb_data.root.join(' ')}
            </div>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Masdar</div>
            <div className="font-arabic text-xl text-purple-600" dir="rtl">
              {verb.verb_data.masdar}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Past Tense</div>
            <div className="font-arabic text-2xl text-green-700 font-bold" dir="rtl">
              {verb.verb_data.infinitive_past}
            </div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Present Tense</div>
            <div className="font-arabic text-2xl text-orange-700 font-bold" dir="rtl">
              {verb.verb_data.infinitive_present}
            </div>
          </div>
        </div>
        
        {verb.verb_data.example_sentences && verb.verb_data.example_sentences.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Example Sentence</h4>
            <div className="space-y-2">
              <div className="font-arabic text-lg text-right" dir="rtl">
                {verb.verb_data.example_sentences[0].ar}
              </div>
              <div className="text-sm text-gray-600 italic">
                {verb.verb_data.example_sentences[0].translit}
              </div>
              <div className="text-sm text-gray-800">
                <span className="font-medium">EN:</span> {verb.verb_data.example_sentences[0].en}
              </div>
              <div className="text-sm text-gray-800">
                <span className="font-medium">RU:</span> {verb.verb_data.example_sentences[0].ru}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerbCard;