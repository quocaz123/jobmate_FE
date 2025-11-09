import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { Save, Settings, Shield, Bell, Database, Mail, Globe, Eye, EyeOff } from 'lucide-react';

const AdminSettingsPage = () => {
  const [activeMenu, setActiveMenu] = useState('settings');
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    general: {
      siteName: 'JobMate',
      siteDescription: 'Nền tảng kết nối sinh viên và nhà tuyển dụng',
      adminEmail: 'admin@jobmate.vn',
      supportEmail: 'support@jobmate.vn',
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
      maintenanceMode: false,
    },
    security: {
      requireEmailVerification: true,
      requirePhoneVerification: false,
      requireIDVerification: true,
      maxLoginAttempts: 5,
      sessionTimeout: 30,
      twoFactorAuth: false,
      passwordMinLength: 8,
      passwordRequireSpecialChars: true,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      reportNotifications: true,
      newUserNotifications: true,
      jobPostingNotifications: true,
      paymentNotifications: true,
    },
    payments: {
      commissionRate: 10,
      minimumPayout: 100000,
      paymentMethods: ['bank_transfer', 'momo', 'zalopay'],
      autoApprovePayments: false,
      paymentProcessingFee: 2.5,
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Implement save logic
    alert('Cài đặt đã được lưu thành công!');
  };

  const tabs = [
    { id: 'general', name: 'Chung', icon: Settings },
    { id: 'security', name: 'Bảo mật', icon: Shield },
    { id: 'notifications', name: 'Thông báo', icon: Bell },
    { id: 'database', name: 'Dữ liệu', icon: Database },
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin chung</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên website</label>
            <input
              type="text"
              value={settings.general.siteName}
              onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email admin</label>
            <input
              type="email"
              value={settings.general.adminEmail}
              onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email hỗ trợ</label>
            <input
              type="email"
              value={settings.general.supportEmail}
              onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Múi giờ</label>
            <select
              value={settings.general.timezone}
              onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</option>
              <option value="UTC">UTC (GMT+0)</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả website</label>
          <textarea
            value={settings.general.siteDescription}
            onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.general.maintenanceMode}
              onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Chế độ bảo trì</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Xác thực</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.requireEmailVerification}
              onChange={(e) => handleSettingChange('security', 'requireEmailVerification', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Yêu cầu xác thực email</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.requireIDVerification}
              onChange={(e) => handleSettingChange('security', 'requireIDVerification', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Yêu cầu xác thực CCCD</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Xác thực 2 bước</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Bảo mật mật khẩu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Độ dài tối thiểu</label>
            <input
              type="number"
              min="6"
              max="32"
              value={settings.security.passwordMinLength}
              onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số lần đăng nhập tối đa</label>
            <input
              type="number"
              min="3"
              max="10"
              value={settings.security.maxLoginAttempts}
              onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.passwordRequireSpecialChars}
              onChange={(e) => handleSettingChange('security', 'passwordRequireSpecialChars', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Yêu cầu ký tự đặc biệt</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Kênh thông báo</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Thông báo qua Email</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.smsNotifications}
              onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Thông báo qua SMS</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.pushNotifications}
              onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Push notifications</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Loại thông báo</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.newUserNotifications}
              onChange={(e) => handleSettingChange('notifications', 'newUserNotifications', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Người dùng mới đăng ký</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.jobPostingNotifications}
              onChange={(e) => handleSettingChange('notifications', 'jobPostingNotifications', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Tin đăng tuyển dụng mới</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.reportNotifications}
              onChange={(e) => handleSettingChange('notifications', 'reportNotifications', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Báo cáo và khiếu nại</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.paymentNotifications}
              onChange={(e) => handleSettingChange('notifications', 'paymentNotifications', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Giao dịch thanh toán</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sao lưu dữ liệu</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-gray-900">Sao lưu tự động</p>
              <p className="text-sm text-gray-600">Tự động sao lưu dữ liệu hàng ngày lúc 2:00 AM</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sao lưu ngay
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p>Sao lưu gần nhất: 26/10/2024 02:00</p>
            <p>Kích thước: 145.7 MB</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê hệ thống</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Tổng người dùng</p>
            <p className="text-2xl font-bold text-gray-900">12,543</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Công việc đang hoạt động</p>
            <p className="text-2xl font-bold text-gray-900">1,847</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Dung lượng database</p>
            <p className="text-2xl font-bold text-gray-900">2.3 GB</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Uptime</p>
            <p className="text-2xl font-bold text-gray-900">99.9%</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 text-red-600">Vùng nguy hiểm</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-red-900">Xóa tất cả dữ liệu</p>
              <p className="text-sm text-red-700">Thao tác này không thể hoàn tác</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Xóa dữ liệu
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'database':
        return renderDatabaseSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <div className="ml-64 w-[calc(100%-16rem)]">
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
              <p className="text-sm text-gray-600">Quản lý cấu hình và thiết lập hệ thống</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Lưu cài đặt
              </button>
              <span className="text-gray-700 font-medium">Xin chào, Admin</span>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Settings Tabs */}
            <div className="w-64">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Danh mục cài đặt</h3>
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
