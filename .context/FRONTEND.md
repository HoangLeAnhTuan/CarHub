# Quy định Cursor cho Frontend CarHub

Bạn là một Senior Frontend Engineer xuất sắc đang làm việc cho dự án **CarHub**, một sàn thương mại điện tử ô tô thông minh và hiệu suất cao.
Mục tiêu của bạn là xây dựng một ứng dụng có yếu tố "Wow" với mã nguồn sạch (Clean Code), dễ bảo trì và dễ kiểm thử.

## 1. Technology Stack & Tiêu chuẩn
- **Framework**: React 18+ (Ưu tiên Next.js App Router, nếu không thì dùng Vite).
- **Package Manager**: **Yarn** (Sử dụng `yarn start` để chạy dev server).
- **Language**: TypeScript (Strict mode) - **Bắt buộc dùng `.tsx`** cho components.
- **Styling**: Tailwind CSS.
    - Sử dụng `clsx` hoặc `tailwind-merge` để xử lý class name có điều kiện.
    - Tránh dùng inline styles.
- **UI Library**: Shadcn UI (Chính), Ant Design (Phụ - *chỉ dùng khi được yêu cầu cụ thể*).
- **State Management**:
    - **Server State**: TanStack Query (React Query) v5.
    - **Client Global State**: Zustand (dùng cho auth, theme, các UI state không cần lưu lâu dài).
    - **URL State**: **QUAN TRỌNG** - Các tham số bộ lọc (brand, price_min, price_max, sort, page) PHẢI được đồng bộ lên URL Search Params (`?brand=BMW&price_lte=500`). Đây là "Single Source of Truth" cho kết quả tìm kiếm.
- **Form Handling**: React Hook Form + Zod validation.
- **Icons**: Lucide React.
- **Date Handling**: date-fns.

## 2. Nguyên tắc Lập trình (Level Middle-Senior)
- **File Extensions**: Dùng `.tsx` cho mọi React Component. Dùng `.ts` cho các file logic thuần túy (utils, hooks, types).
- **Functional Components**: Dùng cú pháp `const Component = () => {}` với named exports.
- **Clean Code**:
    - **Early Returns**: Tránh lồng nhau (nesting) quá sâu.
    - **Single Responsibility**: Tách nhỏ các components quá lớn.
    - **Custom Hooks**: Tách logic ra các file `useHookName.ts`.
- **Performance**:
    - Sử dụng `React.memo`, `useMemo`, và `useCallback` hợp lý để tránh re-render không cần thiết, nhưng đừng tối ưu hóa sớm (premature optimization).
    - Áp dụng Code Splitting (Lazy loading) cho các route components.
    - Tối ưu hình ảnh dùng `next/image` hoặc tương đương.
- **Type Safety**:
    - KHÔNG dùng `any`. Dùng `unknown` hoặc định nghĩa types/interfaces rõ ràng.
    - Quy hoạch các types dùng chung vào `src/types` hoặc `src/interfaces`.
- **Quy tắc Đặt tên**:
    - Components: `PascalCase` (ví dụ: `CarListingCard.tsx`).
    - Functions/Variables: `camelCase` (ví dụ: `fetchCarDetails`).
    - Constants: `UPPER_SNAKE_CASE`.
    - Custom Hooks: `useCamelCase`.

## 3. Quy định Đặc thù Dự án (CarHub)

### A. Data & Visuals
- **Images (BlurHash)**:
    - LUÔN LUÔN kiểm tra trường `blurHash` trong object dữ liệu xe.
    - Phải hiển thị ảnh mờ (blurred placeholder) *ngay lập tức* trong khi ảnh chất lượng cao đang load.
    - Xem chi tiết implement trong `PROJECT_MASTER.md` -> Component `CarCard`.
- **JSONB Data**:
    - Xử lý `specs` (JSON object) và `features` (JSON array) một cách khéo léo.
    - Tạo các TypeScript interfaces ánh xạ đúng với DB schema (ví dụ: `CarSpecs`, `CarFeatures`).

### B. "Wow" Factors & UI
- **Responsive Design**: Tiếp cận theo hướng "Mobile-first". Đảm bảo giao diện hiển thị tốt từ Mobile -> Tablet -> Desktop.
- **Interactivity**:
    - Thêm hiệu ứng hover vào cards và buttons (`hover:scale-105`, `transition-all`).
    - Dùng skeletons cho trạng thái đang tải (Tuyệt đối không để màn hình trắng trơn).
- **Deal Score Badge**:
    - Hiển thị nhãn "Great Price" (Xanh), "Fair Price" (Xám), "High Price" (Đỏ) nổi bật dựa trên trường `deal_score` từ backend.

### C. Cấu trúc Thư mục (Feature-Based Chặt chẽ)
Chúng ta tuân thủ kiến trúc Feature-Based nghiêm ngặt. Mọi thứ liên quan đến một tính năng (feature) phải nằm gọn trong thư mục của tính năng đó.

```
src/
  app/ (hoặc pages/)      # Chỉ chứa Routes. Logic tối thiểu.
  components/             # Components GLOBAL dùng chung
    ui/                   # Design System chung (Shadcn - Button, Input, Card)
    common/               # Components chung của App (Header, Footer, LoadingSpinner)
    layout/               # Các wrapper layout (MainLayout, AuthLayout)
  features/               # Các nghiệp vụ (Business Domains)
    [feature-name]/       # ví dụ: 'car-listing', 'booking', 'auth'
      components/         # Components chỉ dành riêng cho feature này
        sub/              # (Tùy chọn) Các sub-components nhỏ hơn, chỉ dùng nội bộ feature
      hooks/              # Hooks riêng của feature
      api/                # API calls/services riêng của feature
      types/              # Types riêng của feature
      stores/             # Zustand slices riêng của feature
      index.ts            # Public API (Chỉ export những gì bên ngoài cần dùng)
  lib/                    # Tiện ích global (formatting, constants)
  hooks/                  # Hooks global (useTheme, useMediaQuery)
  stores/                 # Global stores (authStore)
  types/                  # Global types (User, Generic API Response)
```

### D. Cách tổ chức Component (Clean Index Pattern)
- **Quy tắc "Container/Presenter" hoặc "Clean Composition"**:
    - **Main Pages/Containers (`index.tsx` hoặc `page.tsx`)**: Đóng vai trò là *người điều phối* (conductor). Chúng **KHÔNG NÊN** chứa quá nhiều JSX phức tạp hay logic nghiệp vụ chi tiết.
    - **Trách nhiệm**: Gọi API (hoặc hooks), lấy dữ liệu và sắp xếp các *Child Components*.
    - **Child Components**: Mỗi phần logic của giao diện (Header, Filters, Grid, Pagination) PHẢI được tách thành component riêng biệt.

**BAD (Nên tránh):**
```tsx
// page.tsx
export default function CarPage() {
  return (
    <div className="p-4">
      <header className="flex justify-between...">
        <h1>Title</h1>
        <button>Search</button> {/* Lộ quá nhiều chi tiết ở đây */}
      </header>
      <div className="grid...">
        {/* Logic map dữ liệu trực tiếp trong page */}
        {cars.map(car => <div key={car.id}>{car.name}</div>)}
      </div>
    </div>
  )
}
```

**GOOD (Nên làm):**
```tsx
// page.tsx (Sạch, Dễ đọc, Mang tính khai báo)
import { CarHeader } from './components/CarHeader';
import { FilterSidebar } from './components/FilterSidebar';
import { CarGrid } from './components/CarGrid';
import { Pagination } from './components/Pagination';

export default function CarPage() {
  return (
    <PageContainer>
       <CarHeader />
       <div className="flex gap-4">
         <FilterSidebar />
         <div className="flex-1">
           <CarGrid />
           <Pagination />
         </div>
       </div>
    </PageContainer>
  )
}
```

## 4. Tài liệu & Kiểm thử
- **Docstrings**: Thêm comment JSDoc cho các logic phức tạp hoặc hàm utility.
- **Testing**: Viết unit tests cho các hàm utility (ví dụ: logic tính lãi suất vay) dùng Vitest/Jest.

## 5. Ví dụ

### Cấu trúc Component Chuẩn
```tsx
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Car } from '@/features/car-listing/types'; // Import từ feature
import { Badge } from '@/components/ui/badge';

interface CarCardProps {
  car: Car;
  className?: string;
}

export const CarCard = ({ car, className }: CarCardProps) => {
  const dealStatusColor = useMemo(() => {
    switch (car.dealScore) {
      case 'GREAT': return 'bg-green-500';
      case 'HIGH': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }, [car.dealScore]);

  return (
    <div className={cn("group rounded-lg border p-4 transition-all hover:shadow-lg", className)}>
       {/* Implement hiển thị ảnh với BlurHash */}
       <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
          {/* ... logic ảnh ... */}
       </div>
       
       <h3 className="mt-2 text-lg font-bold">{car.brand} {car.model}</h3>
       
       <Badge className={dealStatusColor}>{car.dealScore}</Badge>
    </div>
  );
};
```
