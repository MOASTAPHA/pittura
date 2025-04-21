
export interface InfoPointData {
  id: string;
  position: {
    left: string;
    top: string;
  };
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

export interface LocationData {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  panoramaUrl: string;
  thumbnailUrl: string;
  audioNarration?: string;
  vrEnabled: boolean;
  featured?: boolean;
  infoPoints: InfoPointData[];
  region: 'north' | 'south' | 'east' | 'west' | 'central';
  type: 'historical' | 'natural' | 'modern' | 'cultural';
}

export const locations: LocationData[] = [
  {
    id: 'alula',
    title: { 
      en: 'AlUla Ancient Tombs', 
      ar: 'مقابر العلا القديمة' 
    },
    description: { 
      en: 'Explore the ancient Nabataean tombs of Hegra (Madain Saleh), a UNESCO World Heritage site with over 100 well-preserved monumental tombs carved into sandstone outcrops.',
      ar: 'استكشف مقابر الأنباط القديمة في الحجر (مدائن صالح)، موقع تراث عالمي لليونسكو يضم أكثر من 100 مقبرة أثرية محفوظة بشكل جيد منحوتة في نتوءات الحجر الرملي.'
    },
    panoramaUrl: 'https://images.unsplash.com/photo-1533408648768-c09bb62b670c?q=80&w=2066&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1533408648768-c09bb62b670c?q=80&w=2066&auto=format&fit=crop',
    audioNarration: '/audio/alula-narration.mp3',
    vrEnabled: true,
    featured: true,
    region: 'north',
    type: 'historical',
    infoPoints: [
      {
        id: 'alula-tomb1',
        position: {
          left: '30%',
          top: '40%'
        },
        title: { 
          en: 'Qasr al-Farid', 
          ar: 'قصر الفريد' 
        },
        description: { 
          en: 'Known as "The Lonely Castle," this is one of the most iconic tombs in Hegra, standing at four stories tall and carved into an isolated sandstone outcrop.',
          ar: 'المعروف باسم "القصر الوحيد"، وهو أحد أشهر المقابر في الحجر، يرتفع إلى أربعة طوابق ومنحوت في نتوء معزول من الحجر الرملي.'
        }
      },
      {
        id: 'alula-tomb2',
        position: {
          left: '50%',
          top: '55%'
        },
        title: { 
          en: 'Nabataean Architecture', 
          ar: 'العمارة النبطية' 
        },
        description: { 
          en: 'The Nabataeans were master builders who carved elaborate structures into solid rock, featuring distinctive facades influenced by Hellenistic, Egyptian, and Mesopotamian styles.',
          ar: 'كان الأنباط بناة ماهرين نحتوا هياكل معقدة في الصخور الصلبة، تتميز بواجهات مميزة تأثرت بالأساليب الهلنستية والمصرية وبلاد ما بين النهرين.'
        }
      },
      {
        id: 'alula-tomb3',
        position: {
          left: '70%',
          top: '30%'
        },
        title: { 
          en: 'Incense Route', 
          ar: 'طريق البخور' 
        },
        description: { 
          en: 'Hegra was an important stop on the incense trade route, which connected Arabia to the Mediterranean and beyond. The Nabataeans controlled this lucrative trade network.',
          ar: 'كانت الحجر محطة مهمة على طريق تجارة البخور، الذي ربط الجزيرة العربية بالبحر المتوسط وما وراءه. سيطر الأنباط على شبكة التجارة المربحة هذه.'
        }
      }
    ]
  },
  {
    id: 'shebara',
    title: { 
      en: 'Shebara Resort, Red Sea', 
      ar: 'منتجع شبارة، البحر الأحمر' 
    },
    description: { 
      en: 'Experience the futuristic eco-friendly architecture of Shebara Resort, nestled in the pristine waters of the Red Sea Project. This innovative destination showcases sustainable luxury and marine conservation.',
      ar: 'جرب العمارة المستقبلية الصديقة للبيئة لمنتجع شبارة، المتمركز في المياه النقية لمشروع البحر الأحمر. توضح هذه الوجهة المبتكرة الفخامة المستدامة والحفاظ على البيئة البحرية.'
    },
    panoramaUrl: 'https://images.unsplash.com/photo-1566553403419-8c858f197fb5?q=80&w=2069&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1566553403419-8c858f197fb5?q=80&w=2069&auto=format&fit=crop',
    audioNarration: '/audio/shebara-narration.mp3',
    vrEnabled: true,
    featured: true,
    region: 'west',
    type: 'modern',
    infoPoints: [
      {
        id: 'shebara-reef',
        position: {
          left: '35%',
          top: '60%'
        },
        title: { 
          en: 'Coral Reef Ecosystem', 
          ar: 'النظام البيئي للشعاب المرجانية' 
        },
        description: { 
          en: 'The Red Sea is home to over 1,200 species of fish and 250 species of coral, making it one of the most biodiverse marine environments on the planet.',
          ar: 'يضم البحر الأحمر أكثر من 1200 نوع من الأسماك و250 نوعًا من الشعاب المرجانية، مما يجعله من أكثر البيئات البحرية تنوعًا بيولوجيًا على كوكب الأرض.'
        }
      },
      {
        id: 'shebara-architecture',
        position: {
          left: '70%',
          top: '40%'
        },
        title: { 
          en: 'Sustainable Architecture', 
          ar: 'العمارة المستدامة' 
        },
        description: { 
          en: 'Shebara Resort is designed with a minimal environmental footprint, utilizing renewable energy, water conservation systems, and materials that harmonize with the natural landscape.',
          ar: 'تم تصميم منتجع شبارة بأقل بصمة بيئية، باستخدام الطاقة المتجددة وأنظمة الحفاظ على المياه والمواد التي تتناغم مع المناظر الطبيعية.'
        }
      },
      {
        id: 'shebara-conservation',
        position: {
          left: '20%',
          top: '30%'
        },
        title: { 
          en: 'Marine Conservation', 
          ar: 'الحفاظ على البيئة البحرية' 
        },
        description: { 
          en: 'The resort is part of a broader conservation initiative that protects marine habitats and endangered species, with ongoing research and restoration programs.',
          ar: 'المنتجع جزء من مبادرة أوسع للحفاظ على البيئة تحمي الموائل البحرية والأنواع المهددة بالانقراض، مع برامج بحث واستعادة مستمرة.'
        }
      }
    ]
  },
  {
    id: 'diriyah',
    title: { 
      en: 'Diriyah (At-Turaif)', 
      ar: 'الدرعية (الطريف)' 
    },
    description: { 
      en: 'Discover the birthplace of the first Saudi state at Diriyah, a UNESCO World Heritage site featuring At-Turaif, the mud-brick district that showcases traditional Najdi architecture.',
      ar: 'اكتشف مكان ولادة الدولة السعودية الأولى في الدرعية، موقع تراث عالمي لليونسكو يضم حي الطريف المبني من الطوب الطيني الذي يعرض العمارة النجدية التقليدية.'
    },
    panoramaUrl: 'https://images.unsplash.com/photo-1549144674-042496a1c191?q=80&w=2070&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1549144674-042496a1c191?q=80&w=2070&auto=format&fit=crop',
    audioNarration: undefined,
    vrEnabled: true,
    region: 'central',
    type: 'historical',
    infoPoints: [
      {
        id: 'diriyah-palace',
        position: {
          left: '45%',
          top: '50%'
        },
        title: { 
          en: 'Salwa Palace', 
          ar: 'قصر سلوى' 
        },
        description: { 
          en: 'The largest structure in At-Turaif, Salwa Palace was the residence of the ruling Al Saud family and the seat of government for the first Saudi state.',
          ar: 'أكبر مبنى في الطريف، كان قصر سلوى مقر إقامة عائلة آل سعود الحاكمة ومقر الحكومة للدولة السعودية الأولى.'
        }
      },
      {
        id: 'diriyah-architecture',
        position: {
          left: '25%',
          top: '40%'
        },
        title: { 
          en: 'Najdi Architecture', 
          ar: 'العمارة النجدية' 
        },
        description: { 
          en: 'Characterized by its distinctive mud-brick construction, triangular decorative elements, and thick walls designed to insulate against extreme desert temperatures.',
          ar: 'تتميز بالبناء الطيني المميز والعناصر الزخرفية المثلثة والجدران السميكة المصممة للعزل ضد درجات حرارة الصحراء القصوى.'
        }
      }
    ]
  },
  {
    id: 'jeddah',
    title: { 
      en: 'Jeddah Historic District (Al-Balad)', 
      ar: 'حي جدة التاريخي (البلد)' 
    },
    description: { 
      en: 'Wander through the 7th-century historic district of Jeddah, with its distinctive coral stone houses, intricate wooden lattice balconies (roshan), and bustling traditional souqs.',
      ar: 'تجول في حي جدة التاريخي من القرن السابع، مع منازله المميزة المبنية من الحجر المرجاني، وشرفات الخشب المعقدة (الروشن)، والأسواق التقليدية النابضة بالحياة.'
    },
    panoramaUrl: 'https://images.unsplash.com/photo-1603651780584-6c3284e5d819?q=80&w=2070&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1603651780584-6c3284e5d819?q=80&w=2070&auto=format&fit=crop',
    audioNarration: undefined,
    vrEnabled: true,
    region: 'west',
    type: 'cultural',
    infoPoints: [
      {
        id: 'jeddah-roshan',
        position: {
          left: '65%',
          top: '45%'
        },
        title: { 
          en: 'Roshan Windows', 
          ar: 'نوافذ الروشن' 
        },
        description: { 
          en: 'These ornate wooden bay windows provide privacy while allowing airflow, demonstrating ingenious climate adaptation in traditional architecture.',
          ar: 'توفر هذه النوافذ الخشبية المزخرفة الخصوصية مع السماح بتدفق الهواء، مما يدل على التكيف المناخي العبقري في العمارة التقليدية.'
        }
      },
      {
        id: 'jeddah-coral',
        position: {
          left: '35%',
          top: '60%'
        },
        title: { 
          en: 'Coral Stone Construction', 
          ar: 'البناء بالحجر المرجاني' 
        },
        description: { 
          en: 'Jeddah\'s historic buildings were constructed using coral stone harvested from the Red Sea, mixed with lime and clay to create a durable building material suited to the coastal climate.',
          ar: 'تم بناء المباني التاريخية في جدة باستخدام الحجر المرجاني المستخرج من البحر الأحمر، ممزوجًا بالجير والطين لإنشاء مواد بناء متينة تناسب المناخ الساحلي.'
        }
      }
    ]
  },
  {
    id: 'abha',
    title: { 
      en: 'Abha and Rijal Almaa', 
      ar: 'أبها ورجال ألمع' 
    },
    description: { 
      en: 'Journey to the mountainous Asir region to explore Abha and the historic village of Rijal Almaa, known for its striking multi-story stone and clay houses and rich cultural heritage.',
      ar: 'رحلة إلى منطقة عسير الجبلية لاستكشاف أبها وقرية رجال ألمع التاريخية، المعروفة بمنازلها الحجرية والطينية متعددة الطوابق المذهلة وتراثها الثقافي الغني.'
    },
    panoramaUrl: 'https://images.unsplash.com/photo-1600340432559-6a8716f4e9b8?q=80&w=1932&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600340432559-6a8716f4e9b8?q=80&w=1932&auto=format&fit=crop',
    audioNarration: undefined,
    vrEnabled: false,
    region: 'south',
    type: 'cultural',
    infoPoints: [
      {
        id: 'abha-architecture',
        position: {
          left: '40%',
          top: '50%'
        },
        title: { 
          en: 'Asiri Architecture', 
          ar: 'العمارة العسيرية' 
        },
        description: { 
          en: 'Distinctive for its colorful geometric patterns, the architecture of this region features stone houses with flat roofs and vibrant decorative elements that reflect local artistic traditions.',
          ar: 'مميزة بأنماطها الهندسية الملونة، تتميز عمارة هذه المنطقة بالمنازل الحجرية ذات الأسطح المسطحة والعناصر الزخرفية النابضة بالحياة التي تعكس التقاليد الفنية المحلية.'
        }
      },
      {
        id: 'abha-culture',
        position: {
          left: '65%',
          top: '30%'
        },
        title: { 
          en: 'Traditional Crafts', 
          ar: 'الحرف التقليدية' 
        },
        description: { 
          en: 'The region is known for its intricate handicrafts including colorful textiles, baskets, pottery and silverwork that have been passed down through generations.',
          ar: 'تشتهر المنطقة بحرفها اليدوية المعقدة بما في ذلك المنسوجات الملونة والسلال والفخار وأعمال الفضة التي تم تناقلها عبر الأجيال.'
        }
      }
    ]
  }
];
