
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface ArtifactType {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  period: {
    en: string;
    ar: string;
  };
  imageUrl: string;
  category: {
    en: string;
    ar: string;
  };
  featured?: boolean;
}

interface ArtifactCardProps {
  artifact: ArtifactType;
  isRTL?: boolean;
}

const ArtifactCard = ({ artifact, isRTL = false }: ArtifactCardProps) => {
  return (
    <Link to={`/artifact/${artifact.id}`}>
      <Card className={`artifact-card hover:scale-[1.02] transition-transform ${isRTL ? 'rtl' : ''}`}>
        <div className="relative h-64 overflow-hidden">
          <img 
            src={artifact.imageUrl}
            alt={isRTL ? artifact.title.ar : artifact.title.en}
            className="w-full h-full object-cover"
          />
          {artifact.featured && (
            <Badge className="absolute top-3 right-3 bg-primary text-white">
              {isRTL ? 'مميز' : 'Featured'}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-1">
            {isRTL ? artifact.title.ar : artifact.title.en}
          </h3>
          <p className="text-muted-foreground text-sm mb-2">
            {isRTL ? artifact.period.ar : artifact.period.en}
          </p>
          <Badge variant="outline" className="text-xs">
            {isRTL ? artifact.category.ar : artifact.category.en}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArtifactCard;
