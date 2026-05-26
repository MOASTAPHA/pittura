import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
}

const PlaceholderPage = ({ titleAr, titleEn, subtitleAr, subtitleEn }: Props) => {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return (
    <div className="bg-[#F5F0E8] min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-xl">
          <span className="inline-block text-[#B8945F] text-xs tracking-[0.4em] uppercase font-semibold mb-6">
            {isRTL ? 'قريبًا' : 'Coming Soon'}
          </span>
          <h1 className="text-5xl font-bold text-[#3D2E1A] mb-6">{isRTL ? titleAr : titleEn}</h1>
          {(subtitleAr || subtitleEn) && (
            <p className="text-[#5C4A2E] text-lg leading-loose mb-10">
              {isRTL ? subtitleAr : subtitleEn}
            </p>
          )}
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B8945F] to-[#8B6F3F] text-white font-bold px-8 py-3 rounded-full hover:scale-[1.02] transition"
          >
            <Arrow className="w-4 h-4" />
            {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
