import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PhotoSphereViewer from '@/components/PhotoSphereViewer';
import { Button } from '@/components/ui/button';

const SAMPLE_PANORAMA =
  'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg';

const LocationPanorama = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf6ed] to-[#eff0ee]">
      <Navigation />
      <main className="museum-container py-10">
        <Link to="/">
          <Button variant="outline" size="sm" className="mb-6 rounded-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#bba269] via-[#b0dbff] to-[#b07cf3] bg-clip-text text-transparent">
            AlUla — 360° Panorama
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Explore an immersive 360° view of an ancient heritage landscape.
            Click and drag to look around, scroll to zoom, and use the controls
            below to enter fullscreen.
          </p>
        </header>

        <PhotoSphereViewer
          imageUrl={SAMPLE_PANORAMA}
          caption="AlUla heritage panorama"
        />
      </main>
      <Footer />
    </div>
  );
};

export default LocationPanorama;
