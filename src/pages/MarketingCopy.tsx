import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

const MarketingCopy = () => {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [format, setFormat] = useState("");
  const [copy, setCopy] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!product.trim()) {
      toast.error("Please describe the product or service.");
      return;
    }
    setLoading(true);
    setCopy("");
    try {
      const { data, error } = await supabase.functions.invoke("generate-copy", {
        body: { product, audience, tone, format },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setCopy(data?.copy ?? "");
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Failed to generate copy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container max-w-3xl py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-primary" />
          Marketing Copy Generator
        </h1>
        <p className="text-muted-foreground mt-2">
          Powered by Google Gemini. Describe your product and get punchy copy in seconds.
        </p>
      </header>

      <section className="space-y-4 rounded-lg border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="product">Product or service *</Label>
          <Textarea
            id="product"
            placeholder="e.g. A subscription box of artisanal coffee beans from small farms"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            rows={3}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="audience">Target audience</Label>
            <Input
              id="audience"
              placeholder="e.g. busy professionals"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Input
              id="tone"
              placeholder="e.g. playful, premium, bold"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="format">Format (optional)</Label>
          <Input
            id="format"
            placeholder="e.g. headline + tagline + 3 bullets"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          />
        </div>

        <Button onClick={generate} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" /> Generate copy
            </>
          )}
        </Button>
      </section>

      {copy && (
        <section className="mt-8 rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">Result</h2>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{copy}</pre>
        </section>
      )}
    </main>
  );
};

export default MarketingCopy;
