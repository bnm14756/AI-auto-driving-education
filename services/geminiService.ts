import { GoogleGenAI, Type } from "@google/genai";
import type { DigitalTwinScenario } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const scenarioSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "A short, catchy title for the edge case scenario.",
        },
        description: {
            type: Type.STRING,
            description: "A brief, one-paragraph overview of the scenario.",
        },
        environment: {
            type: Type.STRING,
            description: "Details about the environment: weather, time of day, location (e.g., urban, highway).",
        },
        challenge: {
            type: Type.STRING,
            description: "The core challenge or dilemma the autonomous vehicle must resolve.",
        },
    },
    required: ["title", "description", "environment", "challenge"],
};

export const generateEdgeCaseScenario = async (): Promise<DigitalTwinScenario> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an AI safety engineer for autonomous vehicles. 
      Generate a complex and unpredictable 'edge case' driving scenario. 
      The scenario should be testable in a digital twin simulation. 
      Describe the environment (weather, time of day, location), the road conditions, the actors involved (other vehicles, pedestrians, animals), and the core challenge for the autonomous vehicle.
      Ensure the scenario is unique and presents a non-trivial problem.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: scenarioSchema,
      },
    });

    const jsonText = response.text.trim();
    const scenario = JSON.parse(jsonText);
    
    if (scenario && scenario.title && scenario.description && scenario.environment && scenario.challenge) {
      return scenario as DigitalTwinScenario;
    } else {
      throw new Error("Parsed JSON does not match DigitalTwinScenario schema.");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    // API 오류 시, 대체 시나리오를 반환합니다.
    return {
      title: "API Error: Fallback Scenario",
      description: "Could not connect to the AI to generate a new scenario. This is a default scenario where a pedestrian unexpectedly steps onto the road from behind a parked bus.",
      environment: "Urban street, daytime, clear weather.",
      challenge: "The autonomous vehicle must detect the partially obscured pedestrian and brake safely without causing a rear-end collision.",
    };
  }
};

export const generateRecommendedAction = async (scenario: DigitalTwinScenario): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert autonomous driving safety instructor. Based on the following scenario, provide a concise, step-by-step recommendation for the safest course of action.
            
            ---
            Scenario Title: ${scenario.title}
            Description: ${scenario.description}
            Environment: ${scenario.environment}
            Core Challenge: ${scenario.challenge}
            ---
            
            Provide the best response strategy.`,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "AI 응답을 생성하는 데 실패했습니다. 네트워크 연결을 확인하고 다시 시도해주세요.";
    }
};