import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

type Lang = 'ar' | 'en';

interface LanguageContextValue {
  lang: Lang;
  isRTL: boolean;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'pittura.lang';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'ar';
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === 'ar' || stored === 'en') return stored;
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    return urlLang === 'en' ? 'en' : 'ar';
  });

  useEffect(() => {
    const isRTL = lang === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'ar' ? 'en' : 'ar')), []);

  return (
    <LanguageContext.Provider value={{ lang, isRTL: lang === 'ar', setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
