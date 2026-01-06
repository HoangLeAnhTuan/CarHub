import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MainLayout } from '@/components/layout/MainLayout';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CarHub - Sàn mua bán ô tô thông minh',
  description: 'Nền tảng mua bán ô tô với công nghệ AI và dữ liệu lớn.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
