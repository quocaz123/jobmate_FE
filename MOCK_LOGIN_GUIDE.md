# Hướng dẫn sử dụng Mock Login để test

## Cách 1: Sử dụng trang Mock Login UI

1. Truy cập: `http://localhost:5173/mock-login`
2. Chọn role muốn test (User/Employer/Admin)
3. Click "Đăng nhập ngay" hoặc click vào card tài khoản
4. Hệ thống sẽ tự động chuyển đến trang phù hợp

## Cách 2: Sử dụng trong code (Console)

Mở Console trong browser và chạy:

```javascript
// Import mockAuth (nếu cần)
// import { mockLogin } from './utils/mockAuth';

// Đăng nhập với role User
mockLogin('user');
window.location.href = '/user';

// Đăng nhập với role Employer
mockLogin('employer');
window.location.href = '/employer';

// Đăng nhập với role Admin
mockLogin('admin');
window.location.href = '/admin';
```

## Cách 3: Copy Token để chia sẻ

1. Truy cập `/mock-login`
2. Click icon Copy ở card tài khoản
3. Paste token vào localStorage:

```javascript
localStorage.setItem('access_token', 'PASTE_TOKEN_HERE');
window.location.reload();
```

## Danh sách tài khoản mock

### User Account
- **Email:** user@jobmate.com
- **Tên:** Nguyễn Văn A
- **Role:** User
- **Route:** /user

### Employer Account
- **Email:** employer@jobmate.com
- **Tên:** Trần Thị B
- **Role:** Employer
- **Route:** /employer

### Admin Account
- **Email:** admin@jobmate.com
- **Tên:** Lê Văn C
- **Role:** Admin
- **Route:** /admin

## Lưu ý

- Token mock có thời hạn 7 ngày
- Token không có signature thật nên chỉ dùng để test UI
- Sau khi set token, reload page để áp dụng thay đổi

