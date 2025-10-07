import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import exampleData from '../data/exampleData.json' with { type: "json" };


dotenv.config();

const app = express();
app.use(express.json());

const FRONTEND_ORIGINS = ["http://localhost:5173", "http://192.168.0.21:5173", "https://testing.joshuasportfolio.org", "https://aifactchecker.joshuasportfolio.org/"];

app.use(cors({ origin: FRONTEND_ORIGINS }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/gemini", async (req, res) => {
  console.log('API has been called')
  try {
    const { prompt } = req.body;
    if(prompt){
      console.log("SUBMITTED PROMPT:", prompt);
    } else {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const preprompt =
      "Your job is to be a fact checker, and that's it. You're not a conversationalist. " +
      "If questions are inappropriate, or unrelated to fact checking, please return with an object containing an error. " +
      "{error: 'Error Reason Here'}. Your job is to return data back in a JSON format. " +
      "If you're not sure about an event a user is talking about, please look up the most recent information on the matter. " +
      "Please see the provided examples. Make sure to include at least 3 sources and 3 verified facts, but it can include more. Please ensure that all sources are real and not fake links. They must be active and up to date. Please see the following structure to follow strictly: \n\n" +
      JSON.stringify(exampleData, null, 2) +
      "\nAdditional notes: The structure must remain exactly the same, users_question, validity, confidence, verified_facts, and sources are mandatory keys, categories and facts can change in name or content depending on the claim, facts should always be a list of short standalone statements, and sources should always be structured with id, source_title, and source_description. " +
      "Please see the following user-entered question:\n";

    const fullPrompt = preprompt + prompt;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(fullPrompt);

    let text =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      result?.response?.text ||
      "No text returned";

    text = text.replace(/^```(json)?\s*/, "").replace(/```$/, "");

    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      return res.status(500).json({ error: "Failed to parse AI JSON output" });
    }

    res.json(parsedData);
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong on the server" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});