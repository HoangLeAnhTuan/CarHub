# 🗄️ Database Schema & Architecture

> **Database System:** PostgreSQL 15+
> **ORM:** Prisma
> **Key Strategy:** Hybrid (Relational for core data + JSONB for flexible specs).

---

## 1. Entity Relationship Diagram (ERD Overview)

Hệ thống xoay quanh 3 thực thể chính:
1.  **Product Flow:** `Brand` -> `Model` -> `Car` -> `CarImage`.
2.  **User Flow:** `User` -> `Listing` (Seller) / `Appointment` (Buyer).
3.  **Interaction Flow:** `PriceAlert`, `Notification`.

---

## 2. Detailed Table Design

### `User` (Người dùng)
Lưu trữ thông tin chung cho cả người mua, người bán và admin.

| Column | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, default(uuid) | |
| `email` | String | Unique | Login credential |
| `password_hash` | String | | Bcrypt hash |
| `full_name` | String | | |
| `phone` | String | Optional | Contact for test drive |
| `role` | Enum | default('USER') | `USER`, `DEALER`, `ADMIN` |
| `avatar_url` | String | Optional | |
| `created_at` | DateTime | default(now()) | |

---

### `Brand` & `Model` (Danh mục xe)
Dùng để chuẩn hóa dữ liệu đầu vào, tránh việc user nhập "Mẹc", "Mercedes", "Mer" lung tung.

#### Table: `Brand`
| Column | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | Int | PK, Autoincrement | |
| `name` | String | Unique | e.g., "Toyota", "BMW" |
| `logo_url` | String | | |

#### Table: `Model`
| Column | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | Int | PK, Autoincrement | |
| `brand_id` | Int | FK -> Brand(id) | |
| `name` | String | | e.g., "Camry", "C-Class" |
| `body_type` | Enum | | `SEDAN`, `SUV`, `TRUCK`, `HATCHBACK`... |

---

### `Car` (Sản phẩm - Core Table)
Bảng quan trọng nhất. Sử dụng JSONB để chứa thông số kỹ thuật đa dạng.

| Column | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, default(uuid) | |
| `title` | String | | Tiêu đề tin đăng (SEO friendly) |
| `slug` | String | Unique, Indexed | URL friendly (e.g., toyota-camry-2020-abc) |
| `price` | BigInt | **Indexed** | Giá bán (VND) |
| `year` | Int | **Indexed** | Năm sản xuất |
| `odo` | Int | | Số Km đã đi (Odometer) |
| `description` | Text | | Mô tả chi tiết (HTML/Markdown) |
| **`specs`** | **JSONB** | **GIN Index** | (Xem cấu trúc bên dưới) |
| **`features`** | **JSONB** | **GIN Index** | Mảng các tiện nghi (Sunroof, ABS...) |
| `status` | Enum | default('ACTIVE') | `PENDING` (chờ duyệt), `ACTIVE`, `SOLD`, `HIDDEN` |
| `seller_id` | UUID | FK -> User(id) | |
| `model_id` | Int | FK -> Model(id) | |
| `city` | String | | Khu vực bán (Hà Nội, TP.HCM...) |
| `cover_image` | String | | Ảnh đại diện (Denormalized để load list nhanh) |
| `blur_hash` | String | | Chuỗi mã hóa ảnh mờ (UX Optimization) |
| `view_count` | Int | default(0) | Để sắp xếp "Phổ biến nhất" |
| `created_at` | DateTime | **Indexed** | default(now()) |

#### Cấu trúc JSONB `specs`:
Dùng JSONB cho phép ta lưu các trường đặc thù mà không cần sửa schema (Ví dụ: xe điện có `battery_capacity`, xe tải có `load_capacity`).

```json
{
  "color": "White",
  "fuel_type": "Gasoline", // Enum: Gasoline, Diesel, Hybrid, Electric
  "transmission": "Automatic", // Enum: Manual, Automatic, CVT
  "seats": 5,
  "drivetrain": "AWD", // FWD, RWD, AWD
  "engine_capacity": "2.5L"
}