# DevOps & CI/CD Strategy (Full Stack: React + Node + PG)

## 1. Kiến trúc Hệ thống (Architecture)
Hệ thống hoạt động theo mô hình **Decoupled (Tách rời)**:
-   **Frontend**: React.js (Vite) -> Build ra file tĩnh (HTML/CSS/JS) -> Phục vụ bởi **Nginx**.
-   **Backend**: Node.js API -> Chạy service riêng.
-   **Database**: PostgreSQL.

## 2. CI Pipeline (GitHub Actions)
Chia thành 2 luồng riêng biệt dựa trên thay đổi code.

### A. Frontend Pipeline (React)
-   **Trigger**: Thay đổi trong thư mục `/frontend` (nếu monorepo) hoặc repo riêng.
-   **Jobs**:
    1.  `lint`: ESLint + Prettier.
    2.  `build`: `yarn build` (Vite build) -> Kiểm tra xem có lỗi lúc build không.
    3.  `test`: Vitest (Unit test components/utils).

### B. Backend Pipeline (Node.js)
-   **Trigger**: Thay đổi trong thư mục `/backend`.
-   **Jobs**:
    1.  `lint`: ESLint.
    2.  `test`: Jest (Unit/Integration test).
    3.  `build`: (Optional nếu dùng TS) `tsc`.

## 3. CD Strategy (Containerization)
Sử dụng **Docker Compose** để điều phối các services.

### A. Frontend Dockerfile (Multi-stage)
*Mục tiêu: Dùng Nginx để phục vụ file tĩnh cực nhanh.*

```dockerfile
# Stage 1: Build
FROM node:20-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build # Output folder: dist

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### B. Backend Dockerfile
*Mục tiêu: Chạy Node.js server ổn định.*

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY . .
# Nếu dùng TypeScript thì thêm bước build ở đây
USER node
EXPOSE 4000
CMD ["node", "src/index.js"]
```

### C. Docker Compose (Orchestration)
File `docker-compose.yml` để chạy toàn bộ stack (Dev & Prod).

```yaml
version: '3.8'
services:
  # 1. Database
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: carhub
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # 2. Redis (Caching)
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  # 3. Backend API
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgres://user:password@postgres:5432/carhub
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
    ports:
      - "4000:4000"

  # 4. Frontend (React)
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  pgdata:
```

## 4. Quy trình Deploy (Production)
1.  **Push Code**: Developer push code lên nhánh `main`.
2.  **CI Auto-check**: GitHub Actions chạy Lint/Test.
3.  **Build Image**: Nếu CI pass, GitHub Actions build Docker Images -> Push lên Docker Hub.
    -   `carhub-frontend:latest`
    -   `carhub-backend:latest`
4.  **Update Server**: SSH vào VPS/Cloud, chạy `docker-compose pull && docker-compose up -d`.

## 5. Môi trường Dev (Local Development)
-   Dùng `docker-compose` để chạy phụ thuộc (Postgres, Redis).
-   Chạy Front/Back "trần" (native) ở ngoài để tận dụng Hot Reload:
    -   Front: `yarn dev` (Vite)
    -   Back: `yarn dev` (Nodemon/TS-Node)
