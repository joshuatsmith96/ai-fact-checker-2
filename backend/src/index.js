app.post("/api/gemini", async (req, res) => {
  console.log("API has been called");
  try {
    const { prompt } = req.body;
    console.log("INCOMING PROMPT: " + prompt);
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

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

    // If the AI returned an error response
    if (parsedData?.error) {
      return res.status(400).json({ error: parsedData.error });
    }

    // Otherwise, return the valid response inside an array
    res.json([parsedData]);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Something went wrong on the server" });
  }
});
