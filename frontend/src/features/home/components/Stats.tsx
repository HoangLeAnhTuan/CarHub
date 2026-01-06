'use client';

export const Stats = () => {
    return (
      <section className="py-20 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary">15k+</div>
              <div className="text-sm font-medium text-muted-foreground">Xe đã giao dịch</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary">98%</div>
              <div className="text-sm font-medium text-muted-foreground">Khách hàng hài lòng</div>
            </div>
            <div className="space-y-2">
               <div className="text-4xl font-extrabold text-primary">24h</div>
               <div className="text-sm font-medium text-muted-foreground">Thời gian bán trung bình</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary">63</div>
              <div className="text-sm font-medium text-muted-foreground">Tỉnh thành phủ sóng</div>
            </div>
          </div>
        </div>
      </section>
    );
  };
