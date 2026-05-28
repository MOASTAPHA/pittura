import { useState } from 'react';
import { Check, Crown, Star, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { membershipTiers } from '@/data/mockData';

const tierIcons = [Star, Crown, Sparkles];
const tierColors = [
  'from-[#8B8B8B] to-[#A0A0A0]',
  'from-[#B8945F] to-[#E8C97A]',
  'from-[#2D2118] to-[#5C4A2E]',
];

const Membership = () => {
  const { isRTL } = useLanguage();
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = (tierId: string) => {
    setSelectedTier(tierId);
    setIsProcessing(true);

    // Mock subscription flow
    setTimeout(() => {
      setIsProcessing(false);
      setSelectedTier(null);
      toast({
        title: isRTL ? 'تم الاشتراك بنجاح!' : 'Subscription Successful!',
        description: isRTL
          ? 'مرحباً بك في بيتورا. استمتع بتجربة التراث السعودي الغامرة.'
          : 'Welcome to Pittura. Enjoy the immersive Saudi heritage experience.',
      });
    }, 2000);
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />

      {/* Hero */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-[#3D2E1A] to-[#2D2118] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_30%,#E8C97A_0%,transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-[#E8C97A] text-xs tracking-[0.4em] uppercase font-semibold mb-4 block">
            {isRTL ? 'العضوية المميزة' : 'Premium Membership'}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {isRTL ? 'انضم إلى رحلة التراث' : 'Join the Heritage Journey'}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {isRTL
              ? 'اختر خطتك واستمتع بتجربة غامرة فريدة لاستكشاف أعظم مواقع التراث السعودي.'
              : 'Choose your plan and enjoy a unique immersive experience exploring the greatest Saudi heritage sites.'}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6 -mt-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {membershipTiers.map((tier, i) => {
            const Icon = tierIcons[i];
            const isHighlighted = tier.highlighted;
            const isSelected = selectedTier === tier.id;

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 transition-all duration-500 ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-[#3D2E1A] to-[#2D2118] text-white shadow-2xl shadow-[#B8945F]/20 scale-105 border border-[#E8C97A]/30'
                    : 'bg-white border border-[#E8E3D9] hover:border-[#B8945F]/50 hover:shadow-xl'
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#B8945F] to-[#E8C97A] text-[#3D2E1A] text-xs font-bold px-6 py-1.5 rounded-full">
                    {isRTL ? 'الأكثر شعبية' : 'Most Popular'}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tierColors[i]} flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Name & Price */}
                <h3 className={`text-2xl font-bold mb-2 ${isHighlighted ? 'text-white' : 'text-[#3D2E1A]'}`}>
                  {isRTL ? tier.name.ar : tier.name.en}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl font-bold ${isHighlighted ? 'text-[#E8C97A]' : 'text-[#B8945F]'}`}>
                    {tier.price === 0
                      ? (isRTL ? 'مجاني' : 'Free')
                      : `${tier.price}`}
                  </span>
                  {tier.price > 0 && (
                    <span className={`text-sm ${isHighlighted ? 'text-white/60' : 'text-[#5C4A2E]/60'}`}>
                      {isRTL ? 'ر.س / شهرياً' : 'SAR / month'}
                    </span>
                  )}
                </div>
                <p className={`text-sm mb-8 ${isHighlighted ? 'text-white/70' : 'text-[#5C4A2E]'}`}>
                  {isRTL ? tier.description.ar : tier.description.en}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isHighlighted ? 'bg-[#E8C97A]/20' : 'bg-[#B8945F]/10'
                      }`}>
                        <Check className={`w-3 h-3 ${isHighlighted ? 'text-[#E8C97A]' : 'text-[#B8945F]'}`} />
                      </div>
                      <span className={`text-sm ${isHighlighted ? 'text-white/80' : 'text-[#5C4A2E]'}`}>
                        {isRTL ? feature.ar : feature.en}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleSubscribe(tier.id)}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    isHighlighted
                      ? 'bg-gradient-to-r from-[#B8945F] to-[#E8C97A] text-[#3D2E1A] hover:shadow-lg hover:shadow-[#B8945F]/30 hover:scale-[1.02]'
                      : 'bg-[#3D2E1A] text-white hover:bg-[#5C4A2E] hover:shadow-lg'
                  } ${isSelected && isProcessing ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {isSelected && isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      {isRTL ? 'جارٍ المعالجة...' : 'Processing...'}
                    </span>
                  ) : tier.price === 0 ? (
                    isRTL ? 'ابدأ مجاناً' : 'Get Started Free'
                  ) : (
                    isRTL ? 'اشترك الآن' : 'Subscribe Now'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ-like section */}
      <section className="py-16 px-6 bg-[#FBF7EF] border-t border-[#E8E3D9]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#3D2E1A] mb-4">
            {isRTL ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-6 mt-10 text-start">
            {[
              {
                q: { en: 'Can I cancel anytime?', ar: 'هل يمكنني الإلغاء في أي وقت؟' },
                a: { en: 'Yes, you can cancel your subscription at any time. No questions asked.', ar: 'نعم، يمكنك إلغاء اشتراكك في أي وقت. بدون أي أسئلة.' },
              },
              {
                q: { en: 'Do I need VR equipment?', ar: 'هل أحتاج معدات واقع افتراضي؟' },
                a: { en: 'No! Our 360° experiences work directly in your browser on any device.', ar: 'لا! تعمل تجاربنا 360° مباشرة في متصفحك على أي جهاز.' },
              },
              {
                q: { en: 'Are new locations added regularly?', ar: 'هل تُضاف مواقع جديدة بانتظام؟' },
                a: { en: 'Yes, we add new curated heritage experiences every month for paid members.', ar: 'نعم، نضيف تجارب تراثية جديدة منتقاة كل شهر للأعضاء المشتركين.' },
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#E8E3D9]">
                <h3 className="font-bold text-[#3D2E1A] mb-2">{isRTL ? faq.q.ar : faq.q.en}</h3>
                <p className="text-[#5C4A2E] text-sm">{isRTL ? faq.a.ar : faq.a.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Membership;
