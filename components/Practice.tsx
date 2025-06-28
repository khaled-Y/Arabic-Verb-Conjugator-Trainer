
import React, { useState, useCallback } from 'react';
import { Verb, DrillType, ExerciseData } from '../types';

const practicePronouns = ["أَنَا", "أَنْتَ", "أَنْتِ", "هُوَ", "هِيَ", "نَحْنُ"];

const drillOptions: { id: DrillType; label: string; description: string }[] = [
    { id: 'random_mix', label: 'Random Conjugation', description: 'Conjugate random verbs for random pronouns.' },
    { id: 'root_recognition', label: 'Root Recognition', description: 'Identify the three-letter root of a conjugated verb.' },
    { id: 'tense_identification', label: 'Tense Identification', description: 'Is the verb in the past or present tense?' },
    { id: 'translation_matching', label: 'Translation Matching', description: 'Match the conjugated verb to its English meaning.' },
];

const generateExercise = (type: DrillType, verbs: Verb[], pronoun?: string): ExerciseData => {
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const targetPronoun = pronoun || practicePronouns[Math.floor(Math.random() * practicePronouns.length)];
    const conjugation = verb.verb_data.conjugations.find(c => c.pronoun_ar === targetPronoun);
    if (!conjugation) return generateExercise(type, verbs, pronoun); // Recurse if conjugation not found

    const tense = Math.random() > 0.5 ? 'past' : 'present';
    const conjugatedVerb = tense === 'past' ? conjugation.past_verb_ar : conjugation.present_verb_ar;
    
    switch (type) {
        case 'root_recognition':
            return { verb, question: `What is the root of <span class="font-arabic text-2xl mx-2 text-cyan-300">${conjugatedVerb}</span>?`, correctAnswer: verb.verb_data.root.join('-'), answerType: 'root' };
        case 'tense_identification':
            return { verb, question: `Is the verb <span class="font-arabic text-2xl mx-2 text-cyan-300">${conjugatedVerb}</span> past or present tense?`, correctAnswer: tense, options: ['past', 'present'], answerType: 'tense' };
        case 'translation_matching':
             const wrongAnswers = new Set<string>();
             while (wrongAnswers.size < 3) {
                 const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
                 const randomConj = randomVerb.verb_data.conjugations[Math.floor(Math.random() * randomVerb.verb_data.conjugations.length)];
                 if(randomConj.translation_en !== conjugation.translation_en) wrongAnswers.add(randomConj.translation_en);
             }
            return { verb, question: `What is the meaning of <span class="font-arabic text-2xl mx-2 text-cyan-300">${conjugatedVerb}</span>?`, correctAnswer: conjugation.translation_en, options: [conjugation.translation_en, ...wrongAnswers].sort(() => Math.random() - 0.5), answerType: 'translation' };
        default: // random_mix or pronoun_drill
             return { verb, question: `Conjugate <span class="font-arabic text-2xl mx-2 text-cyan-300">${verb.verb_data.infinitive_past}</span> for <span class="font-arabic text-2xl mx-2 text-cyan-300">${targetPronoun}</span> in the <strong>${tense} tense</strong>.`, correctAnswer: conjugatedVerb, answerType: 'conjugation' };
    }
}

export const Practice: React.FC<{ verbs: Verb[] }> = ({ verbs }) => {
    const [currentDrill, setCurrentDrill] = useState<DrillType | null>(null);
    const [exercise, setExercise] = useState<ExerciseData | null>(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<{correct: boolean, message: string} | null>(null);

    const startDrill = (type: DrillType) => {
        setCurrentDrill(type);
        setExercise(generateExercise(type, verbs));
        setScore(0);
        setStreak(0);
        setFeedback(null);
    };
    
    const nextExercise = useCallback(() => {
        if (currentDrill) {
            setExercise(generateExercise(currentDrill, verbs));
            setFeedback(null);
        }
    }, [currentDrill, verbs]);

    const checkAnswer = (userAnswer: string) => {
        if (!exercise) return;
        const isCorrect = userAnswer.toLowerCase() === exercise.correctAnswer.toLowerCase();

        if (isCorrect) {
            setScore(s => s + 1);
            setStreak(s => s + 1);
            setFeedback({ correct: true, message: 'Excellent! ممتاز!' });
        } else {
            setStreak(0);
            setFeedback({ correct: false, message: `The correct answer is: ${exercise.correctAnswer}` });
        }
    };
    
    const resetPractice = () => {
        setCurrentDrill(null);
        setExercise(null);
        setFeedback(null);
    }

    if (!currentDrill || !exercise) {
        return (
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl animate-fadeIn">
                <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">Choose a Drill</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {drillOptions.map(drill => (
                        <button key={drill.id} onClick={() => startDrill(drill.id)} className="text-left p-6 bg-gray-800/50 rounded-lg hover:bg-cyan-600/30 transition-all duration-300 border border-gray-700 hover:border-cyan-400 transform hover:-translate-y-1 shadow-lg">
                            <h3 className="text-xl font-bold text-cyan-300">{drill.label}</h3>
                            <p className="text-gray-400 mt-2">{drill.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-cyan-300">{drillOptions.find(d => d.id === currentDrill)?.label}</h3>
                <div className="text-lg font-semibold">
                    <span>Score: {score}</span> | <span className="text-yellow-400">Streak: {streak}</span>
                </div>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-xl text-center">
                <p className="text-xl md:text-2xl text-gray-200" dangerouslySetInnerHTML={{ __html: exercise.question }} />

                <div className="mt-8">
                    {exercise.options ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                            {exercise.options.map(opt => (
                                <button key={opt} onClick={() => checkAnswer(opt)} disabled={!!feedback} className="p-4 rounded-lg bg-gray-700 hover:bg-cyan-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold">
                                    {opt}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); checkAnswer(e.currentTarget.answer.value.trim()); e.currentTarget.reset(); }} className="flex flex-col items-center gap-4">
                            <input name="answer" type="text" placeholder="Type your answer..." disabled={!!feedback} className={`font-arabic text-center w-full max-w-sm bg-gray-900/50 border-2 border-gray-600 rounded-lg p-4 text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition disabled:opacity-50`} dir="rtl" />
                            <button type="submit" disabled={!!feedback} className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
                        </form>
                    )}
                </div>

                {feedback && (
                    <div className={`mt-6 p-4 rounded-lg text-white font-bold ${feedback.correct ? 'bg-green-500/80' : 'bg-red-500/80'}`}>
                        <p>{feedback.message}</p>
                    </div>
                )}
            </div>
            
             <div className="mt-8 flex justify-center gap-4">
                <button onClick={resetPractice} className="px-8 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors font-bold">Back to Drills</button>
                <button onClick={nextExercise} className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity">Next Question</button>
            </div>
        </div>
    );
};
