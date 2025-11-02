import { setToken } from '../services/localStorageService';

// Base64 encoded JWT header và payload cho mock token
// Format: { "alg": "HS256", "typ": "JWT" }.{ payload }.{ signature }

/**
 * Encode string thành base64 an toàn với Unicode
 */
const base64Encode = (str) => {
    try {
        // Chuyển string sang UTF-8 bytes
        const utf8Bytes = new TextEncoder().encode(str);
        // Convert bytes sang binary string
        let binary = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
            binary += String.fromCharCode(utf8Bytes[i]);
        }
        // Encode binary string thành base64
        return btoa(binary);
    } catch {
        // Fallback: dùng encodeURIComponent để xử lý Unicode
        return btoa(unescape(encodeURIComponent(str)));
    }
};

/**
 * Tạo mock JWT token cho testing
 * @param {Object} userData - Thông tin user
 * @returns {string} Mock JWT token
 */
export const createMockToken = (userData) => {
    const { email, fullName, role, userId } = userData;

    // Map role sang scope
    const scopeMap = {
        'User': 'ROLE_USER',
        'Employer': 'ROLE_EMPLOYER',
        'Admin': 'ROLE_ADMIN'
    };

    const scope = scopeMap[role] || 'ROLE_USER';
    const now = Math.floor(Date.now() / 1000);
    const exp = now + (7 * 24 * 60 * 60); // 7 ngày

    // Mock JWT payload
    const payload = {
        sub: email || 'mock@example.com',
        name: fullName || 'Mock User',
        username: email || 'mock@example.com',
        email: email || 'mock@example.com',
        userId: userId || 1,
        scope: scope,
        iat: now,
        exp: exp
    };

    // Encode payload thành base64 (mock JWT - không có signature thật)
    const header = base64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const encodedPayload = base64Encode(JSON.stringify(payload));

    // Mock signature (không cần verify)
    const signature = 'mock_signature_for_testing';

    return `${header}.${encodedPayload}.${signature}`;
};

// Mock accounts để test
export const mockAccounts = {
    user: {
        email: 'user@jobmate.com',
        fullName: 'Nguyễn Văn A',
        role: 'User',
        userId: 1
    },
    employer: {
        email: 'employer@jobmate.com',
        fullName: 'Trần Thị B',
        role: 'Employer',
        userId: 2
    },
    admin: {
        email: 'admin@jobmate.com',
        fullName: 'Lê Văn C',
        role: 'Admin',
        userId: 3
    }
};

/**
 * Mock login - Set token trực tiếp vào localStorage
 * @param {string} role - 'user' | 'employer' | 'admin'
 */
export const mockLogin = (role = 'user') => {
    const accountKey = role.toLowerCase();
    if (!mockAccounts[accountKey]) {
        console.error(`Role không hợp lệ: ${role}. Sử dụng 'user', 'employer', hoặc 'admin'`);
        return;
    }

    const account = mockAccounts[accountKey];
    const token = createMockToken(account);
    setToken(token);

    console.log(`✅ Mock login thành công với role: ${role}`);
    console.log('Thông tin tài khoản:', account);
    console.log('Token đã được lưu vào localStorage');

    return {
        success: true,
        account,
        token
    };
};

/**
 * Lấy thông tin mock accounts để hiển thị
 */
export const getMockAccountsInfo = () => {
    return Object.entries(mockAccounts).map(([key, value]) => ({
        key,
        ...value,
        token: createMockToken(value)
    }));
};

