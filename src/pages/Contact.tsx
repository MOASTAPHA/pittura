import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  const { isRTL } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast({
        title: isRTL ? 'تم إرسال رسالتك بنجاح' : 'Message Sent Successfully',
        description: isRTL 
          ? 'سيتواصل معك فريقنا في أقرب وقت ممكن.' 
          : 'Our team will get back to you as soon as possible.',
      });
    }, 1500);
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#B8945F] text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            {isRTL ? 'تواصل معنا' : 'Get in Touch'}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3D2E1A] mb-6 font-playfair">
            {isRTL ? 'نحن هنا للإجابة على استفساراتك' : 'We are here to answer your questions'}
          </h1>
          <p className="text-[#5C4A2E] text-lg">
            {isRTL 
              ? 'سواء كان لديك استفسار حول العضويات، أو شراكة محتملة، يسعدنا تواصلك معنا.' 
              : 'Whether you have a question about memberships or a potential partnership, we would love to hear from you.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-[#E8E3D9]">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#3D2E1A] to-[#2D2118] rounded-[2rem] p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8945F] rounded-full blur-[80px] opacity-20" />
            
            <h2 className="text-2xl font-bold mb-8 font-playfair relative z-10">
              {isRTL ? 'معلومات التواصل' : 'Contact Information'}
            </h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8C97A]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#E8C97A]" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{isRTL ? 'العنوان' : 'Address'}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {isRTL ? 'حي الدرعية التاريخي، الرياض' : 'Diriyah Heritage District, Riyadh'}<br />
                    {isRTL ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8C97A]/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#E8C97A]" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{isRTL ? 'الهاتف' : 'Phone'}</h3>
                  <p className="text-white/70 text-sm" dir="ltr">+966 11 234 5678</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8C97A]/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#E8C97A]" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{isRTL ? 'البريد الإلكتروني' : 'Email'}</h3>
                  <p className="text-white/70 text-sm">hello@pittura.sa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#3D2E1A]">
                    {isRTL ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#FBF7EF] border border-[#E8E3D9] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B8945F]/50 focus:border-[#B8945F] transition-all"
                    placeholder={isRTL ? 'أدخل اسمك' : 'Enter your name'}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#3D2E1A]">
                    {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#FBF7EF] border border-[#E8E3D9] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B8945F]/50 focus:border-[#B8945F] transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#3D2E1A]">
                  {isRTL ? 'الموضوع' : 'Subject'}
                </label>
                <input
                  required
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#FBF7EF] border border-[#E8E3D9] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B8945F]/50 focus:border-[#B8945F] transition-all"
                  placeholder={isRTL ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#3D2E1A]">
                  {isRTL ? 'الرسالة' : 'Message'}
                </label>
                <textarea
                  required
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#FBF7EF] border border-[#E8E3D9] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B8945F]/50 focus:border-[#B8945F] transition-all resize-none"
                  placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 bg-[#3D2E1A] hover:bg-[#5C4A2E] text-white px-8 py-4 rounded-xl font-bold transition-colors w-full md:w-auto"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    {isRTL ? 'إرسال الرسالة' : 'Send Message'}
                  </>
                )}
              </button>
            </form>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
