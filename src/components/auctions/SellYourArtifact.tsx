
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Upload, Image, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';

interface SellYourArtifactProps {
  isRTL: boolean;
}

const SellYourArtifact = ({ isRTL }: SellYourArtifactProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target?.result) {
          setPreviewUrl(e.target.result as string);
          
          // Simulate AI price suggestion
          setTimeout(() => {
            const randomPrice = Math.floor(Math.random() * 10000) + 1000;
            setSuggestedPrice(randomPrice);
          }, 1500);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };
  
  return (
    <section className="bg-museum-sand/30 py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-background rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 bg-[url('https://images.unsplash.com/photo-1466442929976-97f336a657be')] bg-cover bg-center relative">
              <div className="absolute inset-0 bg-museum-brown/70 backdrop-blur-sm"></div>
              <div className="relative z-10 text-white">
                <h2 className="text-2xl font-bold mb-4 font-playfair">
                  {isRTL ? 'بيع قطعتك الأثرية' : 'Sell Your Artifact'}
                </h2>
                <p className="mb-6">
                  {isRTL 
                    ? 'هل تملك قطعًا أثرية أو فنية ذات قيمة ثقافية؟ قدمها للمراجعة والبيع في مزاداتنا الرقمية.'
                    : 'Do you own artifacts or artistic pieces with cultural value? Submit them for review and sale in our digital auctions.'}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">1</div>
                    <p>{isRTL ? 'قم بتحميل صور عالية الدقة للقطعة' : 'Upload high-resolution images of your item'}</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">2</div>
                    <p>{isRTL ? 'قدم معلومات تفصيلية حول القطعة وأصلها' : 'Provide detailed information about the item and its origin'}</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">3</div>
                    <p>{isRTL ? 'قدم دليل الأصالة إن وجد' : 'Submit proof of authenticity if available'}</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">4</div>
                    <p>{isRTL ? 'سيتم مراجعة طلبك من قبل خبرائنا' : 'Our experts will review your submission'}</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-bold mb-6">
                {isRTL ? 'نموذج التقديم' : 'Submission Form'}
              </h3>
              
              <Form>
                <div className="space-y-6">
                  <FormField
                    name="itemName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isRTL ? 'اسم القطعة' : 'Item Name'}</FormLabel>
                        <FormControl>
                          <Input placeholder={isRTL ? 'مثال: إناء فخاري نبطي' : 'e.g., Nabatean Pottery Vase'} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="era"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{isRTL ? 'العصر/الفترة' : 'Era/Period'}</FormLabel>
                          <Select>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={isRTL ? 'اختر العصر' : 'Select era'} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nabatean">{isRTL ? 'النبطي' : 'Nabatean'}</SelectItem>
                              <SelectItem value="islamic">{isRTL ? 'الإسلامي' : 'Islamic'}</SelectItem>
                              <SelectItem value="pre-saudi">{isRTL ? 'ما قبل المملكة' : 'Pre-Saudi'}</SelectItem>
                              <SelectItem value="modern">{isRTL ? 'العصر الحديث' : 'Modern'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{isRTL ? 'المنطقة/المصدر' : 'Region/Origin'}</FormLabel>
                          <Select>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={isRTL ? 'اختر المنطقة' : 'Select region'} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="najd">{isRTL ? 'نجد' : 'Najd'}</SelectItem>
                              <SelectItem value="hijaz">{isRTL ? 'الحجاز' : 'Hijaz'}</SelectItem>
                              <SelectItem value="asir">{isRTL ? 'عسير' : 'Asir'}</SelectItem>
                              <SelectItem value="eastern">{isRTL ? 'المنطقة الشرقية' : 'Eastern Province'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isRTL ? 'وصف القطعة' : 'Item Description'}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={isRTL ? 'قدم وصفاً تفصيلياً للقطعة...' : 'Provide a detailed description of the item...'}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isRTL ? 'صور القطعة' : 'Item Images'}</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="image-upload"
                              onChange={handleFileChange}
                            />
                            <label htmlFor="image-upload" className="cursor-pointer">
                              {previewUrl ? (
                                <div className="relative">
                                  <img 
                                    src={previewUrl} 
                                    alt="Preview" 
                                    className="max-h-40 mx-auto rounded-md"
                                  />
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    {selectedFile?.name}
                                  </p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-2">
                                  <Upload className="w-8 h-8 text-muted-foreground" />
                                  <p className="font-medium">
                                    {isRTL ? 'انقر لتحميل الصور' : 'Click to upload images'}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {isRTL 
                                      ? 'PNG, JPG حتى 10 ميجابايت' 
                                      : 'PNG, JPG up to 10MB'}
                                  </p>
                                </div>
                              )}
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {suggestedPrice && (
                    <Card className="bg-museum-brown/10 border-museum-brown/20">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-museum-brown/20 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-museum-brown" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {isRTL ? 'التقييم الأولي بالذكاء الاصطناعي' : 'AI Initial Valuation'}
                          </p>
                          <p className="text-lg font-bold text-museum-brown">
                            {suggestedPrice.toLocaleString()} SAR
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <FormField
                    name="authenticity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isRTL ? 'إثبات الأصالة' : 'Authenticity Proof'}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={isRTL 
                              ? 'اشرح كيف يمكنك إثبات أصالة القطعة (الشهادات، التاريخ، المصدر...)' 
                              : 'Explain how you can prove the authenticity of the item (certificates, history, source...)'
                            }
                            className="min-h-[80px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button className="w-full bg-museum-brown hover:bg-museum-brown/90 text-white">
                    {isRTL ? 'تقديم للمراجعة' : 'Submit for Review'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SellYourArtifact;
