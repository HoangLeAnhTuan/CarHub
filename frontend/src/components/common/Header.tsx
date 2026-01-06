'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">CarHub</span>
        </Link>

        {/* Navigation (Placeholder) */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/cars" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Mua xe
          </Link>
          <Link href="/sell" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Bán xe
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Giới thiệu
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Đăng nhập
          </Button>
          <Button size="sm">
            Đăng tin
          </Button>
        </div>
      </div>
    </header>
  );
};
