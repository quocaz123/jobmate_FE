import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { Search, Eye, CheckCircle, XCircle, Clock, CreditCard, User, Calendar, MapPin } from 'lucide-react';

const VerifyIDPage = () => {
  const [activeMenu, setActiveMenu] = useState('verify-cccd');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for ID verification requests
  const [verificationRequests, setVerificationRequests] = useState([
    {
      id: 1,
      userName: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      userType: 'student',
      idNumber: '079201001234',
      fullName: 'NGUYEN VAN A',
      dateOfBirth: '01/01/2001',
      placeOfBirth: 'TP. Hồ Chí Minh',
      address: '123 Nguyễn Huệ, Q1, TP.HCM',
      issueDate: '01/01/2019',
      issuePlace: 'Công an TP. Hồ Chí Minh',
      frontImageUrl: '/images/cccd-front-1.jpg',
      backImageUrl: '/images/cccd-back-1.jpg',
      status: 'pending',
      submittedDate: '2024-10-25',
      reason: '',
    },
    {
      id: 2,
      userName: 'Trần Thị B',
      email: 'tranthib@email.com',
      userType: 'employer',
      idNumber: '079199005678',
      fullName: 'TRAN THI B',
      dateOfBirth: '15/06/1999',
      placeOfBirth: 'Hà Nội',
      address: '456 Lê Văn Sỹ, Q3, TP.HCM',
      issueDate: '15/06/2017',
      issuePlace: 'Công an Hà Nội',
      frontImageUrl: '/images/cccd-front-2.jpg',
      backImageUrl: '/images/cccd-back-2.jpg',
      status: 'verified',
      submittedDate: '2024-10-20',
      reason: '',
    },
    {
      id: 3,
      userName: 'Lê Văn C',
      email: 'levanc@email.com',
      userType: 'student',
      idNumber: '079200009999',
      fullName: 'LE VAN C',
      dateOfBirth: '20/03/2000',
      placeOfBirth: 'Đà Nẵng',
      address: '789 Trần Hưng Đạo, Q5, TP.HCM',
      issueDate: '20/03/2018',
      issuePlace: 'Công an Đà Nẵng',
      frontImageUrl: '/images/cccd-front-3.jpg',
      backImageUrl: '/images/cccd-back-3.jpg',
      status: 'rejected',
      submittedDate: '2024-10-22',
      reason: 'Hình ảnh CCCD không rõ ràng, cần chụp lại',
    },
  ]);

  const filteredRequests = verificationRequests.filter(request => {
    const matchesSearch = request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.idNumber.includes(searchTerm) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Chờ xác minh', icon: Clock },
      verified: { color: 'bg-green-100 text-green-800', text: 'Đã xác minh', icon: CheckCircle },
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

  const getUserTypeBadge = (type) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        type === 'student' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
      }`}>
        <User className="w-3 h-3" />
        {type === 'student' ? 'Sinh viên' : 'Nhà tuyển dụng'}
      </span>
    );
  };

  const handleVerify = (requestId) => {
    setVerificationRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'verified' } : req
    ));
  };

  const handleReject = (requestId, reason = 'Thông tin không chính xác') => {
    setVerificationRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'rejected', reason } : req
    ));
  };

  const handleViewImage = (imageUrl, title) => {
    console.log(`View ${title}:`, imageUrl);
    // Implement image viewer modal
  };

  const pendingCount = verificationRequests.filter(r => r.status === 'pending').length;
  const verifiedCount = verificationRequests.filter(r => r.status === 'verified').length;
  const rejectedCount = verificationRequests.filter(r => r.status === 'rejected').length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <div className="ml-64 w-[calc(100%-16rem)]">
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Xác minh CCCD</h1>
              <p className="text-sm text-gray-600">Xác minh căn cước công dân của người dùng</p>
            </div>
            <span className="text-gray-700 font-medium">Xin chào, Admin</span>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Chờ xác minh</p>
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
                  <p className="text-sm font-medium text-gray-500">Đã xác minh</p>
                  <p className="text-2xl font-bold text-green-600">{verifiedCount}</p>
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
                    placeholder="Tìm kiếm theo tên, số CCCD, email..."
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
                  <option value="pending">Chờ xác minh</option>
                  <option value="verified">Đã xác minh</option>
                  <option value="rejected">Từ chối</option>
                </select>
              </div>
            </div>
          </div>

          {/* Verification Requests List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Danh sách yêu cầu xác minh ({filteredRequests.length})
              </h3>
              
              <div className="space-y-6">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-semibold text-gray-900">{request.userName}</h4>
                            {getUserTypeBadge(request.userType)}
                            {getStatusBadge(request.status)}
                          </div>
                          <p className="text-sm text-gray-600">{request.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleVerify(request.id)}
                              className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Xác minh
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                              Từ chối
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* ID Information */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h5 className="font-medium text-gray-900 mb-3">Thông tin CCCD</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-gray-600">Số CCCD:</span>
                            <span className="text-gray-900">{request.idNumber}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-gray-600">Họ tên:</span>
                            <span className="text-gray-900">{request.fullName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-600">Ngày sinh:</span>
                            <span className="text-gray-900">{request.dateOfBirth}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                            <div>
                              <span className="font-medium text-gray-600">Địa chỉ:</span>
                              <p className="text-gray-900">{request.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-gray-600">Nơi cấp:</span>
                            <span className="text-gray-900">{request.issuePlace}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h6 className="font-medium text-gray-700 mb-2">Mặt trước CCCD</h6>
                        <div 
                          className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
                          onClick={() => handleViewImage(request.frontImageUrl, 'Mặt trước CCCD')}
                        >
                          <div className="text-center">
                            <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Nhấn để xem ảnh mặt trước</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h6 className="font-medium text-gray-700 mb-2">Mặt sau CCCD</h6>
                        <div 
                          className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
                          onClick={() => handleViewImage(request.backImageUrl, 'Mặt sau CCCD')}
                        >
                          <div className="text-center">
                            <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Nhấn để xem ảnh mặt sau</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Ngày nộp: {new Date(request.submittedDate).toLocaleDateString('vi-VN')}</span>
                      {request.reason && (
                        <span className="text-red-600">Lý do từ chối: {request.reason}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredRequests.length === 0 && (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Không tìm thấy yêu cầu xác minh nào</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyIDPage;
