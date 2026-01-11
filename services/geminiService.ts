
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, Language, District, SiteContent } from "../types";
import { INITIAL_CONTENT } from "../constants";

// Initialize the Google GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSoilAdvisorResponse = async (
  message: string, 
  history: ChatMessage[], 
  lang: Language, 
  districtName: District
) => {
  try {
    const savedContent = localStorage.getItem('soil_health_content');
    const content: SiteContent = savedContent ? JSON.parse(savedContent) : INITIAL_CONTENT;
    
    const district = content.districts.find(d => d.name === districtName) || content.districts[0];
    const greeting = lang === 'amharic' ? 'እኔ አማካሪዎ ነኝ' : 'Ani Gorsa keessani';
    
    const systemInstruction = `
      You are "Your Advisor", an expert soil health scientist for the ${district.displayName[lang]} area in Ethiopia.
      User Language: ${lang === 'afaan_oromoo' ? 'Afaan Oromoo' : 'Amharic'}.
      
      Area Profile for ${district.displayName[lang]}:
      - Soil Types: ${district.soilTypes[lang]}
      - Characteristics: ${district.characteristics[lang]}
      - Common Issues: ${district.frequentIssues[lang]}
      - Recommended Crops: ${district.recommendedCrops[lang]}
      
      Instructions:
      1. Provide accurate, scientific, but easy-to-understand advice for farmers.
      2. Keep responses empathetic and localized.
      3. Start every response with: "${greeting}...".
      4. Always respond ONLY in ${lang === 'afaan_oromoo' ? 'Afaan Oromoo' : 'Amharic'}.
    `;

    // Generate content using the recommended model for text tasks
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Access the .text property directly (not a method)
    return response.text || "I apologize, I cannot generate a response right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error contacting advisor. Check your connection.";
  }
};
