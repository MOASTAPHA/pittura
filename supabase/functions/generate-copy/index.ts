import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface RequestBody {
  product: string;
  audience?: string;
  tone?: string;
  format?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = (await req.json()) as RequestBody;
    const { product, audience, tone, format } = body;

    if (!product || typeof product !== "string" || product.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "`product` is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = `You are an expert marketing copywriter. Generate compelling, creative marketing copy.

Product / Service: ${product}
Target audience: ${audience || "general consumers"}
Tone: ${tone || "friendly and confident"}
Format: ${format || "a punchy headline, a 2-sentence hook, and 3 short bullet benefits"}

Return only the marketing copy, well-formatted in Markdown. No preamble.`;

    const geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
      GEMINI_API_KEY;

    const geminiResp = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    if (!geminiResp.ok) {
      const errText = await geminiResp.text();
      console.error("Gemini API error", geminiResp.status, errText);
      return new Response(
        JSON.stringify({ error: "Gemini API error", status: geminiResp.status, details: errText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await geminiResp.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("\n") ?? "";

    return new Response(JSON.stringify({ copy: text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-copy error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
