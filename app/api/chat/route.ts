import OpenAI from "openai";
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY, 
  baseURL: "https://api.x.ai/v1", 
});

export async function POST(req: Request){
  try {
    const { content } = await req.json()

    const completion = await openai.chat.completions.create({
      model: "grok-beta",
      max_tokens: 1024,
      messages: [
        { role: "system", content: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy." },
        {
          role: "user",
          content //use web socket later
        },
      ],
    });

      return NextResponse.json({
        message: completion.choices[0].message?.content || "No content available."
      })

  } catch (error) {
    console.error("Error generating completion:", error);
  }
}
