import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userProfile, availableSkills } = await req.json();

    const prompt = `
      You are an elite AI matchmaker for a skill-bartering platform called PraMuse.
      Here is the user's profile:
      Name: ${userProfile.name}
      Skills they are offering: ${userProfile.offering || 'Everything'}
      Skills they are seeking: ${userProfile.seeking || 'Anything'}

      Here are the available skills on the platform:
      ${JSON.stringify(availableSkills.map((s: any) => ({ id: s.id, provider: s.provider, offering: s.offering, seeking: s.seeking })), null, 2)}

      Based on what the user is seeking and what others are offering, pick the single BEST match ID.
      Return a JSON object strictly in this format: { "matchId": <id>, "reason": "<a short, hyped 1-sentence explanation of why it's a perfect match>" }
      Do NOT return markdown or any other text, just the raw JSON object.
    `;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Groq error:", data);
      throw new Error(data.error?.message || "Failed to fetch from Groq");
    }

    const matchData = JSON.parse(data.choices[0].message.content);
    return NextResponse.json(matchData);
  } catch (error: any) {
    console.error("Matchmaker API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
