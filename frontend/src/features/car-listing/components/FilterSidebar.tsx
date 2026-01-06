'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useCarFilter } from '../hooks/useCarFilter';

const BRANDS = ['VinFast', 'Toyota', 'Hyundai', 'Mercedes-Benz', 'BMW', 'Ford'];
const FUEL_TYPES = ['Xăng', 'Dầu', 'Điện (EV)', 'Hybrid'];

export const FilterSidebar = () => {
  const { filters, setFilter } = useCarFilter();

  const handleBrandChange = (brand: string) => {
    const currentBrands = filters.brand || [];
    let newBrands;
    if (currentBrands.includes(brand)) {
       newBrands = currentBrands.filter(b => b !== brand);
    } else {
       newBrands = [...currentBrands, brand];
    }
    setFilter('brand', newBrands);
  };

   const handleFuelChange = (fuel: string) => {
    const currentFuels = filters.fuelType || [];
    let newFuels;
    if (currentFuels.includes(fuel)) {
        newFuels = currentFuels.filter(f => f !== fuel);
    } else {
        newFuels = [...currentFuels, fuel];
    }
    setFilter('fuelType', newFuels);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Bộ lọc tìm kiếm</h3>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          Đặt lại
        </Button>
      </div>
      <Separator />

      <Accordion type="multiple" defaultValue={['price', 'brand']} className="w-full">
        {/* Price Ranger */}
        <AccordionItem value="price">
          <AccordionTrigger>Khoảng giá</AccordionTrigger>
          <AccordionContent className="pt-4 px-1">
             <Slider 
                defaultValue={[0, 100]} 
                max={100} 
                step={1} 
                className="mb-6"
                // Logic sync slider value to min/max price (simplified for demo)
                onValueChange={(_val) => {
                    // console.log(val)
                }}
             />
             <div className="flex items-center gap-2">
                 <div className="rounded border px-2 py-1 text-sm w-full">{'Min'}</div>
                 <span>-</span>
                 <div className="rounded border px-2 py-1 text-sm w-full">{'Max'}</div>
             </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brand">
          <AccordionTrigger>Hãng xe</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
               {BRANDS.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox 
                        id={`brand-${brand}`} 
                        checked={filters.brand?.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                    />
                    <label
                        htmlFor={`brand-${brand}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {brand}
                    </label>
                  </div>
               ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Fuel Type */}
        <AccordionItem value="fuel">
          <AccordionTrigger>Nhiên liệu</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
               {FUEL_TYPES.map((fuel) => (
                  <div key={fuel} className="flex items-center space-x-2">
                    <Checkbox 
                        id={`fuel-${fuel}`} 
                        checked={filters.fuelType?.includes(fuel)}
                        onCheckedChange={() => handleFuelChange(fuel)}
                    />
                    <label
                        htmlFor={`fuel-${fuel}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {fuel}
                    </label>
                  </div>
               ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
