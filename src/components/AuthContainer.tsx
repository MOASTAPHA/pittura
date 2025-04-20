
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthContainerProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  isRTL?: boolean;
  authType: 'login' | 'register';
}

const AuthContainer = ({ 
  children, 
  title, 
  subtitle, 
  isRTL = false,
  authType
}: AuthContainerProps) => {
  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${isRTL ? 'rtl' : ''}`}>
      <div className="w-full md:w-1/2 bg-museum-sand p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="text-2xl font-playfair font-bold">
              {isRTL ? 'بيتورا' : 'Baytora'}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {isRTL ? 'متحف المملكة الرقمي' : 'The Kingdom\'s Digital Museum'}
            </p>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground mb-8">{subtitle}</p>
          
          {children}
          
          <div className="mt-6 text-center">
            {authType === 'login' ? (
              <p>
                {isRTL ? 'ليس لديك حساب؟' : 'Don\'t have an account?'}{' '}
                <Link to="/register" className="text-primary hover:underline">
                  {isRTL ? 'سجل الآن' : 'Register Now'}
                </Link>
              </p>
            ) : (
              <p>
                {isRTL ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
                <Link to="/login" className="text-primary hover:underline">
                  {isRTL ? 'تسجيل الدخول' : 'Login'}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=2834&auto=format&fit=crop')" }}>
        <div className="h-full w-full bg-museum-brown/40 flex items-center justify-center p-12">
          <div className="text-white max-w-md">
            <h2 className="text-3xl font-bold mb-4">
              {isRTL 
                ? 'استكشف تراث المملكة الغني'
                : 'Explore the Kingdom\'s Rich Heritage'
              }
            </h2>
            <p className="mb-6">
              {isRTL
                ? 'انضم إلينا في رحلة عبر تاريخ المملكة العربية السعودية، واستكشف القطع الأثرية النادرة والمعالم الثقافية في متحفنا الرقمي.'
                : 'Join us on a journey through Saudi Arabia\'s history, explore rare artifacts and cultural landmarks in our digital museum.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
