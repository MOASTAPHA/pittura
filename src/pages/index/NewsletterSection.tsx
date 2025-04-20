
import { Button } from '@/components/ui/button';

interface Props {
  isRTL: boolean;
}

const NewsletterSection = ({ isRTL }: Props) => (
  <section className="bg-museum-olive text-white py-16">
    <div className="museum-container text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {isRTL ? 'اشترك في النشرة الإخبارية لدينا' : 'Subscribe to Our Newsletter'}
      </h2>
      <p className="max-w-2xl mx-auto mb-8">
        {isRTL 
          ? 'احصل على آخر الأخبار حول المعارض الجديدة، المزادات القادمة، والجولات الافتراضية مباشرة إلى بريدك الإلكتروني.'
          : 'Get the latest news about new exhibitions, upcoming auctions, and virtual tours delivered straight to your inbox.'
        }
      </p>
      <form className="max-w-md mx-auto flex gap-2 flex-col sm:flex-row">
        <input 
          type="email" 
          placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your Email'} 
          className="px-4 py-2 rounded-full flex-grow bg-white text-foreground"
        />
        <Button className="bg-museum-brown hover:bg-museum-brown/90 rounded-full">
          {isRTL ? 'اشترك' : 'Subscribe'}
        </Button>
      </form>
    </div>
  </section>
);

export default NewsletterSection;
