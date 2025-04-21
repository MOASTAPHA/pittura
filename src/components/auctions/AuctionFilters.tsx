
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

interface AuctionFiltersProps {
  isRTL: boolean;
}

const AuctionFilters = ({ isRTL }: AuctionFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  
  const eras = [
    { id: 'nabatean', label: isRTL ? 'الحضارة النبطية' : 'Nabatean' },
    { id: 'islamic', label: isRTL ? 'العصر الإسلامي' : 'Islamic' },
    { id: 'pre-saudi', label: isRTL ? 'ما قبل المملكة' : 'Pre-Saudi' },
    { id: 'modern', label: isRTL ? 'العصر الحديث' : 'Modern' },
  ];
  
  const types = [
    { id: 'pottery', label: isRTL ? 'الفخار' : 'Pottery' },
    { id: 'jewelry', label: isRTL ? 'المجوهرات' : 'Jewelry' },
    { id: 'coins', label: isRTL ? 'العملات' : 'Coins' },
    { id: 'textiles', label: isRTL ? 'المنسوجات' : 'Textiles' },
    { id: 'manuscripts', label: isRTL ? 'المخطوطات' : 'Manuscripts' },
  ];
  
  const regions = [
    { id: 'najd', label: isRTL ? 'نجد' : 'Najd' },
    { id: 'hijaz', label: isRTL ? 'الحجاز' : 'Hijaz' },
    { id: 'asir', label: isRTL ? 'عسير' : 'Asir' },
    { id: 'eastern', label: isRTL ? 'المنطقة الشرقية' : 'Eastern Province' },
  ];
  
  return (
    <div className="bg-background rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold mb-6">
        {isRTL ? 'تصفية النتائج' : 'Filter Results'}
      </h2>
      
      <Accordion type="multiple" defaultValue={['era', 'type', 'region', 'price']} className="space-y-4">
        <AccordionItem value="era">
          <AccordionTrigger className="text-lg font-medium">
            {isRTL ? 'العصر' : 'Era'}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {eras.map((era) => (
                <div key={era.id} className="flex items-center space-x-2">
                  <Checkbox id={`era-${era.id}`} />
                  <Label htmlFor={`era-${era.id}`} className="text-sm cursor-pointer">
                    {era.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="type">
          <AccordionTrigger className="text-lg font-medium">
            {isRTL ? 'النوع' : 'Type'}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {types.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox id={`type-${type.id}`} />
                  <Label htmlFor={`type-${type.id}`} className="text-sm cursor-pointer">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="region">
          <AccordionTrigger className="text-lg font-medium">
            {isRTL ? 'المنطقة' : 'Region'}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {regions.map((region) => (
                <div key={region.id} className="flex items-center space-x-2">
                  <Checkbox id={`region-${region.id}`} />
                  <Label htmlFor={`region-${region.id}`} className="text-sm cursor-pointer">
                    {region.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-medium">
            {isRTL ? 'السعر' : 'Price'}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 pt-2">
              <Slider
                defaultValue={[0, 10000]}
                max={10000}
                step={100}
                onValueChange={(value) => setPriceRange(value as number[])}
              />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="min-price" className="text-xs">Min</Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-24 mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="max-price" className="text-xs">Max</Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-24 mt-1"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AuctionFilters;
