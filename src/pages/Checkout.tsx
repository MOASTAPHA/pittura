import { useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Checkout = () => {
  const { isRTL } = useLanguage();
  const [searchParams] = useSearchParams();
  const item = searchParams.get('item') || '';
  const amount = searchParams.get('amount') || '';
  const currency = searchParams.get('currency') || 'SAR';

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      const tx = 'TX-' + Math.random().toString(36).slice(2, 10).toUpperCase();
      setTransactionId(tx);
      setSuccess(true);
      setProcessing(false);
    }, 1800);
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#F5F0E8]">
      <Navigation />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold mb-6">{isRTL ? 'خدمة الدفع (تجريبي)' : 'Mock Checkout'}</h1>

        {!success ? (
          <div className="bg-white rounded-xl p-8 shadow border border-[#E8E3D9]">
            <p className="mb-4 text-muted-foreground">
              {isRTL ? 'سيتم محاكاة عملية الدفع فقط — لا يتم خصم أي أموال.' : 'This will simulate a payment — no real charge will be made.'}
            </p>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">{isRTL ? 'مقابل' : 'Item'}</span>
                <span className="font-medium">{item || (isRTL ? 'قطعة مجهولة' : 'Unknown item')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{isRTL ? 'المبلغ' : 'Amount'}</span>
                <span className="font-bold">{amount} {currency}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <input placeholder={isRTL ? 'اسم حامل البطاقة' : 'Cardholder name'} className="w-full p-3 border rounded-lg" />
              <input placeholder={isRTL ? 'رقم البطاقة (تجريبي)' : 'Card number (mock)'} className="w-full p-3 border rounded-lg" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder={isRTL ? 'MM/YY' : 'MM/YY'} className="w-full p-3 border rounded-lg" />
                <input placeholder={isRTL ? 'CVV' : 'CVV'} className="w-full p-3 border rounded-lg" />
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handlePay} className="bg-[#B8945F] hover:bg-[#A57D4A] text-white rounded-full" disabled={processing}>
                {processing ? (isRTL ? 'جارٍ المعالجة...' : 'Processing...') : (isRTL ? 'ادفع الآن (تجريبي)' : 'Pay Now (mock)')}
              </Button>
              <Link to="/auctions" className="ml-2"><Button variant="outline">{isRTL ? 'إلغاء' : 'Cancel'}</Button></Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 shadow border border-[#E8E3D9] text-center">
            <h2 className="text-2xl font-bold mb-4">{isRTL ? 'تم الدفع بنجاح' : 'Payment Successful'}</h2>
            <p className="mb-4">{isRTL ? 'معرّف المعاملة:' : 'Transaction ID:'} <span className="font-mono">{transactionId}</span></p>
            <p className="text-muted-foreground mb-6">{isRTL ? 'ستتلقى رسالة تأكيد (وهمي) عبر البريد الإلكتروني.' : 'You will receive a mock confirmation email.'}</p>
            <div className="flex justify-center gap-4">
              <Link to="/auctions"><Button>{isRTL ? 'العودة إلى المزادات' : 'Back to Auctions'}</Button></Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
