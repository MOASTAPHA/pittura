import { useState, useEffect } from 'react';
import { X, Loader2, Maximize, Minimize } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SkyboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  skyboxUrl: string;
  locationTitle: string;
}

const SkyboxModal = ({ isOpen, onClose, skyboxUrl, locationTitle }: SkyboxModalProps) => {
  const { isRTL } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const toggleFullscreen = () => {
    const el = document.getElementById('skybox-modal-container');
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="skybox-modal-container"
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in" />

      {/* Modal content */}
      <div className="relative w-full h-full max-w-[100vw] max-h-[100vh] flex flex-col">
        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#E8C97A] animate-pulse" />
            <h3 className="text-white font-semibold text-lg truncate max-w-[50vw]">
              {locationTitle}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label={isRTL ? 'إغلاق' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Iframe container */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1510] z-10">
              <Loader2 className="w-12 h-12 text-[#E8C97A] animate-spin mb-4" />
              <p className="text-white/70 text-sm">
                {isRTL ? 'جارٍ تحميل التجربة الغامرة...' : 'Loading immersive experience...'}
              </p>
            </div>
          )}
          <iframe
            src={skyboxUrl}
            className="w-full h-full border-0"
            allow="fullscreen; gyroscope; accelerometer"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            title={locationTitle}
            style={{ background: '#1a1510' }}
          />
        </div>

        {/* Bottom hint */}
        <div className="relative z-10 flex items-center justify-center px-6 py-3 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white/50 text-xs">
            {isRTL
              ? 'اسحب للتحرك • استخدم عجلة الفأرة للتكبير • اضغط ESC للإغلاق'
              : 'Drag to look around • Scroll to zoom • Press ESC to close'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkyboxModal;
