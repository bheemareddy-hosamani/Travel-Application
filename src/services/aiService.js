const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateAIResponse = async (prompt, systemInstruction = "") => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key is not configured.');
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    if (systemInstruction) {
      body.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate AI response');
    }

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error('No valid response from AI');
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};

export const generateItinerary = async (destination, days, preferences = "") => {
  const systemInstruction = `You are an expert travel planner. The user wants to visit ${destination.name}. Generate a structured ${days}-day itinerary. Return ONLY valid JSON format. Do NOT wrap it in markdown blockquotes like \`\`\`json. The JSON should be an array of objects, each representing a day: [{"day": 1, "title": "...", "activities": [{"time": "09:00", "title": "...", "description": "..."}]}]`;
  
  const prompt = `Plan a ${days}-day trip to ${destination.name}. ${preferences ? `Keep these preferences in mind: ${preferences}` : ''}`;

  try {
    const textResponse = await generateAIResponse(prompt, systemInstruction);
    // Attempt to parse the JSON. 
    // Strip markdown formatting if AI still included it.
    let cleanJson = textResponse.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/```json/g, '').replace(/```/g, '').trim();
    }
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw error;
  }
};
