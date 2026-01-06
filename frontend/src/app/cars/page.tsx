'use client';

import { Suspense, useState } from 'react';
import { FilterSidebar } from '@/features/car-listing/components/FilterSidebar';
import { CarGrid } from '@/features/car-listing/components/CarGrid';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List as ListIcon, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function CarListingPage() {
  const [isListView, setIsListView] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mua xe ô tô</h1>
          <p className="text-muted-foreground mt-1">
             Hiển thị <span className="font-medium text-foreground">124</span> kết quả phù hợp
          </p>
        </div>

        <div className="flex items-center gap-3">
           {/* Mobile Filter Trigger */}
           <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                   <SlidersHorizontal className="mr-2 h-4 w-4" /> Bộ lọc
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                 <div className="py-6">
                    <FilterSidebar />
                 </div>
              </SheetContent>
           </Sheet>
           
           {/* Sorting (Placeholder) */}
           <Button variant="outline" className="hidden sm:flex">
             Sắp xếp: Mới nhất
           </Button>

           {/* View Toggle */}
           <div className="flex items-center rounded-md border p-1">
              <Button 
                variant={!isListView ? 'secondary' : 'ghost'} 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setIsListView(false)}
              >
                 <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant={isListView ? 'secondary' : 'ghost'} 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setIsListView(true)}
              >
                 <ListIcon className="h-4 w-4" />
              </Button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden md:block">
           <Suspense fallback={<div>Loading filters...</div>}>
              <FilterSidebar />
           </Suspense>
        </aside>

        {/* Main Content */}
        <main>
           <CarGrid isListView={isListView} />
           
           {/* Pagination (Simple) */}
           <div className="mt-8 flex justify-center">
              <Button variant="outline" className="mx-auto">Xem thêm 20 xe khác</Button>
           </div>
        </main>
      </div>
    </div>
  );
}
