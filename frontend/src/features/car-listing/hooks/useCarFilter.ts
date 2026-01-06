'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

// Define filter interface
export interface CarFilters {
  brand?: string[];
  priceRange?: [number, number];
  fuelType?: string[];
  sort?: string;
  page?: number;
}

export const useCarFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create a query string from key-value
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      
      // Reset page to 1 when filtering changes (except when changing page itself)
      if (name !== 'page') params.delete('page');
      
      return params.toString();
    },
    [searchParams]
  );

    // Helpers to read state (with defaults)
    const filters: CarFilters = useMemo(() => ({
        brand: searchParams.get('brand')?.split(',').filter(Boolean) || [],
        priceRange: [
            Number(searchParams.get('minPrice')) || 0,
            Number(searchParams.get('maxPrice')) || 50000000000 // 5 billion default max
        ],
        fuelType: searchParams.get('fuelType')?.split(',').filter(Boolean) || [],
        sort: searchParams.get('sort') || 'newest',
        page: Number(searchParams.get('page')) || 1,
    }), [searchParams]);


  // Helper to update specific filter
  const setFilter = useCallback((key: keyof CarFilters | 'minPrice' | 'maxPrice', value: string | number | string[] | [number, number] | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === 'brand' || key === 'fuelType') {
        if (Array.isArray(value) && value.length > 0) {
            params.set(key, (value as string[]).join(','));
        } else {
            params.delete(key);
        }
    } else if (key === 'page') {
        params.set('page', String(value));
    } else if (key === 'sort') {
       params.set('sort', String(value));
    } else {
        // Handle single values (minPrice, maxPrice passed directly)
        if (value !== null && value !== undefined) {
           params.set(key as string, String(value));
        } else {
           params.delete(key as string);
        }
    }
    
    // Cleanup defaults
    if (key !== 'page') params.delete('page');

    router.push(pathname + '?' + params.toString(), { scroll: false });
  }, [pathname, router, searchParams]);

  return {
    filters,
    setFilter,
    createQueryString
  };
};
