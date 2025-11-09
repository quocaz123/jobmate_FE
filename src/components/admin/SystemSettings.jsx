import React, { useEffect, useState } from 'react';
import Card from '../Common/Card';

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

const SystemSettings = () => {
  // Email config state
  const [emailConfig, setEmailConfig] = useState({
    smtpHost: '',
    smtpPort: 587,
    username: '',
    password: '',
    fromAddress: '',
    useTLS: true,
  });
  const [testing, setTesting] = useState(false);

  // Security rules state
  const [securityConfig, setSecurityConfig] = useState({
    minPasswordLength: 8,
    requireNumbers: true,
    requireSpecial: false,
    sessionTimeoutMinutes: 60,
  });

  useEffect(() => {
    const savedEmail = loadFromStorage('sys_email_config', null);
    const savedSecurity = loadFromStorage('sys_security_config', null);
    if (savedEmail) setEmailConfig(savedEmail);
    if (savedSecurity) setSecurityConfig(savedSecurity);
  }, []);

  const handleEmailChange = (field, value) => {
    setEmailConfig((s) => ({ ...s, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurityConfig((s) => ({ ...s, [field]: value }));
  };

  const saveEmail = () => {
    // Basic validation
    if (!emailConfig.smtpHost || !emailConfig.fromAddress) {
      alert('Vui lòng điền SMTP host và địa chỉ gửi (From address).');
      return;
    }
    localStorage.setItem('sys_email_config', JSON.stringify(emailConfig));
    alert('Cấu hình email đã được lưu (local).');
  };

  const testEmail = () => {
    setTesting(true);
    // Simulate async test
    setTimeout(() => {
      setTesting(false);
      alert('Kiểm tra SMTP thành công (mô phỏng).');
    }, 1200);
  };

  const saveSecurity = () => {
    // basic validation
    if (securityConfig.minPasswordLength < 4) {
      alert('Độ dài mật khẩu tối thiểu phải >= 4 ký tự.');
      return;
    }
    localStorage.setItem('sys_security_config', JSON.stringify(securityConfig));
    alert('Quy tắc bảo mật đã được lưu (local).');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Cài đặt hệ thống</h2>
        <p className="text-gray-600">Cấu hình các thông số hệ thống (demo).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-lg font-medium mb-3">Cấu hình email</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600">SMTP Host</label>
              <input
                className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 bg-white"
                value={emailConfig.smtpHost}
                onChange={(e) => handleEmailChange('smtpHost', e.target.value)}
                placeholder="smtp.mailserver.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm text-gray-600">Port</label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 bg-white"
                  value={emailConfig.smtpPort}
                  onChange={(e) => handleEmailChange('smtpPort', Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">From address</label>
                <input
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 bg-white"
                  value={emailConfig.fromAddress}
                  onChange={(e) => handleEmailChange('fromAddress', e.target.value)}
                  placeholder="no-reply@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm text-gray-600">Username</label>
                <input
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 bg-white"
                  value={emailConfig.username}
                  onChange={(e) => handleEmailChange('username', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 bg-white"
                  value={emailConfig.password}
                  onChange={(e) => handleEmailChange('password', e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={emailConfig.useTLS}
                  onChange={(e) => handleEmailChange('useTLS', e.target.checked)}
                />
                <span className="text-sm text-gray-600">Sử dụng TLS/SSL</span>
              </label>

              <div className="ml-auto flex items-center space-x-2">
                <button
                  onClick={testEmail}
                  disabled={testing}
                  className="px-3 py-1 rounded bg-gray-100 text-sm"
                >
                  {testing ? 'Đang kiểm tra...' : 'Kiểm tra kết nối'}
                </button>
                <button onClick={saveEmail} className="px-3 py-1 rounded bg-emerald-500 text-white text-sm">
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium mb-3">Quy tắc bảo mật</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600">Độ dài mật khẩu tối thiểu</label>
              <input
                type="number"
                className="mt-1 block w-32 border border-gray-200 rounded px-3 py-2 bg-white"
                value={securityConfig.minPasswordLength}
                onChange={(e) => handleSecurityChange('minPasswordLength', Number(e.target.value))}
                min={4}
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securityConfig.requireNumbers}
                  onChange={(e) => handleSecurityChange('requireNumbers', e.target.checked)}
                />
                <span className="text-sm text-gray-600">Yêu cầu số</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securityConfig.requireSpecial}
                  onChange={(e) => handleSecurityChange('requireSpecial', e.target.checked)}
                />
                <span className="text-sm text-gray-600">Yêu cầu ký tự đặc biệt</span>
              </label>
            </div>

            <div>
              <label className="block text-sm text-gray-600">Thời gian hết phiên (phút)</label>
              <input
                type="number"
                className="mt-1 block w-40 border border-gray-200 rounded px-3 py-2 bg-white"
                value={securityConfig.sessionTimeoutMinutes}
                onChange={(e) => handleSecurityChange('sessionTimeoutMinutes', Number(e.target.value))}
                min={5}
              />
            </div>

            <div className="pt-2">
              <button onClick={saveSecurity} className="px-3 py-1 rounded bg-emerald-500 text-white text-sm">
                Lưu quy tắc
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettings;


