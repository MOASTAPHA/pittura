import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

const ArabicCampaign = () => {
  const [idea, setIdea] = useState("");
  const [copy, setCopy] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!idea.trim()) {
      toast.error("Please enter a campaign idea.");
      return;
    }
    setLoading(true);
    setCopy("");
    try {
      const { data, error } = await supabase.functions.invoke("generate-arabic-copy", {
        body: { idea },
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
    <main className="container max-w-xl py-16" dir="rtl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          مولد النصوص الإعلانية
        </h1>
        <p className="text-muted-foreground mt-2">
          اكتب فكرة حملتك واحصل على نص إعلاني جاذب باللهجة البيضاء
        </p>
      </header>

      <section className="space-y-4 rounded-lg border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="idea">فكرة الحملة</Label>
          <Input
            id="idea"
            placeholder="مثال: قهوة عربية فاخرة من مزارع جازان"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="text-right"
          />
        </div>

        <Button onClick={generate} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 ml-2 animate-spin" /> جاري التوليد…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 ml-2" /> توليد النص
            </>
          )}
        </Button>
      </section>

      {copy && (
        <section className="mt-8 rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-3">النص المُولَّد</h2>
          <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-right">{copy}</pre>
        </section>
      )}
    </main>
  );
};

export default ArabicCampaign;
