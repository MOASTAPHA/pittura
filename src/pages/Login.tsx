
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContainer from '@/components/AuthContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Login = () => {
  const { isRTL } = useLanguage();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Keep this empty or remove it if not needed for anything else. 
    // I'll just remove the URL check.
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!email || !password) {
      toast({
        title: isRTL ? 'خطأ في النموذج' : 'Form Error',
        description: isRTL 
          ? 'يرجى ملء جميع الحقول المطلوبة'
          : 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    // Here you would normally handle authentication
    // For demo purposes, we'll just show a success message
    toast({
      title: isRTL ? 'تم تسجيل الدخول بنجاح' : 'Login Successful',
      description: isRTL 
        ? 'مرحبًا بك في متحف بيتورا الرقمي'
        : 'Welcome to Pittura Digital Museum',
    });
  };

  return (
    <AuthContainer
      title={isRTL ? 'تسجيل الدخول إلى حسابك' : 'Login to Your Account'}
      subtitle={isRTL 
        ? 'أدخل بياناتك أدناه للوصول إلى متحفنا الرقمي'
        : 'Enter your credentials below to access our digital museum'
      }
      isRTL={isRTL}
      authType="login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex justify-between">
            <Label htmlFor="password">
              {isRTL ? 'كلمة المرور' : 'Password'}
            </Label>
            <a href="#" className="text-sm text-primary hover:underline">
              {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm">
            {isRTL ? 'تذكرني' : 'Remember me'}
          </Label>
        </div>
        
        <Button type="submit" className="w-full cta-button">
          {isRTL ? 'تسجيل الدخول' : 'Login'}
        </Button>
        
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-museum-sand px-2 text-muted-foreground">
            {isRTL ? 'أو' : 'OR'}
          </span>
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border"></div>
        </div>
        
        <Button variant="outline" className="w-full">
          {isRTL ? 'تسجيل الدخول بحساب Google' : 'Login with Google'}
        </Button>
      </form>
    </AuthContainer>
  );
};

export default Login;
