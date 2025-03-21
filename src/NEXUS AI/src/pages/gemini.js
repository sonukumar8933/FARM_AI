// This file should ideally be on the server-side

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// API key should be retrieved from environment variables or a secure configuration on the server
// WARNING: DO NOT COMMIT THIS CODE WITH YOUR API KEY HARDCODED!
const apiKey = "AIzaSyDJKxocD2sJEWfMNIcuvqTjWutlLfdhoyc"; // Replace with your actual API key!!!

console.log("API Key:", apiKey);

// Function to run Gemini API with a prompt
async function run(prompt) {
  if (!apiKey) {
    console.error(
      "API key is missing. Ensure GEMINI_API_KEY is set in .env file (or hardcoded temporarily)."
    );
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 80,
    responseMimeType: "text/plain",
  };

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    console.log("Gemini Response:", result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error; // Re-throw to handle it upstream
  }
}

// Export the function to be used elsewhere
export default run;