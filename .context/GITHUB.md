# GitHub Guide for CarHub

Tài liệu này hướng dẫn cách thiết lập và làm việc với GitHub repository cho dự án **CarHub**.

## 1. Khởi tạo Repository (Setup)

Đây là các lệnh để đẩy code local hiện tại lên GitHub repo `HoangLeAnhTuan/CarHub`.

```bash
# 1. Tạo file README (nếu chưa có)
echo "# CarHub" >> README.md

# 2. Khởi tạo Git repo
git init

# 3. Add file và commit đầu tiên
git add .
git commit -m "chore: initial commit"

# 4. Đổi tên nhánh chính thành 'main' (chuẩn mới thay vì master)
git branch -M main

# 5. Link tới Remote Repository và Push
git remote add origin https://github.com/HoangLeAnhTuan/CarHub.git
git push -u origin main
```

## 2. Chiến lược Nhánh (Branching Strategy)

Chúng ta sử dụng mô hình **Git Flow** đơn giản hóa.

-   **`main`**: Nhánh Production. Code ở đây phải luôn chạy được (Stable). Chỉ merge từ `dev` hoặc Hotfix.
-   **`dev`** (hoặc `develop`): Nhánh phát triển chính. Code của các thành viên sẽ được merge vào đây.
-   **`feature/[tên-tính-năng]`**: Nhánh tính năng riêng lẻ.
    -   Ví dụ: `feature/auth-login`, `feature/car-listing-ui`.
    -   Tạo ra từ `dev`, merge lại vào `dev`.
-   **`hotfix/[tên-lỗi]`**: Fix lỗi gấp trên Prod.
    -   Ví dụ: `hotfix/fix-login-error`.

### Workflow ví dụ:

1.  **Bắt đầu làm tính năng mới**:
    ```bash
    git checkout dev
    git pull origin dev # Lấy code mới nhất về
    git checkout -b feature/search-filter # Tạo nhánh mới
    ```
2.  **Commit Code** (Tuân thủ Conventional Commits):
    ```bash
    git add .
    git commit -m "feat: add search input component"
    ```
3.  **Push lên GitHub**:
    ```bash
    git push origin feature/search-filter
    ```
4.  **Tạo Pull Request (PR)**:
    -   Vào GitHub -> Tab "Pull requests" -> "New pull request".
    -   Chọn Base: `dev`, Compare: `feature/search-filter`.
    -   Reviewers sẽ kiểm tra code -> Merge.

## 3. GitHub Actions (CI Setup)

Chúng ta sẽ thiết lập Workflow tự động kiểm tra code mỗi khi có PR.

### Tạo file Workflow: `.github/workflows/ci.yml`

```yaml
name: CI Frontend

on:
  push:
    branches: [ "main", "dev" ]
  pull_request:
    branches: [ "main", "dev" ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'yarn' # Cache dependencies để chạy nhanh hơn

    - name: Install Dependencies
      run: yarn install --frozen-lockfile

    - name: Lint Check
      run: yarn lint
      
    # - name: Run Test (Bỏ comment khi đã có test)
    #   run: yarn test

    - name: Build Check
      run: yarn build
```

## 4. Bảo vệ Nhánh (Branch Protection)

Vào **Settings -> Branches -> Add rule** cho nhánh `main` và `dev`:
1.  **Require verify commits**: Check.
2.  **Require status checks to pass before merging**: Chọn "build-and-test" (Job CI ở trên).
3.  **Require pull request reviews before merging**: Bật (1 reviewer).

Điều này đảm bảo không ai có thể push thẳng code lỗi vào nhánh chính mà không qua kiểm duyệt.
