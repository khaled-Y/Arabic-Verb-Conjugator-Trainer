export interface ArabicVerb {
  id: string;
  verb_data: {
    id: number;
    infinitive_past: string;
    infinitive_present: string;
    root: string[];
    form: string;
    verb_type_ar: string;
    verb_type_en: string;
    masdar: string;
    translations: {
      en: string;
      ru: string;
    };
    example_sentences: {
      ar: string;
      translit: string;
      en: string;
      ru: string;
    }[];
    conjugations: {
      pronoun_ar: string;
      pronoun_translit: string;
      past_verb_ar: string;
      past_verb_translit: string;
      present_verb_ar: string;
      present_verb_translit: string;
      translation_en: string;
      translation_ru: string;
    }[];
  };
}

export interface ExerciseResult {
  exerciseType: ExerciseType;
  verbId: string;
  correct: boolean;
  timestamp: number;
}

export type ExerciseType = 'conjugation' | 'meaning' | 'form' | 'root' | 'pattern';