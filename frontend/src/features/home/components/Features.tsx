'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BrainCircuit, Wallet } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-blue-400" />,
    title: 'AI Định Giá Chuẩn Xác',
    description: 'Công nghệ AI phân tích hàng triệu dữ liệu để đưa ra mức giá công bằng nhất cho cả người mua và bán.',
    className: 'lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-green-400" />,
    title: 'Minh Bạch Tuyệt Đối',
    description: 'Lịch sử xe, tình trạng pháp lý được xác thực. Không lo xe đâm đụng, thủy kích.',
    className: 'bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20',
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-400" />,
    title: 'Giao Dịch Siêu Tốc',
    description: 'Thủ tục giấy tờ, sang tên đổi chủ được hỗ trợ trọn gói A-Z.',
    className: 'bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20',
  },
  {
    icon: <Wallet className="h-8 w-8 text-purple-400" />,
    title: 'Tài Chính Linh Hoạt',
    description: 'Hỗ trợ trả góp lãi suất thấp, duyệt hồ sơ online trong 5 phút.',
    className: 'lg:col-span-2 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20',
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Tại sao chọn CarHub?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi không chỉ bán xe, chúng tôi mang đến trải nghiệm mua sắm an tâm và đẳng cấp công nghệ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-3xl border p-8 flex flex-col justify-between hover:shadow-lg transition-shadow ${feature.className}`}
            >
              <div className="mb-6 bg-background/50 w-fit p-3 rounded-2xl backdrop-blur-sm">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
