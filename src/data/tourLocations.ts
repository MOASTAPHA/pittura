export interface CuratedLocation {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  skyboxUrl: string;
  thumbnailUrl: string;
  region: { en: string; ar: string };
  type: 'historical' | 'natural' | 'modern' | 'cultural' | 'religious';
  coords: [number, number]; // [lat, lng]
  featured?: boolean;
}

export const curatedLocations: CuratedLocation[] = [
  {
    id: 'elephant-rock',
    title: {
      en: 'Elephant Rock — AlUla',
      ar: 'صخرة الفيل — العلا',
    },
    description: {
      en: 'A stunning natural rock formation in AlUla that resembles an elephant reaching its trunk to the ground. This iconic geological wonder stands against the vast desert backdrop, showcasing millions of years of wind and sand erosion that sculpted this majestic natural monument.',
      ar: 'تكوين صخري طبيعي مذهل في العلا يشبه فيلاً يمد خرطومه نحو الأرض. تقف هذه الأعجوبة الجيولوجية الأيقونية أمام خلفية صحراوية شاسعة، تعرض ملايين السنين من تآكل الرياح والرمال التي نحتت هذا النصب الطبيعي المهيب.',
    },
    skyboxUrl: 'https://skybox.blockadelabs.com/e/2db23191ea07b1e540afcc611cf3fbc0',
    thumbnailUrl: '/images/elephant-rock.png',
    region: { en: 'AlUla', ar: 'العلا' },
    type: 'natural',
    coords: [26.81, 37.95],
    featured: true,
  },
  {
    id: 'masmak-fort',
    title: {
      en: 'Al Masmak Fort — Riyadh',
      ar: 'قصر المصمك — الرياض',
    },
    description: {
      en: 'A clay and mud-brick fortress in the heart of Riyadh, Al Masmak played a pivotal role in the recapture of Riyadh in 1902 by King Abdulaziz. Today it stands as a museum celebrating the unification of Saudi Arabia and its rich history.',
      ar: 'حصن من الطين والطوب اللبن في قلب الرياض، لعب المصمك دوراً محورياً في استعادة الرياض عام 1902 على يد الملك عبد العزيز. يقف اليوم كمتحف يحتفي بتوحيد المملكة العربية السعودية وتاريخها العريق.',
    },
    skyboxUrl: 'https://skybox.blockadelabs.com/e/e05a1fc9d611500155fb20ef89a79f07',
    thumbnailUrl: '/images/masmak-fort.png',
    region: { en: 'Riyadh', ar: 'الرياض' },
    type: 'historical',
    coords: [24.6311, 46.7134],
    featured: true,
  },
  {
    id: 'heritage-museum',
    title: {
      en: 'Saudi Heritage Museum',
      ar: 'المتحف التراثي السعودي',
    },
    description: {
      en: 'An immersive museum experience showcasing Saudi Arabia\'s rich cultural heritage through curated exhibitions of traditional artifacts, historical documents, and interactive displays spanning centuries of Arabian history.',
      ar: 'تجربة متحفية غامرة تعرض التراث الثقافي الغني للمملكة العربية السعودية من خلال معارض منتقاة للقطع الأثرية التقليدية والوثائق التاريخية والعروض التفاعلية التي تمتد لقرون من التاريخ العربي.',
    },
    skyboxUrl: 'https://skybox.blockadelabs.com/e/65f78fd0cf14059c6a416a2c0e9b38e5',
    thumbnailUrl: '/images/heritage-museum.png',
    region: { en: 'Riyadh', ar: 'الرياض' },
    type: 'cultural',
    coords: [24.6486, 46.7105],
  },
  {
    id: 'diriyah',
    title: {
      en: 'Diriyah Heritage District',
      ar: 'حي الدرعية التاريخي',
    },
    description: {
      en: 'The birthplace of the first Saudi state, Diriyah\'s At-Turaif district is a UNESCO World Heritage site featuring stunning Najdi mud-brick architecture. This historic district tells the story of the founding of a nation and its enduring cultural legacy.',
      ar: 'مسقط رأس الدولة السعودية الأولى، حي الطريف في الدرعية موقع تراث عالمي لليونسكو يتميز بعمارة نجدية مذهلة من الطوب اللبن. يروي هذا الحي التاريخي قصة تأسيس أمة وإرثها الثقافي الخالد.',
    },
    skyboxUrl: 'https://skybox.blockadelabs.com/e/0a4d10be1c7fa7d1f725662e85b9f8e8',
    thumbnailUrl: '/images/diriyah.png',
    region: { en: 'Riyadh', ar: 'الرياض' },
    type: 'historical',
    coords: [24.7341, 46.5753],
    featured: true,
  },
  {
    id: 'alula-ruins',
    title: {
      en: 'AlUla Heritage Ruins',
      ar: 'آثار العلا التراثية',
    },
    description: {
      en: 'Explore the ancient heritage ruins of AlUla, where centuries of civilization have left their mark on the sandstone landscape. From Nabataean tombs to Lihyanite sanctuaries, these ruins represent one of the most significant archaeological sites in the Arabian Peninsula.',
      ar: 'استكشف الآثار التراثية القديمة في العلا، حيث تركت قرون من الحضارة بصماتها على المشهد الطبيعي من الحجر الرملي. من المقابر النبطية إلى المعابد اللحيانية، تمثل هذه الآثار أحد أهم المواقع الأثرية في شبه الجزيرة العربية.',
    },
    skyboxUrl: 'https://skybox.blockadelabs.com/e/2598db62d91bd2972427aa8b2a3e44f1',
    thumbnailUrl: '/images/alula-ruins.png',
    region: { en: 'AlUla', ar: 'العلا' },
    type: 'historical',
    coords: [26.6204, 37.9208],
    featured: true,
  },
  {
    id: 'edge-of-world',
    title: {
      en: 'Edge of the World — Riyadh',
      ar: 'حافة العالم — الرياض',
    },
    description: {
      en: 'A dramatic natural escarpment northwest of Riyadh offering breathtaking panoramic views across an endless, uninterrupted expanse of ancient seabed. The sheer cliffs drop hundreds of meters, creating one of the most awe-inspiring natural viewpoints in Saudi Arabia.',
      ar: 'جرف طبيعي دراماتيكي شمال غرب الرياض يوفر مناظر بانورامية خلابة عبر امتداد لا نهائي من قاع البحر القديم. تنخفض المنحدرات الشاهقة مئات الأمتار، مما يخلق واحدة من أكثر نقاط المراقبة الطبيعية إثارة للإعجاب في المملكة العربية السعودية.',
    },
    skyboxUrl: 'https://skybox.blockadelabs.com/e/6276b22961c42d74fc4735fc6da1951e',
    thumbnailUrl: '/images/edge-of-world.png',
    region: { en: 'Riyadh', ar: 'الرياض' },
    type: 'natural',
    coords: [24.8336, 46.2522],
    featured: true,
  },
  {
    id: 'quba-mosque',
    title: {
      en: 'Quba Mosque — Madinah',
      ar: 'مسجد قباء — المدينة المنورة',
    },
    description: {
      en: 'The first mosque built in Islam, Quba Mosque holds immense spiritual significance. Located in Madinah, this beautifully renovated mosque continues to be a place of worship and pilgrimage, its white marble architecture gleaming under the Arabian sun.',
      ar: 'أول مسجد بُني في الإسلام، يحمل مسجد قباء أهمية روحية هائلة. يقع في المدينة المنورة، ويستمر هذا المسجد المُجدد بشكل جميل كمكان للعبادة والحج، تتألق عمارته من الرخام الأبيض تحت شمس الجزيرة العربية.',
    },
    skyboxUrl: 'https://skybox.blockadelabs.com/e/7af03bf78b43d7bb16984e077425bdb7',
    thumbnailUrl: '/images/quba-mosque.svg',
    region: { en: 'Madinah', ar: 'المدينة المنورة' },
    type: 'religious',
    coords: [24.4398, 39.6166],
  },
  {
    id: 'neom',
    title: {
      en: 'NEOM Future City',
      ar: 'مدينة نيوم المستقبلية',
    },
    description: {
      en: 'A vision of the future, NEOM represents Saudi Arabia\'s bold ambition to build a new model for sustainable living. This megaproject on the Red Sea coast aims to redefine how cities function, integrating cutting-edge technology with breathtaking natural landscapes.',
      ar: 'رؤية للمستقبل، تمثل نيوم طموح المملكة العربية السعودية الجريء لبناء نموذج جديد للعيش المستدام. يهدف هذا المشروع العملاق على ساحل البحر الأحمر إلى إعادة تعريف كيفية عمل المدن، بدمج التكنولوجيا المتطورة مع المناظر الطبيعية الخلابة.',
    },
    skyboxUrl: 'https://skybox.blockadelabs.com/e/5beb06c2e969a43c82dfacb538a35206',
    thumbnailUrl: '/images/neom.svg',
    region: { en: 'Tabuk', ar: 'تبوك' },
    type: 'modern',
    coords: [27.9506, 35.3025],
  },
  {
    id: 'wadi-lajab',
    title: {
      en: 'Wadi Lajab',
      ar: 'وادي لجب',
    },
    description: {
      en: 'A hidden natural wonder in the Jizan region, Wadi Lajab is a dramatic canyon with towering cliffs, flowing streams, and lush vegetation. This breathtaking gorge offers a stark contrast to the typical desert landscape, revealing Saudi Arabia\'s incredible geographic diversity.',
      ar: 'أعجوبة طبيعية مخفية في منطقة جازان، وادي لجب هو وادٍ دراماتيكي بمنحدرات شاهقة وجداول متدفقة ونباتات خضراء كثيفة. يقدم هذا الوادي الخلاب تناقضاً صارخاً مع المشهد الصحراوي النموذجي، كاشفاً عن التنوع الجغرافي المذهل للمملكة العربية السعودية.',
    },
    skyboxUrl: 'https://skybox.blockadelabs.com/e/090b33baec16087913097d368a40adcc',
    thumbnailUrl: '/images/wadi-lajab.png',
    region: { en: 'Jizan', ar: 'جازان' },
    type: 'natural',
    coords: [17.3343, 43.0333],
  },
  {
    id: 'soudah-mountains',
    title: {
      en: 'Al Soudah Mountains — Abha',
      ar: 'جبال السودة — أبها',
    },
    description: {
      en: 'The highest point in Saudi Arabia, Al Soudah offers stunning mountain vistas, cool climate, and rich biodiversity. The terraced agriculture and traditional stone villages of the Asir region create a unique cultural landscape unlike anywhere else in the Kingdom.',
      ar: 'أعلى نقطة في المملكة العربية السعودية، توفر السودة مناظر جبلية مذهلة ومناخاً بارداً وتنوعاً بيولوجياً غنياً. تخلق الزراعة المدرجة والقرى الحجرية التقليدية في منطقة عسير مشهداً ثقافياً فريداً لا مثيل له في أي مكان آخر في المملكة.',
    },
    skyboxUrl: 'https://skybox.blockadelabs.com/e/2c69bf2f71437933b026009631ffb5d4',
    thumbnailUrl: '/images/al-soudah.svg',
    region: { en: 'Abha', ar: 'أبها' },
    type: 'natural',
    coords: [18.2164, 42.3589],
  },
];
