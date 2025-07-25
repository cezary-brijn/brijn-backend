import { NextApiRequest, NextApiResponse } from "next";
import { createReadStream, unlink } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import formidable from "formidable";
import OpenAI from "openai";

// Konfiguracja OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ uploadDir: "/tmp", keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Upload error" });
    }

    const file = files.file?.[0] || files.file;
    if (!file || Array.isArray(file)) {
      return res.status(400).json({ error: "File not found" });
    }

    const filePath = file.filepath;

    try {
      const fileExt = path.extname(file.originalFilename || "").toLowerCase();

      let feedback = "";

      if ([".png", ".jpg", ".jpeg", ".webp"].includes(fileExt)) {
        const base64Image = await readFileAsBase64(filePath);
        const response = await openai.chat.completions.create({
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "You are an expert in psychological profiling through visual data, specializing in decoding facial microexpressions, micro-movements, posture, hand gestures, clothing choices, body tension, and spatial composition.

Your task is to analyze this photo in extreme depth.

1. Detect any signs of narcissism, psychopathy, emotional manipulation or toxic behavioral patterns.
2. Identify potential indicators of high emotional intelligence, self-awareness, authenticity or psychological maturity.
3. Consider posture, gaze direction, muscle tension, symmetry, facial expression, environmental context, and the subject’s relationship to the camera.
4. Focus on unconscious signals – not posed or performative elements.
5. Use neutral, clinical, structured language. Avoid emotional tone or subjective interpretation.
6. Use probability-based phrasing only. Do not say “This person is...” – instead say “There are visible indicators that may suggest...”
7. End with a concise summary titled: “Primary psychological impressions” – listing key behavioral traits and relational tendencies inferred from the image.

This is not an aesthetic critique. Say nothing about beauty, attractiveness, or desirability.

Do not speculate about personal life history, trauma, medical diagnoses or private experiences that are not directly observable in the image.

Stay strictly within observable behavioral and psychological signals. Do not infer secrets or life context. Your role is to interpret, not to judge.

Maintain ethical and respectful tone throughout the analysis.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 1000,
        });

        feedback = response.choices[0].message.content || "No feedback.";
      } else i

