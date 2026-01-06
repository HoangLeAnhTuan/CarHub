# CarHub - Project Master Document

> **Version:** 2.0.0 (Enhanced)
> **Type:** Intelligent Automotive Marketplace
> **Core Value:** Data-Rich, High Performance, and AI-Enhanced Experience.

---

## 1. Project Vision & Goals

**CarHub** không chỉ là nơi đăng bán xe, mà là một nền tảng thông minh giúp người mua tìm được chiếc xe "hời" nhất và người bán đăng tin dễ dàng nhất.

### Mục tiêu chính (Key Objectives):
1.  **Deep Data & Visuals:** Hiển thị thông số kỹ thuật chi tiết (JSONB) và trải nghiệm hình ảnh mượt mà (BlurHash).
2.  **High-Performance Search:** Tìm kiếm/Lọc đa chiều cực nhanh (Redis Caching + Indexing).
3.  **Smart Insights:** Hệ thống tự động phân tích giá (Deal Score) và gợi ý xe (Recommendation).
4.  **User Interaction:** Tương tác thực tế qua Đặt lịch lái thử (Booking) và Săn giá rẻ (Price Alerts).

---

## 2. Business Domain & Terminology

AI và Dev cần nắm rõ các thuật ngữ sau:

* **Listing (Tin đăng):** Sản phẩm xe đang bán.
* **Specs (Thông số tĩnh):** Dữ liệu cứng (Year, ODO, Transmission, Fuel, Body Type). Lưu trong `JSONB`.
* **Features (Tiện nghi):** List các option (Sunroof, HUD, Leather Seats). Lưu mảng trong `JSONB`.
* **Deal Score (Định giá):** Nhãn đánh giá giá trị xe (`Great Price`, `Fair Price`, `High Price`) dựa trên thuật toán so sánh thị trường.
* **BlurHash:** Chuỗi ký tự đại diện cho hình ảnh mờ, dùng để hiển thị trước khi ảnh thật load xong.

---

## 3. User Personas & Flows

### Guest / Buyer (Người mua)
* **Search Flow:** Lọc xe theo Hãng/Giá/Màu -> Xem danh sách -> Thấy nhãn "Great Deal" -> Click xem chi tiết.
* **Interaction Flow:**
    * Thấy xe đẹp nhưng giá cao -> Bấm "Báo khi giảm giá".
    * Ưng ý -> Bấm "Đặt lịch lái thử".

### Seller / Dealer (Người bán)
* **Posting Flow:** Nhập thông tin xe -> Bấm "AI Generate Description" để tạo nội dung quảng cáo -> Đăng tin.
* **Management Flow:** Nhận yêu cầu lái thử -> Xác nhận/Từ chối lịch.

---

## 4. Feature Roadmap (4-Week Timeline)

### Week 1: Foundation & Data Structure (The Skeleton)
*Mục tiêu: Dựng DB chuẩn, hiện được xe lên màn hình, upload ảnh "xịn".*
1.  **Database:** Thiết kế Schema `Cars` (kèm JSONB specs), `Brands`, `Models`.
2.  **Image System:**
    * Backend: Upload ảnh lên Cloud, generate chuỗi **BlurHash**.
    * Frontend: Component `CarCard` hiển thị BlurHash khi đang loading.
3.  **Basic Display:** Trang chủ (Grid View), Trang chi tiết (Specs Table).
4.  **Seed Data:** Script tạo 50 xe mẫu với dữ liệu JSONB phong phú.

### Week 2: Advanced Search & Performance (The Brain)
*Mục tiêu: Tìm kiếm cực nhanh và thông minh.*
1.  **Advanced Filtering:** Sidebar lọc theo Price Range, Brand, Year, Fuel Type.
2.  **URL Sync:** Đồng bộ filter lên URL (`?brand=BMW&price_lte=2000`).
3.  **Redis Caching:** Cache các API tĩnh (`/brands`, `/models`) và kết quả tìm kiếm phổ biến.
4.  **Recommendation Engine:** Tại trang chi tiết, hiển thị "Xe tương tự" (Cùng tầm giá hoặc cùng dòng).

### Week 3: Intelligence & AI Features (The "Wow" Factor)
*Mục tiêu: Thêm các tính năng thông minh để ghi điểm Middle-level.*
1.  **Deal Score Algorithm:** Backend tính toán giá trung bình thị trường -> Gán nhãn Great/Good/High Price cho từng xe.
2.  **AI Description Generator:** Tích hợp OpenAI/Gemini API. Người bán nhập thông số -> AI viết văn mẫu.
3.  **Loan Calculator:** Tool tính lãi suất vay ở Frontend.

### Week 4: Interactions & Polish (The Soul)
*Mục tiêu: Biến web tĩnh thành web động.*
1.  **Booking System (Test Drive):**
    * DB: Bảng `Appointments`.
    * UI: Chọn ngày/giờ, chặn giờ đã đặt.
2.  **Price Alert:** Người dùng đăng ký nhận tin khi giá xe giảm.
3.  **Notification UI:** Thông báo nhỏ trên Menu khi có update.
4.  **Polish:** Skeleton Loading, 404 Pages, Responsive Mobile.

---

## 5. Technical Strategy & Constraints

### Database (Postgres + Prisma)
* **JSONB Strategy:**
    * `specs`: `{ "color": "Red", "engine": "V8", "seats": 5 }`
    * `features`: `["Sunroof", "ABS", "Cruise Control"]`
* **Indexing:** Đánh index cho `specs->>'color'`, `price`, `model_id`.

### Performance (Redis)
* **Strategy:** Cache-Aside.
* **TTL:** Brands/Models (24h), Listings (5-10 mins).

### AI Integration
* **Description:** Dùng Prompt đơn giản: *"Write a sales description for a [Year] [Brand] [Model] with features: [List]. Tone: Professional."*

---

## 6. Detailed Logic for "Wow" Features

### A. Deal Score Logic (Backend Service)
1.  Input: `current_car` (Price: 800tr, Model: Camry, Year: 2020).
2.  Query: Lấy `AVG(price)` của tất cả xe Camry 2020 trong DB.
3.  Compare:
    * Price < AVG * 0.95 -> **Great Deal** (Xanh lá).
    * Price > AVG * 1.05 -> **High Price** (Đỏ).
    * Còn lại -> **Fair Deal** (Xám).

### B. Test Drive Booking (Concurrency)
* **Constraint:** Một chiếc xe không thể có 2 người lái thử cùng 1 giờ.
* **Query:** `SELECT * FROM appointments WHERE car_id = $1 AND date = $2`. Nếu tồn tại -> Reject.

---

## 7. Team Responsibilities

### Member A (Frontend Lead + DB Architect)
* **Focus:** UI/UX, Component Library (Shadcn), URL State Management.
* **Key Tasks:**
    * Design DB Schema & Indexing strategy.
    * Implement BlurHash Image Component.
    * Build Filter Logic & Deal Score Badge UI.
    * Booking Calendar UI.

### Member B (Backend Lead + DevOps)
* **Focus:** API Logic, Performance, Third-party Integration.
* **Key Tasks:**
    * Redis Middleware setup.
    * Dynamic Query Builder (cho Filter JSONB).
    * AI API Integration & Deal Score Calculation Service.
    * Docker environment setup.

---