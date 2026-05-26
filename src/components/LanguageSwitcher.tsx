import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { lang, toggle } = useLanguage();
  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full text-xs font-semibold px-3"
      onClick={toggle}
    >
      {lang === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export default LanguageSwitcher;
