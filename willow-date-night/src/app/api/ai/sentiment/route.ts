import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export async function POST(req: NextRequest) {
  try {
    // Temporarily disabled authentication for preview
    // const { userId } = auth();
    const userId = 'preview-user-id';
    
    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { answer, prompt } = await req.json();

    if (!answer || !prompt) {
      return NextResponse.json({ error: 'Answer and prompt are required' }, { status: 400 });
    }

    // Analyze sentiment and depth of the answer
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are analyzing romantic relationship answers for depth and sentiment. 
          Analyze the given answer for:
          1. Sentiment (positive, neutral, negative) - scale 1-10
          2. Depth/Intimacy level (surface, moderate, deep) - scale 1-10
          3. Word count analysis
          4. Emotional vulnerability
          5. Whether it shows genuine connection
          
          Respond with a JSON object containing:
          {
            "sentiment": number (1-10),
            "depth": number (1-10),
            "wordCount": number,
            "isVulnerable": boolean,
            "showsConnection": boolean,
            "shouldNudge": boolean,
            "nudgeReason": string
          }`
        },
        {
          role: "user",
          content: `Prompt: "${prompt}"
          
          Answer: "${answer}"
          
          Analyze this answer for romantic depth and sentiment.`
        }
      ],
      temperature: 0.3,
      max_tokens: 200,
    });

    const analysis = completion.choices[0]?.message?.content;
    
    if (!analysis) {
      throw new Error('No analysis received from OpenAI');
    }

    let parsedAnalysis;
    try {
      parsedAnalysis = JSON.parse(analysis);
    } catch (parseError) {
      // Fallback analysis if JSON parsing fails
      parsedAnalysis = {
        sentiment: 5,
        depth: 3,
        wordCount: answer.split(' ').length,
        isVulnerable: false,
        showsConnection: false,
        shouldNudge: answer.split(' ').length < 20,
        nudgeReason: "Answer seems brief, consider going deeper"
      };
    }

    return NextResponse.json({
      success: true,
      analysis: parsedAnalysis,
    });

  } catch (error) {
    console.error('Sentiment analysis error:', error);
    
    // Fallback analysis if OpenAI fails
    const fallbackAnalysis = {
      sentiment: 5,
      depth: 3,
      wordCount: 0,
      isVulnerable: false,
      showsConnection: false,
      shouldNudge: true,
      nudgeReason: "Unable to analyze, but answer seems brief"
    };

    return NextResponse.json({
      success: true,
      analysis: fallbackAnalysis,
    });
  }
}
