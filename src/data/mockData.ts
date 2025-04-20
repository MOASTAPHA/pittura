
import { ArtifactType } from '@/components/ArtifactCard';
import { VirtualTourType } from '@/components/VirtualTourCard';

// Featured Artifacts
export const featuredArtifacts: ArtifactType[] = [
  {
    id: 'artifact-001',
    title: {
      en: 'Al-Farid Palace Column',
      ar: 'عمود قصر الفريد',
    },
    period: {
      en: 'Nabataean Period (1st century BCE)',
      ar: 'الفترة النبطية (القرن الأول قبل الميلاد)',
    },
    imageUrl: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
    category: {
      en: 'Architecture',
      ar: 'عمارة',
    },
    featured: true,
  },
  {
    id: 'artifact-002',
    title: {
      en: 'Mada\'in Saleh Inscription',
      ar: 'نقش مدائن صالح',
    },
    period: {
      en: 'Late Antiquity (4th century CE)',
      ar: 'العصور القديمة المتأخرة (القرن الرابع الميلادي)',
    },
    imageUrl: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511',
    category: {
      en: 'Inscriptions',
      ar: 'نقوش',
    },
    featured: true,
  },
  {
    id: 'artifact-003',
    title: {
      en: 'Hegra Gold Necklace',
      ar: 'قلادة الحجر الذهبية',
    },
    period: {
      en: 'Iron Age (1st century CE)',
      ar: 'العصر الحديدي (القرن الأول الميلادي)',
    },
    imageUrl: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e',
    category: {
      en: 'Jewelry',
      ar: 'مجوهرات',
    },
    featured: true,
  },
  {
    id: 'artifact-004',
    title: {
      en: 'Ancient Scroll of Al-Ula',
      ar: 'مخطوطة العلا القديمة',
    },
    period: {
      en: 'Islamic Era (8th century CE)',
      ar: 'العصر الإسلامي (القرن الثامن الميلادي)',
    },
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    category: {
      en: 'Manuscripts',
      ar: 'مخطوطات',
    },
    featured: true,
  },
];

// Virtual Tours
export const virtualTours: VirtualTourType[] = [
  {
    id: 'tour-001',
    title: {
      en: 'Royal Palace of Diriyah',
      ar: 'القصر الملكي في الدرعية',
    },
    description: {
      en: 'Explore the historical capital of the first Saudi state, featuring traditional Najdi architecture and royal quarters.',
      ar: 'استكشف العاصمة التاريخية للدولة السعودية الأولى، والتي تضم العمارة النجدية التقليدية والأحياء الملكية.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
    duration: 45,
    featured: true,
  },
  {
    id: 'tour-002',
    title: {
      en: 'Mada\'in Saleh Tombs',
      ar: 'مقابر مدائن صالح',
    },
    description: {
      en: 'Walk through Saudi Arabia\'s first UNESCO World Heritage site with its magnificent rock-cut tombs from the Nabataean civilization.',
      ar: 'تجول في أول موقع سعودي مدرج في قائمة التراث العالمي لليونسكو مع مقابره الصخرية الرائعة من الحضارة النبطية.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e',
    duration: 60,
    featured: true,
  },
  {
    id: 'tour-003',
    title: {
      en: 'Al-Turaif District',
      ar: 'حي الطريف',
    },
    description: {
      en: 'Visit this UNESCO World Heritage site with traditional mud-brick architecture and the historic center of the Ad-Diriyah region.',
      ar: 'زر موقع التراث العالمي هذا المميز بهندسته المعمارية التقليدية من الطوب الطيني والمركز التاريخي لمنطقة الدرعية.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
    duration: 30,
    featured: true,
  },
];

// Current Auctions
export const currentAuctions = [
  {
    id: 'auction-001',
    title: {
      en: 'Digital Replica: Royal Dagger',
      ar: 'نسخة رقمية: خنجر ملكي',
    },
    description: {
      en: 'A digital replica of the 18th century royal dagger with gold inlay and precious gemstones.',
      ar: 'نسخة رقمية من الخنجر الملكي من القرن الثامن عشر مع تطعيمات ذهبية وأحجار كريمة.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    currentBid: 1200,
    currency: 'SAR',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
  },
  {
    id: 'auction-002',
    title: {
      en: 'Historic Map Collection NFT',
      ar: 'مجموعة خرائط تاريخية NFT',
    },
    description: {
      en: 'A collection of digitized historic maps of the Arabian Peninsula from the 16th-19th centuries.',
      ar: 'مجموعة من الخرائط التاريخية الرقمية لشبه الجزيرة العربية من القرن السادس عشر إلى القرن التاسع عشر.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511',
    currentBid: 5500,
    currency: 'SAR',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
  },
  {
    id: 'auction-003',
    title: {
      en: 'Virtual Reality Experience: Ancient Diriyah',
      ar: 'تجربة الواقع الافتراضي: الدرعية القديمة',
    },
    description: {
      en: 'Exclusive access to a VR experience of Diriyah as it appeared in the 18th century.',
      ar: 'وصول حصري إلى تجربة واقع افتراضي للدرعية كما ظهرت في القرن الثامن عشر.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
    currentBid: 3200,
    currency: 'SAR',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
  },
];

// Full Artifact Details for the detail page
export const artifactDetails = {
  'artifact-001': {
    id: 'artifact-001',
    title: {
      en: 'Al-Farid Palace Column',
      ar: 'عمود قصر الفريد',
    },
    period: {
      en: 'Nabataean Period (1st century BCE)',
      ar: 'الفترة النبطية (القرن الأول قبل الميلاد)',
    },
    description: {
      en: 'This elaborately carved column is one of the few remaining architectural elements from the Al-Farid Palace, a significant Nabataean structure. The intricate designs feature palm fronds, geometric patterns, and symbols associated with the ancient Nabataean civilization that flourished in what is now modern-day Saudi Arabia.\n\nThe column showcases the remarkable stone-cutting techniques employed by Nabataean artisans, who were known for their ability to create elaborate structures directly from rock faces. The craftsmanship demonstrates the cultural and artistic sophistication of the Nabataean society, which established important trade routes across the Arabian Peninsula.',
      ar: 'هذا العمود المنحوت بدقة هو أحد العناصر المعمارية القليلة المتبقية من قصر الفريد، وهو مبنى نبطي مهم. تتضمن التصاميم المعقدة سعف النخيل والأنماط الهندسية والرموز المرتبطة بالحضارة النبطية القديمة التي ازدهرت فيما يعرف الآن بالمملكة العربية السعودية الحديثة.\n\nيعرض العمود تقنيات قطع الحجارة الرائعة التي استخدمها الحرفيون النبطيون، والذين كانوا معروفين بقدرتهم على إنشاء هياكل معقدة مباشرة من واجهات الصخور. تظهر البراعة التطور الثقافي والفني للمجتمع النبطي، الذي أنشأ طرق تجارية مهمة عبر شبه الجزيرة العربية.',
    },
    images: [
      'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
      'https://images.unsplash.com/photo-1460574283810-2aab119d8511',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
    ],
    location: {
      en: 'Discovered at Al-Ula, Saudi Arabia',
      ar: 'تم اكتشافه في العلا، المملكة العربية السعودية',
    },
    dimensions: {
      en: 'Height: 4.2m, Diameter: 0.8m',
      ar: 'الارتفاع: 4.2 متر، القطر: 0.8 متر',
    },
    materials: {
      en: 'Sandstone with traces of original pigment',
      ar: 'حجر رملي مع آثار من الصبغة الأصلية',
    },
    conservation: {
      en: 'Restored in 2015 using non-invasive techniques to preserve original coloration and structural integrity.',
      ar: 'تمت استعادته في عام 2015 باستخدام تقنيات غير متدخلة للحفاظ على التلوين الأصلي والسلامة الهيكلية.',
    },
    hasModel: true,
    category: {
      en: 'Architecture',
      ar: 'عمارة',
    },
    relatedArtifacts: ['artifact-002', 'artifact-003'],
  },
};
