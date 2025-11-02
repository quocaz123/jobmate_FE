/**
 * Helper để sử dụng mock login trong Console Browser
 * Tự động load khi app chạy (chỉ trong dev mode)
 */

import { mockLogin, mockAccounts, createMockToken } from './mockAuth';
import { setToken } from '../services/localStorageService';

// Export global để dùng trong console
const initMockAuth = () => {
    if (typeof window === 'undefined') return;

    window.mockAuth = {
        // Đăng nhập nhanh
        loginAsUser: () => {
            mockLogin('user');
            setTimeout(() => {
                window.location.href = '/user';
            }, 100);
        },
        loginAsEmployer: () => {
            mockLogin('employer');
            setTimeout(() => {
                window.location.href = '/employer';
            }, 100);
        },
        loginAsAdmin: () => {
            mockLogin('admin');
            setTimeout(() => {
                window.location.href = '/admin';
            }, 100);
        },

        // Set token trực tiếp
        setToken: (token) => {
            setToken(token);
            console.log('✅ Token đã được set. Reload page để áp dụng.');
        },

        // Tạo token mới
        createToken: (email, fullName, role) => {
            return createMockToken({ email, fullName, role });
        },

        // Xem thông tin accounts
        getAccounts: () => {
            console.table(mockAccounts);
            return mockAccounts;
        },

        // Xem token hiện tại
        getCurrentToken: () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                console.log('Current token:', token);
                return token;
            } else {
                console.log('Chưa có token');
                return null;
            }
        },

        // Xóa token (logout)
        logout: () => {
            localStorage.removeItem('access_token');
            console.log('✅ Đã logout');
            window.location.href = '/login';
        }
    };

    console.log(`
🎯 Mock Auth Helper đã sẵn sàng!

Các lệnh có thể dùng:
- window.mockAuth.loginAsUser()     → Đăng nhập as User
- window.mockAuth.loginAsEmployer() → Đăng nhập as Employer  
- window.mockAuth.loginAsAdmin()    → Đăng nhập as Admin
- window.mockAuth.getAccounts()      → Xem danh sách accounts
- window.mockAuth.getCurrentToken()  → Xem token hiện tại
- window.mockAuth.logout()          → Đăng xuất

Hoặc truy cập: /mock-login để dùng UI
    `);
};

// Auto init khi import
if (typeof window !== 'undefined') {
    initMockAuth();
}

export { initMockAuth };
export default window?.mockAuth || {};

