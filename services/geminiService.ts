
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  // In a real app, you might have a more robust way to handle this,
  // but for this context, we'll throw an error.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

interface ExampleSentenceResponse {
  ar: string;
  translit: string;
  en: string;
}

/**
 * Generates an example sentence using the Gemini API.
 * @param verb The Arabic verb to use in the sentence.
 * @param tense The tense ('past' or 'present') to use.
 * @returns A promise that resolves to an object with the Arabic sentence, transliteration, and English translation.
 */
export async function generateExampleSentence(verb: string, tense: string): Promise<ExampleSentenceResponse> {
  const prompt = `
    Create a simple, single example sentence in Arabic for a beginner learner.
    Use the verb "${verb}" in the ${tense} tense.
    Return ONLY a single, valid JSON object with the following keys: "ar", "translit", and "en".
    - "ar": The Arabic sentence.
    - "translit": An accurate English transliteration of the sentence.
    - "en": The English translation.
    
    Do not include any other text, explanations, or markdown fences in your response.
  `;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.8,
        },
    });

    let jsonStr = response.text.trim();
    
    // Clean up potential markdown fences, although the prompt asks not to include them.
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);

    if (parsedData && parsedData.ar && parsedData.translit && parsedData.en) {
      return parsedData as ExampleSentenceResponse;
    } else {
      throw new Error("AI response was not in the expected format.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error("The provided API key is not valid. Please check your configuration.");
    }
    throw new Error("Failed to generate sentence. The AI service may be unavailable or the request was invalid.");
  }
}
