import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface RequestBody {
  idea: string;
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
    const { idea } = body;

    if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "`idea` is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = `أنت كاتب إعلانات محترف. اكتب نسخة إعلانية قصيرة وجاذبة باللغة العربية "البيضاء" (اللهجة العامية المفهومة لجميع العرب، بدون فصحى ثقيلة وبدون لهجة خليجية أو مصرية محددة).

فكرة الحملة: ${idea}

المتطلبات:
- النص قصير وجاهز للنشر (منشور إعلاني واحد).
- أسلوب بسيط وودود و"كاجوال".
- استخدم إيموجي بشكل خفيف.
- اكتب فقط النص الإعلاني، بدون أي مقدمة أو تعليق.
- اجعله مثيراً للفضول ويحث على التفاعل.`;

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
    console.error("generate-arabic-copy error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
