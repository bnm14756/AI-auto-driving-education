
import { GoogleGenAI, Type } from "@google/genai";
import type { DigitalTwinScenario } from "../types";

// API 클라이언트를 안전하게 가져오는 헬퍼 함수
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing in environment variables.");
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

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
    const ai = getAIClient();
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

    const jsonText = response.text?.trim();
    if (!jsonText) throw new Error("Empty response from AI");

    const scenario = JSON.parse(jsonText);
    
    if (scenario && scenario.title && scenario.description && scenario.environment && scenario.challenge) {
      return scenario as DigitalTwinScenario;
    } else {
      throw new Error("Parsed JSON does not match DigitalTwinScenario schema.");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    // API 오류 시, 앱이 멈추지 않고 대체 시나리오를 반환하도록 처리
    return {
      title: "연결 오류: 기본 시나리오",
      description: "AI 서비스에 연결할 수 없어 기본 시나리오를 로드했습니다. 정차된 버스 뒤에서 보행자가 갑자기 튀어나오는 상황입니다.",
      environment: "도심 도로, 주간, 맑음",
      challenge: "자율주행 차량은 시야가 가려진 보행자를 감지하고 후방 추돌 없이 안전하게 정지해야 합니다.",
    };
  }
};

export const generateRecommendedAction = async (scenario: DigitalTwinScenario): Promise<string> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert autonomous driving safety instructor. Based on the following scenario, provide a concise, step-by-step recommendation for the safest course of action in Korean.
            
            ---
            Scenario Title: ${scenario.title}
            Description: ${scenario.description}
            Environment: ${scenario.environment}
            Core Challenge: ${scenario.challenge}
            ---
            
            Provide the best response strategy in Korean.`,
        });
        return response.text || "분석 결과를 불러올 수 없습니다.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "AI 응답을 생성하는 데 실패했습니다. 잠시 후 다시 시도해주세요.";
    }
};
