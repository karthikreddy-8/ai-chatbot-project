import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export default async function handler(req, res) {

  try {

    const { prompt } = req.body;

    if (!prompt) {

      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });

    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return res.status(200).json({
      success: true,
      response,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });

  }

}