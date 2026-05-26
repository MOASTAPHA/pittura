import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface HeritageMapSite {
  id: number;
  name: string;
  region: string;
  coords: [number, number];
}

interface HeritageMapProps {
  sites: HeritageMapSite[];
  selectedId?: number | null;
  onSelect?: (id: number) => void;
  isRTL?: boolean;
}

// Custom gold pin icon matching the Pittura palette
const pinIcon = L.divIcon({
  className: 'pittura-pin',
  html: `
    <div style="
      position: relative;
      width: 28px;
      height: 28px;
      transform: translate(-50%, -100%);
    ">
      <div style="
        width: 28px;
        height: 28px;
        background: radial-gradient(circle at 30% 30%, #E8C97A, #B8945F);
        border: 2px solid #FFFFFF;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 12px rgba(61,46,26,0.4);
      "></div>
      <div style="
        position: absolute;
        top: 8px;
        left: 8px;
        width: 12px;
        height: 12px;
        background: #FFFFFF;
        border-radius: 50%;
      "></div>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

function FlyToSelected({ sites, selectedId }: { sites: HeritageMapSite[]; selectedId?: number | null }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const site = sites.find((s) => s.id === selectedId);
    if (site) map.flyTo(site.coords, 9, { duration: 1.4 });
  }, [selectedId, sites, map]);
  return null;
}

const HeritageMap = ({ sites, selectedId, onSelect }: HeritageMapProps) => {
  return (
    <MapContainer
      center={[24.5, 44.5]}
      zoom={5.5}
      scrollWheelZoom
      zoomControl={false}
      className="w-full h-full"
      style={{ background: '#F5F0E8' }}
    >
      {/* Clean minimal Carto Positron tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {sites.map((site) => (
        <Marker
          key={site.id}
          position={site.coords}
          icon={pinIcon}
          eventHandlers={{ click: () => onSelect?.(site.id) }}
        >
          <Popup>
            <div style={{ fontFamily: 'inherit', textAlign: 'right', direction: 'rtl' }}>
              <strong style={{ color: '#3D2E1A' }}>{site.name}</strong>
              <div style={{ color: '#B8945F', fontSize: 12, marginTop: 4 }}>{site.region}</div>
            </div>
          </Popup>
        </Marker>
      ))}
      <FlyToSelected sites={sites} selectedId={selectedId} />
    </MapContainer>
  );
};

export default HeritageMap;
