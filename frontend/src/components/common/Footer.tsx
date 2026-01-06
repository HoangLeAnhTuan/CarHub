export const Footer = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto py-8 px-4 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">CarHub</h3>
            <p className="text-sm text-muted-foreground">
              Nền tảng mua bán ô tô thông minh, uy tín hàng đầu Việt Nam.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Xe cũ</a></li>
              <li><a href="#" className="hover:text-foreground">Xe mới</a></li>
              <li><a href="#" className="hover:text-foreground">Định giá xe</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-foreground">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-foreground">Điều khoản sử dụng</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Liên hệ</h4>
             <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Hotline: 1900 xxxx</li>
              <li>Email: support@carhub.vn</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CarHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
