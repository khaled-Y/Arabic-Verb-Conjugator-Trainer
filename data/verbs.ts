import { Verb } from '../types';

let cachedVerbs: Verb[] | null = null;

export async function getVerbDatabase(): Promise<Verb[]> {
  if (cachedVerbs) {
    return cachedVerbs;
  }

  try {
    const response = await fetch('/verbs.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Verb[] = await response.json();
    cachedVerbs = data;
    return data;
  } catch (error) {
    console.error("Could not fetch verbs:", error);
    // Return empty array or re-throw error depending on desired error handling
    return [];
  }
}
