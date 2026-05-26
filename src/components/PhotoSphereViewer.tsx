import { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';

interface PhotoSphereViewerProps {
  imageUrl: string;
  caption?: string;
  height?: string;
}

const PhotoSphereViewer = ({
  imageUrl,
  caption,
  height = '600px',
}: PhotoSphereViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: imageUrl,
      caption,
      loadingTxt: 'Loading panorama…',
      navbar: ['zoom', 'move', 'fullscreen'],
    });

    viewerRef.current = viewer;

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
  }, [imageUrl, caption]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className="w-full rounded-2xl overflow-hidden shadow-xl bg-black"
    />
  );
};

export default PhotoSphereViewer;
