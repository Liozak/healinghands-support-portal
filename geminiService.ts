
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis, UrgencyLevel, ProblemCategory } from "./types";

export const analyzeHealthRequest = async (category: ProblemCategory, description: string): Promise<AIAnalysis> => {
  try {
    // Corrected initialization using process.env.API_KEY
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY
    });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this healthcare request and provide a summary and urgency level.
      Category: ${category}
      Description: ${description}
      
      Rules for Urgency:
      - Emergency keywords like "breathing", "accident", "severe", "unconscious", "bleeding" => High
      - Medicine refill, specific medical appointments => Medium
      - General queries, non-urgent information => Low`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: 'A 1-2 line concise summary of the patient problem.',
            },
            urgency: {
              type: Type.STRING,
              description: 'Urgency level: Low, Medium, or High.',
            },
          },
          required: ["summary", "urgency"]
        },
      },
    });

    const result = JSON.parse(response.text.trim());
    return {
      summary: result.summary,
      urgency: (result.urgency as UrgencyLevel) || 'Medium'
    };
  } catch (error) {
    console.error("AI Analysis failed:", error);
    // Fallback logic
    return {
      summary: description.slice(0, 100) + "...",
      urgency: category === ProblemCategory.Emergency ? 'High' : 'Medium'
    };
  }
};
