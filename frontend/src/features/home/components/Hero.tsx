'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 pt-28 lg:py-32">
       {/* Background Elements */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[100px]" />
       </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Tìm chiếc xe <br className="hidden sm:block" />
            <span className="text-primary">Mơ ước</span> của bạn
            </h1>
        </motion.div>
        
        <motion.p 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          CarHub - Nền tảng mua bán ô tô thông minh, minh bạch và tin cậy. 
          Công nghệ AI giúp bạn định giá chính xác và tìm được deal hời nhất.
        </motion.p>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.4 }}
           className="flex justify-center gap-4"
        >
          <Button size="lg" asChild className="h-12 px-8 text-lg shadow-lg shadow-primary/20">
            <Link href="/cars">Xem tất cả xe</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
             Đăng tin bán xe
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
