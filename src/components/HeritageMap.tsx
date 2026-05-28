import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon using lucide-react MapPin
const createCustomIcon = (isSelected: boolean) => {
  const color = isSelected ? '#B8945F' : '#3D2E1A';
  const size = isSelected ? 48 : 36;
  
  const iconHtml = ReactDOMServer.renderToString(
    <div className={`relative flex items-center justify-center transition-all ${isSelected ? 'animate-bounce' : ''}`} style={{ width: size, height: size }}>
      <MapPin color={color} fill={isSelected ? '#E8C97A' : 'white'} size={size} strokeWidth={2} />
      {isSelected && (
        <span className="absolute -z-10 w-4 h-4 bg-[#B8945F] rounded-full animate-ping opacity-75"></span>
      )}
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-icon',
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size],
  });
};

interface HeritageMapProps {
  sites: {
    id: string;
    name: string;
    region: string;
    coords: [number, number];
  }[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isRTL?: boolean;
}

// Component to handle map view updates when selection changes
const MapUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

const HeritageMap = ({ sites, selectedId, onSelect, isRTL = false }: HeritageMapProps) => {
  // Default center of Saudi Arabia
  const defaultCenter: [number, number] = [23.8859, 45.0792];
  
  const selectedSite = sites.find(s => s.id === selectedId);
  const center = selectedSite ? selectedSite.coords : defaultCenter;
  const zoom = selectedSite ? 12 : 6;

  return (
    <div className="w-full h-full relative" dir="ltr"> {/* Leaflet needs ltr */}
      <MapContainer 
        center={defaultCenter} 
        zoom={6} 
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <MapUpdater center={center} zoom={zoom} />

        {sites.map(site => (
          <Marker 
            key={site.id}
            position={site.coords}
            icon={createCustomIcon(selectedId === site.id)}
            eventHandlers={{
              click: () => onSelect(site.id)
            }}
          >
            <Popup className="custom-popup" closeButton={false}>
              <div className="text-center p-2" dir={isRTL ? 'rtl' : 'ltr'}>
                <p className="text-xs font-bold text-[#B8945F] mb-1">{site.region}</p>
                <h3 className="text-lg font-bold text-[#3D2E1A] m-0 font-playfair">{site.name}</h3>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Custom Styles for Leaflet */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container {
          background-color: #f4f1ea;
          font-family: inherit;
        }
        .custom-leaflet-icon {
          background: transparent;
          border: none;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          padding: 4px;
        }
        .leaflet-popup-tip {
          background: white;
        }
        .leaflet-container a.leaflet-popup-close-button {
          padding: 8px;
          color: #8B8B8B;
        }
        /* Hide map attribution slightly to clean up UI */
        .leaflet-control-attribution {
          background-color: rgba(255, 255, 255, 0.7) !important;
          font-size: 9px !important;
        }
      `}} />
    </div>
  );
};

export default HeritageMap;
