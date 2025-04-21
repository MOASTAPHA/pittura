
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VrHeadset } from 'lucide-react';

export interface VirtualTourType {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  imageUrl: string;
  duration: number; // in minutes
  featured?: boolean;
}

interface VirtualTourCardProps {
  tour: VirtualTourType;
  isRTL?: boolean;
}

const VirtualTourCard = ({ tour, isRTL = false }: VirtualTourCardProps) => {
  return (
    <Link to={`/360-experience/${tour.id}`}>
      <Card className={`artifact-card hover:scale-[1.02] transition-transform ${isRTL ? 'rtl' : ''}`}>
        <div className="relative h-64 overflow-hidden">
          <img 
            src={tour.imageUrl}
            alt={isRTL ? tour.title.ar : tour.title.en}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
            <h3 className="text-white text-xl font-semibold">
              {isRTL ? tour.title.ar : tour.title.en}
            </h3>
          </div>
          {tour.featured && (
            <Badge className="absolute top-3 right-3 bg-primary text-white">
              {isRTL ? 'مميز' : 'Featured'}
            </Badge>
          )}
          <Badge variant="outline" className="absolute top-3 left-3 bg-black/50 text-white border-white/30 flex items-center gap-1">
            <VrHeadset className="h-3 w-3" />
            360°
          </Badge>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {isRTL ? tour.description.ar : tour.description.en}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {tour.duration} {isRTL ? 'دقيقة' : 'min'}
            </Badge>
            <span className="text-primary text-sm font-medium">
              {isRTL ? 'استكشف الآن' : 'Explore Now'}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VirtualTourCard;
