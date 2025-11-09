import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { Search, Eye, CheckCircle, XCircle, Clock, Building, Mail, Phone, FileText } from 'lucide-react';

const ApproveEmployersPage = () => {
  const [activeMenu, setActiveMenu] = useState('approve-employers');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for pending employers
  const [employers, setEmployers] = useState([
    {
      id: 1,
      companyName: 'Nhà hàng Italia Bella',
      contactPerson: 'Nguyễn Văn Tú',
      email: 'contact@italiabella.com',
      phone: '0901234567',
      address: '123 Nguyễn Huệ, Q1, TP.HCM',
      businessLicense: 'GP001234567',
      status: 'pending',
      submittedDate: '2024-10-20',
      businessType: 'Nhà hàng',
      description: 'Nhà hàng phục vụ món ăn Ý chính thống với không gian sang trọng',
    },
    {
      id: 2,
      companyName: 'Trung tâm gia sư Smart Education',
      contactPerson: 'Trần Thị Hương',
      email: 'info@smartedu.vn',
      phone: '0902345678',
      address: '456 Lê Văn Sỹ, Q3, TP.HCM',
      businessLicense: 'GP002345678',
      status: 'pending',
      submittedDate: '2024-10-22',
      businessType: 'Giáo dục',
      description: 'Trung tâm gia sư chuyên các môn học phổ thông',
    },
    {
      id: 3,
      companyName: 'Cửa hàng thời trang Fashion Plus',
      contactPerson: 'Lê Minh Hoàng',
      email: 'hr@fashionplus.vn',
      phone: '0903456789',
      address: '789 Trần Hưng Đạo, Q5, TP.HCM',
      businessLicense: 'GP003456789',
      status: 'pending',
      submittedDate: '2024-10-25',
      businessType: 'Bán lẻ',
      description: 'Cửa hàng thời trang nam nữ với nhiều thương hiệu nổi tiếng',
    },
    {
      id: 4,
      companyName: 'Công ty TNHH Tech Solutions',
      contactPerson: 'Phạm Văn Nam',
      email: 'recruit@techsolutions.com',
      phone: '0904567890',
      address: '321 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM',
      businessLicense: 'GP004567890',
      status: 'approved',
      submittedDate: '2024-10-15',
      businessType: 'Công nghệ',
      description: 'Công ty phát triển phần mềm và giải pháp công nghệ',
    },
  ]);

  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = employer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || employer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Chờ duyệt', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', text: 'Đã duyệt', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Từ chối', icon: XCircle },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  const handleApprove = (employerId) => {
    setEmployers(prev => prev.map(emp => 
      emp.id === employerId ? { ...emp, status: 'approved' } : emp
    ));
  };

  const handleReject = (employerId) => {
    setEmployers(prev => prev.map(emp => 
      emp.id === employerId ? { ...emp, status: 'rejected' } : emp
    ));
  };

  const handleViewDetails = (employer) => {
    console.log('View employer details:', employer);
  };

  const pendingCount = employers.filter(e => e.status === 'pending').length;
  const approvedCount = employers.filter(e => e.status === 'approved').length;
  const rejectedCount = employers.filter(e => e.status === 'rejected').length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <div className="ml-64 w-[calc(100%-16rem)]">
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Duyệt Nhà tuyển dụng</h1>
              <p className="text-sm text-gray-600">Xem xét và phê duyệt đăng ký nhà tuyển dụng</p>
            </div>
            <span className="text-gray-700 font-medium">Xin chào, Admin</span>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Chờ duyệt</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Đã duyệt</p>
                  <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Từ chối</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 flex gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên công ty, người liên hệ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ duyệt</option>
                  <option value="approved">Đã duyệt</option>
                  <option value="rejected">Từ chối</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employers List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Danh sách nhà tuyển dụng ({filteredEmployers.length})
              </h3>
              
              <div className="space-y-4">
                {filteredEmployers.map((employer) => (
                  <div key={employer.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Building className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{employer.companyName}</h4>
                            <p className="text-sm text-gray-600">{employer.businessType}</p>
                          </div>
                          {getStatusBadge(employer.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4" />
                              <span>{employer.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4" />
                              <span>{employer.phone}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FileText className="w-4 h-4" />
                              <span>GP: {employer.businessLicense}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Ngày nộp: {new Date(employer.submittedDate).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mt-3 ml-14">{employer.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleViewDetails(employer)}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Xem
                        </button>
                        
                        {employer.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(employer.id)}
                              className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Duyệt
                            </button>
                            <button
                              onClick={() => handleReject(employer.id)}
                              className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                              Từ chối
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredEmployers.length === 0 && (
                <div className="text-center py-8">
                  <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Không tìm thấy nhà tuyển dụng nào</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveEmployersPage;
