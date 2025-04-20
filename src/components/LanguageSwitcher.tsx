
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LanguageSwitcherProps {
  currentLang: 'en' | 'ar';
}

const LanguageSwitcher = ({ currentLang }: LanguageSwitcherProps) => {
  const navigate = useNavigate();
  
  const handleLanguageToggle = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    // In a real application, you would update your language context/state
    // and possibly use an i18n library
    
    // For demo purposes, we're just adding/removing a parameter to the URL
    const url = new URL(window.location.href);
    if (newLang === 'ar') {
      url.searchParams.set('lang', 'ar');
    } else {
      url.searchParams.delete('lang');
    }
    
    window.location.href = url.toString();
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="rounded-full text-xs font-semibold px-3"
      onClick={handleLanguageToggle}
    >
      {currentLang === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export default LanguageSwitcher;
