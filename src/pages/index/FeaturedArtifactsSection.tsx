
import { motion } from 'framer-motion';
import ArtifactViewer3D from '@/components/ArtifactViewer3D';
import { Button } from '@/components/ui/button';

const MODEL_URLS = {
  ANTIQUE_CAMERA: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF/AntiqueCamera.gltf",
};

interface Props {
  isRTL: boolean;
}

const FeaturedArtifactsSection = ({ isRTL }: Props) => (
  <section className="bg-gradient-to-b from-black to-museum-blue/30 py-20 text-white">
    <div className="museum-container">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          {isRTL ? 'اكتشف القطع الأثرية المميزة' : 'Discover Featured Artifacts'}
        </h2>
        <p className="text-lg text-white/70 max-w-3xl mx-auto">
          {isRTL 
            ? 'استكشف مجموعتنا من القطع الأثرية النادرة والتاريخية. يمكنك تدوير وتكبير القطع بتقنية ثلاثية الأبعاد.'
            : 'Explore our collection of rare and historic artifacts. You can rotate and zoom the pieces in 3D.'}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ArtifactViewer3D 
            modelUrl={MODEL_URLS.ANTIQUE_CAMERA}
            title={isRTL ? "إناء نبطي من العلا" : "Nabataean Vessel from Al-Ula"}
            description={isRTL 
              ? "إناء فخاري يعود تاريخه للقرن الأول الميلادي، ويعكس مهارة الحرفيين النبطيين في صناعة الفخار."
              : "A ceramic vessel dating back to the 1st century CE, reflecting the craftsmanship of Nabataean potters."
            }
            isRTL={isRTL}
            fallbackImageUrl="https://images.unsplash.com/photo-1618944912177-16c67b7c2ada?q=80&w=2574&auto=format&fit=crop"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <div className="bg-museum-brown/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full">
            <h3 className="text-2xl font-bold mb-4">
              {isRTL ? "تاريخ الفن النبطي" : "History of Nabataean Art"}
            </h3>
            <p className="mb-4">
              {isRTL 
                ? "الأنباط، وهم حضارة عربية قديمة ازدهرت في شمال غرب شبه الجزيرة العربية من القرن الرابع قبل الميلاد حتى القرن الأول الميلادي، كانوا معروفين بإنجازاتهم المعمارية والفنية الاستثنائية."
                : "The Nabataeans, an ancient Arab civilization that flourished in northwest Arabia from the 4th century BCE to the 1st century CE, were known for their exceptional architectural and artistic achievements."
              }
            </p>
            <p className="mb-6">
              {isRTL 
                ? "تتميز الحرف اليدوية النبطية بتأثيرات من الفن المصري واليوناني والروماني، لكنها تحتفظ بأسلوب مميز خاص بها. كانت الزخارف النباتية والهندسية شائعة، إلى جانب التصوير الواقعي للحيوانات والأشخاص."
                : "Nabataean craftsmanship features influences from Egyptian, Greek, and Roman art, yet maintains a distinctive style of its own. Floral and geometric decorations were common, alongside realistic portrayals of animals and people."
              }
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-museum-olive hover:bg-museum-olive/90">
                {isRTL ? "استكشف المزيد" : "Explore More"}
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                {isRTL ? "مشاهدة الأعمال الفنية" : "View Artworks"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default FeaturedArtifactsSection;
