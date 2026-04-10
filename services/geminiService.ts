/// <reference types="vite/client" />
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, GroundingSource } from '../types';

// Initialize the API client
// The API key is injected by the platform via process.env.GEMINI_API_KEY
// defined in vite.config.ts
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

if (!apiKey) {
  console.warn("Gemini API Key is missing. AI features will not work.");
}

// We must provide a string to the constructor, even if empty, to avoid immediate crash
// However, actual calls will fail if key is invalid.
const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY_FOR_INIT' });

/**
 * Uses gemini-3-flash-preview with Google Search Grounding.
 * Best for general information, housing trends, or "how-to" questions.
 */
export const searchKnowledgeBase = async (query: string): Promise<ChatMessage> => {
  if (!apiKey) {
    return {
      role: 'model',
      text: "I'm sorry, I can't connect to the AI service right now (API Key missing). Please contact us directly.",
      isError: true
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: `You are a helpful assistant for Victory Independent Living in Valdosta, GA. Answer this query based on general knowledge and web search: ${query}` }]
        }
      ],
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "I found some information.";
    // Extract search grounding chunks
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks.map((chunk: any) => ({
      web: chunk.web
    })).filter((s: GroundingSource) => s.web);

    return {
      role: 'model',
      text,
      sources
    };

  } catch (error) {
    console.error("Search Grounding Error:", error);
    return {
      role: 'model',
      text: "I encountered an error while searching. Please try again or contact our office.",
      isError: true
    };
  }
};

/**
 * Uses gemini-2.5-flash with Google Maps Grounding.
 * Best for finding locations, amenities, or directions in Valdosta.
 */
export const findLocalAmenities = async (query: string): Promise<ChatMessage> => {
  if (!apiKey) {
    return {
      role: 'model',
      text: "I'm sorry, I can't access location services right now.",
      isError: true
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
         {
          role: "user",
          parts: [{ text: `Find places near Valdosta, GA related to: ${query}. Focus on affordable options or essential services for independent living residents.` }]
         }
      ],
      config: {
        tools: [{ googleMaps: {} }],
        // We could add toolConfig here with specific lat/lng if we wanted to force a viewport
      },
    });

    const text = response.text || "Here is what I found on Google Maps.";
    
    // Extract maps grounding chunks
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks.map((chunk: any) => ({
      maps: chunk.maps
    })).filter((s: GroundingSource) => s.maps);

    return {
      role: 'model',
      text,
      sources
    };

  } catch (error) {
    console.error("Maps Grounding Error:", error);
    return {
      role: 'model',
      text: "I couldn't retrieve map data at this moment.",
      isError: true
    };
  }
};