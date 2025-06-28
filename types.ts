
export interface Translation {
  en: string;
  ru?: string;
}

export interface ExampleSentence {
  ar: string;
  translit: string;
  en: string;
  ru?: string;
}

export interface Conjugation {
  pronoun_ar: string;
  pronoun_translit: string;
  past_verb_ar: string;
  past_verb_translit: string;
  present_verb_ar: string;
  present_verb_translit: string;
  translation_en: string;
  translation_ru?: string;
}

export interface VerbData {
  id: number;
  root: string[];
  form: string;
  infinitive_past: string;
  infinitive_present: string;
  masdar: string;
  verb_type_en: string;
  verb_type_ar: string;
  translations: Translation;
  conjugations: Conjugation[];
  example_sentences: ExampleSentence[];
}

export interface Verb {
  id: string;
  verb_data: VerbData;
}

export type DrillType = 'random_mix' | 'pronoun_drill' | 'root_recognition' | 'tense_identification' | 'translation_matching';

export interface ExerciseData {
  verb: Verb;
  question: string;
  correctAnswer: string;
  options?: string[];
  answerType: 'conjugation' | 'root' | 'tense' | 'translation';
}
