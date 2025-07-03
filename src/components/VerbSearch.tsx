import React from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useVerbContext } from '@/contexts/VerbContext';
import { ArabicVerb } from '@/types/verb';
import { normalizeForSearch } from '@/lib/arabic-utils';

const VerbSearch: React.FC = () => {
  const { searchTerm, setSearchTerm, verbs, setSelectedVerb } = useVerbContext();
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  // Filter verbs with diacritic-insensitive search
  const filteredVerbs = React.useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const normalizedSearch = normalizeForSearch(searchTerm);
    
    return verbs.filter(verb => {
      const searchableFields = [
        verb.verb_data.infinitive_past,
        verb.verb_data.infinitive_present,
        verb.verb_data.translations.en,
        verb.verb_data.translations.ru,
        verb.verb_data.masdar,
        ...verb.verb_data.root
      ];
      
      return searchableFields.some(field => 
        normalizeForSearch(field).includes(normalizedSearch)
      );
    });
  }, [searchTerm, verbs]);

  const handleVerbSelect = (verb: ArabicVerb) => {
    setSelectedVerb(verb);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Search verbs... (Arabic, English, Russian)"
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-full text-lg"
        dir="auto"
      />
      
      {showSuggestions && filteredVerbs.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto z-50 bg-white shadow-lg">
          {filteredVerbs.slice(0, 8).map((verb) => (
            <div
              key={verb.id}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              onClick={() => handleVerbSelect(verb)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-arabic text-lg text-right">
                    {verb.verb_data.infinitive_past}
                  </div>
                  <div className="text-sm text-gray-600">
                    {verb.verb_data.translations.en} • {verb.verb_data.translations.ru} • Form {verb.verb_data.form}
                  </div>
                </div>
                <div className="text-sm text-gray-500 font-arabic">
                  {verb.verb_data.root.join('')}
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default VerbSearch;