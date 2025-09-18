import { GoogleGenAI } from "@google/genai";
import { Hike } from '../types';

/*
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
*/

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateHikeSummary = async (hike: Hike): Promise<string> => {
    const prompt = `
        You are a creative writer who loves the outdoors. Create an exciting and brief summary for a social media post about a hike. The tone should be enthusiastic and inspiring. Include key details but make it sound personal and engaging. Here is the data for the hike:

        - Name: ${hike.name}
        - Location: ${hike.location}
        - Date: ${hike.date}
        - Distance: ${hike.distance} miles
        - Difficulty: ${hike.difficulty}
        - My Notes: "${hike.notes}"

        Generate a summary of about 2-4 sentences. Add some relevant emojis like 🌲🏔️☀️. Do not use hashtags.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text!;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to generate summary from Gemini API.");
    }
};

