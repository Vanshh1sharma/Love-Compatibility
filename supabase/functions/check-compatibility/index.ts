import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { person1, person2 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build the zodiac and age info for the prompt
    const age1 = person1.age ? `, Age: ${person1.age}` : "";
    const zodiac1 = person1.zodiac ? `, Zodiac: ${person1.zodiac}` : "";
    const age2 = person2.age ? `, Age: ${person2.age}` : "";
    const zodiac2 = person2.zodiac ? `, Zodiac: ${person2.zodiac}` : "";

    const prompt = `Compare the compatibility between these two people based on their bios:

Person 1: ${person1.name}${age1}${zodiac1}
Bio: ${person1.bio}

Person 2: ${person2.name}${age2}${zodiac2}
Bio: ${person2.bio}

Make it humorous, romantic, and creative! Include:
- A love score out of 100 ❤️
- A zodiac commentary 🔮 (if zodiac signs are provided, otherwise make up cosmic alignments)
- A funny 'Love Aura Name' 💫 (a creative combined name or description)
- A short poetic summary 💌

Use emojis generously throughout your response. Make it fun, entertaining, and slightly over-the-top in a charming way!`;

    console.log("Calling Lovable AI Gateway...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a whimsical, romantic AI love compatibility expert. You combine astrology, personality analysis, and cosmic energy readings to create entertaining and charming compatibility reports. Be creative, humorous, and generous with emojis!"
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const result = data.choices[0].message.content;

    console.log("Successfully generated compatibility report");

    return new Response(
      JSON.stringify({ result }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in check-compatibility function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
