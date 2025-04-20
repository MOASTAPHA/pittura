
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContainer from '@/components/AuthContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [isRTL, setIsRTL] = useState(false);
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check URL for language parameter
    const params = new URLSearchParams(location.search);
    setIsRTL(params.get('lang') === 'ar');
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: isRTL ? 'خطأ في النموذج' : 'Form Error',
        description: isRTL 
          ? 'يرجى ملء جميع الحقول المطلوبة'
          : 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords Do Not Match',
        description: isRTL 
          ? 'تأكد من تطابق كلمتي المرور'
          : 'Please make sure your passwords match',
        variant: 'destructive',
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: isRTL ? 'الشروط والأحكام' : 'Terms and Conditions',
        description: isRTL 
          ? 'يجب الموافقة على الشروط والأحكام للمتابعة'
          : 'You must agree to the terms and conditions to proceed',
        variant: 'destructive',
      });
      return;
    }
    
    // Here you would normally handle registration
    // For demo purposes, we'll just show a success message
    toast({
      title: isRTL ? 'تم التسجيل بنجاح' : 'Registration Successful',
      description: isRTL 
        ? 'مرحبًا بك في متحف بيتورا الرقمي'
        : 'Welcome to Pittura Digital Museum',
    });
  };

  return (
    <AuthContainer
      title={isRTL ? 'إنشاء حساب جديد' : 'Create New Account'}
      subtitle={isRTL 
        ? 'سجل الآن للوصول إلى متحفنا الرقمي'
        : 'Sign up now to access our digital museum'
      }
      isRTL={isRTL}
      authType="register"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            {isRTL ? 'الاسم الكامل' : 'Full Name'}
          </Label>
          <Input
            id="name"
            type="text"
            placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">
            {isRTL ? 'البريد الإلكتروني' : 'Email'}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">
            {isRTL ? 'كلمة المرور' : 'Password'}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder={isRTL ? 'أكد كلمة المرور' : 'Confirm your password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm">
            {isRTL 
              ? 'أوافق على الشروط والأحكام وسياسة الخصوصية'
              : 'I agree to the terms and conditions and privacy policy'
            }
          </Label>
        </div>
        
        <Button type="submit" className="w-full cta-button">
          {isRTL ? 'إنشاء حساب' : 'Create Account'}
        </Button>
        
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-museum-sand px-2 text-muted-foreground">
            {isRTL ? 'أو' : 'OR'}
          </span>
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border"></div>
        </div>
        
        <Button variant="outline" className="w-full">
          {isRTL ? 'التسجيل بحساب Google' : 'Sign up with Google'}
        </Button>
      </form>
    </AuthContainer>
  );
};

export default Register;
