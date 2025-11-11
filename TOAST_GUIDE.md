# Toast Notification - Hướng Dẫn Sử Dụng

## Cài đặt
Toast đã được tích hợp sẵn trong dự án với `react-hot-toast`.

## Cách sử dụng

### 1. Import
```javascript
import { showSuccess, showError, showInfo, showWarning, showLoading, dismissLoading } from '../utils/toast';
```

### 2. Các loại toast cơ bản

#### Success (Thành công)
```javascript
showSuccess('Đăng nhập thành công!');
showSuccess('Đã lưu thông tin', { duration: 5000 });
```

#### Error (Lỗi)
```javascript
showError('Có lỗi xảy ra!');
showError('Email hoặc mật khẩu không đúng', { duration: 4000 });
```

#### Info (Thông tin)
```javascript
showInfo('Đang tải dữ liệu...');
showInfo('Bạn có 3 thông báo mới');
```

#### Warning (Cảnh báo)
```javascript
showWarning('Vui lòng kiểm tra lại thông tin');
showWarning('Session sắp hết hạn');
```

### 3. Loading Toast
```javascript
// Hiển thị loading
const loadingToast = showLoading('Đang xử lý...');

// Sau khi xong việc, dismiss
dismissLoading(loadingToast);
```

### 4. Promise Toast (Tự động)
```javascript
import { showPromise } from '../utils/toast';

const myPromise = fetch('/api/data');

showPromise(myPromise, {
  loading: 'Đang tải...',
  success: 'Tải thành công!',
  error: 'Tải thất bại!'
});
```

## Ví dụ thực tế

### Login Form
```javascript
const handleLogin = async () => {
  const loadingToast = showLoading('Đang đăng nhập...');
  
  try {
    const response = await loginAPI(email, password);
    dismissLoading(loadingToast);
    showSuccess('Đăng nhập thành công!');
    navigate('/dashboard');
  } catch (error) {
    dismissLoading(loadingToast);
    showError(error.message || 'Đăng nhập thất bại');
  }
};
```

### Delete Action
```javascript
const handleDelete = async (id) => {
  const loadingToast = showLoading('Đang xóa...');
  
  try {
    await deleteAPI(id);
    dismissLoading(loadingToast);
    showSuccess('Xóa thành công!');
    refreshData();
  } catch (error) {
    dismissLoading(loadingToast);
    showError('Không thể xóa. Vui lòng thử lại!');
  }
};
```

### Form Validation
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!email) {
    showWarning('Vui lòng nhập email');
    return;
  }
  
  if (password.length < 8) {
    showError('Mật khẩu phải có ít nhất 8 ký tự');
    return;
  }
  
  // Submit form...
};
```

## Tùy chỉnh

### Duration (Thời gian hiển thị)
```javascript
showSuccess('Message', { duration: 5000 }); // 5 giây
```

### Position
Toast mặc định hiển thị ở `top-right`. Để thay đổi, sửa trong `App.jsx`:
```javascript
<Toaster position="top-center" />
// Các vị trí: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
```

### Custom Style
```javascript
showSuccess('Message', {
  style: {
    background: '#4f46e5',
    color: '#fff',
  }
});
```

## Best Practices

1. **Luôn dismiss loading toast** sau khi API call hoàn thành
2. **Dùng message ngắn gọn**, dễ hiểu
3. **Success message** nên tích cực, khuyến khích
4. **Error message** nên rõ ràng và gợi ý cách fix
5. **Không spam toast** - tránh hiển thị quá nhiều cùng lúc

## Files đã tích hợp toast
- ✅ `SetPasswordPage.jsx` - Tạo mật khẩu
- 🔜 `LoginPage.jsx` - Đăng nhập
- 🔜 `SignUp.jsx` - Đăng ký
- 🔜 `Profile.jsx` - Cập nhật profile
- 🔜 Các API calls khác

## Tài liệu
- [React Hot Toast Documentation](https://react-hot-toast.com/)
