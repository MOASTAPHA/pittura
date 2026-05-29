export interface MembershipTier {
  id: string;
  name: { en: string; ar: string };
  price: number; // SAR per month, 0 = free
  description: { en: string; ar: string };
  features: { en: string; ar: string }[];
  highlighted?: boolean;
}

export const membershipTiers: MembershipTier[] = [
  {
    id: 'basic',
    name: { en: 'Basic', ar: 'أساسي' },
    price: 0,
    description: {
      en: 'Start exploring Saudi heritage for free',
      ar: 'ابدأ استكشاف التراث السعودي مجاناً',
    },
    features: [
      { en: 'Access to 3 curated locations', ar: 'الوصول إلى 3 مواقع منتقاة' },
      { en: 'Standard 360° experience', ar: 'تجربة 360° عادية' },
      { en: 'Bilingual interface', ar: 'واجهة ثنائية اللغة' },
      { en: 'Interactive map access', ar: 'الوصول للخريطة التفاعلية' },
    ],
  },
  {
    id: 'explorer',
    name: { en: 'Explorer', ar: 'المستكشف' },
    price: 49,
    description: {
      en: 'Unlock the full Saudi heritage experience',
      ar: 'افتح تجربة التراث السعودي الكاملة',
    },
    features: [
      { en: 'Access to all 10 curated locations', ar: 'الوصول إلى جميع المواقع العشرة المنتقاة' },
      { en: 'HD 360° immersive experiences', ar: 'تجارب 360° غامرة بدقة عالية' },
      { en: 'Offline access to tours', ar: 'الوصول للجولات بدون إنترنت' },
      { en: 'Monthly new location drops', ar: 'مواقع جديدة شهرياً' },
      { en: 'Priority support', ar: 'دعم ذو أولوية' },
    ],
    highlighted: true,
  },
  {
    id: 'heritage',
    name: { en: 'Heritage', ar: 'التراث' },
    price: 99,
    description: {
      en: 'The ultimate premium cultural experience',
      ar: 'التجربة الثقافية المميزة المطلقة',
    },
    features: [
      { en: 'Everything in Explorer plan', ar: 'كل ما في خطة المستكشف' },
      { en: 'Exclusive behind-the-scenes content', ar: 'محتوى حصري من وراء الكواليس' },
      { en: 'Virtual guided tours with experts', ar: 'جولات افتراضية مع مرشدين خبراء' },
      { en: 'Early access to new experiences', ar: 'وصول مبكر للتجارب الجديدة' },
      { en: 'Downloadable educational resources', ar: 'موارد تعليمية قابلة للتحميل' },
      { en: 'Family account (up to 5 members)', ar: 'حساب عائلي (حتى 5 أعضاء)' },
    ],
  },
];

// Sample auctions data used by the Auctions page
export const currentAuctions = [
  {
    id: 'a1',
    title: { en: 'Antique Dagger', ar: 'خنجر أثرى' },
    description: {
      en: 'A finely preserved dagger from the 18th century, complete with original sheath and engravings.',
      ar: 'خنجر محفوظ جيدًا من القرن الثامن عشر مع غمده الأصلي ونقوشه.'
    },
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Antique_African_dagger_%2812097663613%29.jpg',
    currentBid: '1,200',
    currency: 'SAR',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3) // 3 days from now
  },
  {
    id: 'a2',
    title: { en: 'Ceramic Vase', ar: 'مزهرية خزفية' },
    description: {
      en: 'Hand-painted ceramic vase with traditional geometric patterns.',
      ar: 'مزهرية خزفية مرسومة يدويًا بنقوش هندسية تقليدية.'
    },
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tulip-shaped_ceramic_vase%2C_Karanovo_culture%2C_Bulgaria%2C_6th_millennium_BC.jpg',
    currentBid: '750',
    currency: 'SAR',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5) // 5 days from now
  },
  {
    id: 'a3',
    title: { en: 'Historic Coin', ar: 'عملة تاريخية' },
    description: {
      en: 'Rare coin from a historic Arabian trade route, excellent condition.',
      ar: 'عملة نادرة من طريق تجاري عربي تاريخي بحالة ممتازة.'
    },
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/India%2C_Chandragupta_II%2C_Gupta_Period_-_Coin_with_Figure_of_an_Archer_-_1977.62_-_Cleveland_Museum_of_Art.jpg',
    currentBid: '300',
    currency: 'SAR',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 12) // 12 hours from now
  }
];
