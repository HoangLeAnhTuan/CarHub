import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Fuel, Gauge, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarGridProps {
    className?: string;
    isListView?: boolean;
}

export const CarGrid = ({ className, isListView = false }: CarGridProps) => {
  return (
    <section className={cn("py-6 bg-background", className)}>
       {/* List of Cars */}
        <div className={cn(
            "grid gap-6",
            isListView ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className={cn(
                 "group rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg overflow-hidden flex",
                 isListView ? "flex-row h-48" : "flex-col"
             )}>
                {/* Image Placeholder */}
                <div className={cn(
                    "relative bg-muted overflow-hidden flex-shrink-0",
                    isListView ? "w-72 h-full" : "aspect-[16/10] w-full"
                )}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white font-medium text-sm">Xem chi tiết</span>
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-4 flex flex-1 flex-col justify-between">
                   <div>
                      <div className="flex justify-between items-start">
                         <Badge variant="secondary" className="mb-2">VinFast</Badge>
                         {/* Deal Score Badge (Placeholder) */}
                         <Badge className="bg-green-500 hover:bg-green-600">Great Deal</Badge>
                      </div>
                      <Link href={`/cars/${i}`} className="block">
                         <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                             VinFast VF 8 Plus Eco - 2024
                         </h3>
                      </Link>
                   </div>
                   
                   <div className={cn(
                       "grid gap-2 text-xs text-muted-foreground my-3",
                       isListView ? "grid-cols-4" : "grid-cols-3"
                   )}>
                      <div className="flex items-center gap-1"><Gauge className="h-3 w-3" /> 12km</div>
                      <div className="flex items-center gap-1"><Settings2 className="h-3 w-3" /> Auto</div>
                      <div className="flex items-center gap-1"><Fuel className="h-3 w-3" /> Electric</div>
                      {isListView && <div className="flex items-center gap-1">HCM</div>}
                   </div>

                   <div className="pt-3 border-t flex items-center justify-between mt-auto">
                      <div>
                          <span className="font-bold text-lg text-primary block">1.2 tỷ</span>
                          <span className="text-xs text-muted-foreground line-through">1.4 tỷ</span>
                      </div>
                      <Button size="sm" variant="outline">Liên hệ</Button>
                   </div>
                </div>
             </div>
          ))}
        </div>
    </section>
  );
};
