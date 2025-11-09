import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { Search, Eye, MessageSquare, AlertTriangle, User, Calendar, Flag, CheckCircle2, XCircle } from 'lucide-react';

const ReportsComplaintsPage = () => {
  const [activeMenu, setActiveMenu] = useState('reports');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock data for reports and complaints
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'harassment',
      title: 'Nhà tuyển dụng quấy rối',
      reporter: {
        name: 'Nguyễn Thị A',
        email: 'nguyenthia@email.com',
        type: 'student'
      },
      reported: {
        name: 'Công ty XYZ',
        email: 'contact@xyz.com',
        type: 'employer'
      },
      description: 'Nhà tuyển dụng có hành vi quấy rối qua tin nhắn riêng, sử dụng ngôn từ không phù hợp và gây khó chịu.',
      evidence: ['screenshot1.jpg', 'screenshot2.jpg'],
      status: 'pending',
      priority: 'high',
      submittedDate: '2024-10-25',
      assignedTo: 'Admin',
    },
    {
      id: 2,
      type: 'fraud',
      title: 'Công việc lừa đảo',
      reporter: {
        name: 'Trần Văn B',
        email: 'tranvanb@email.com',
        type: 'student'
      },
      reported: {
        name: 'Fake Company',
        email: 'fake@company.com',
        type: 'employer'
      },
      description: 'Công ty đăng tin tuyển dụng giả mạo, yêu cầu chuyển tiền trước khi làm việc. Đã có nhiều sinh viên bị lừa.',
      evidence: ['job_posting.jpg', 'payment_request.jpg'],
      status: 'investigating',
      priority: 'high',
      submittedDate: '2024-10-24',
      assignedTo: 'Admin',
    },
    {
      id: 3,
      type: 'inappropriate_content',
      title: 'Nội dung không phù hợp',
      reporter: {
        name: 'Lê Thị C',
        email: 'lethic@email.com',
        type: 'student'
      },
      reported: {
        name: 'Nhà hàng ABC',
        email: 'restaurant@abc.com',
        type: 'employer'
      },
      description: 'Tin đăng tuyển dụng có hình ảnh và nội dung không phù hợp, mang tính chất gợi dục.',
      evidence: ['inappropriate_image.jpg'],
      status: 'resolved',
      priority: 'medium',
      submittedDate: '2024-10-20',
      assignedTo: 'Admin',
      resolution: 'Đã xóa tin đăng và cảnh báo nhà tuyển dụng',
    },
    {
      id: 4,
      type: 'payment_issue',
      title: 'Không thanh toán lương',
      reporter: {
        name: 'Phạm Văn D',
        email: 'phamvand@email.com',
        type: 'student'
      },
      reported: {
        name: 'Cửa hàng DEF',
        email: 'shop@def.com',
        type: 'employer'
      },
      description: 'Đã làm việc 2 tuần nhưng nhà tuyển dụng không thanh toán lương và không phản hồi tin nhắn.',
      evidence: ['work_contract.pdf', 'message_screenshots.jpg'],
      status: 'pending',
      priority: 'medium',
      submittedDate: '2024-10-26',
      assignedTo: 'Admin',
    },
  ]);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reported.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesType = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Chờ xử lý', icon: AlertTriangle },
      investigating: { color: 'bg-blue-100 text-blue-800', text: 'Đang điều tra', icon: Eye },
      resolved: { color: 'bg-green-100 text-green-800', text: 'Đã giải quyết', icon: CheckCircle2 },
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

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: 'bg-red-100 text-red-800', text: 'Cao' },
      medium: { color: 'bg-yellow-100 text-yellow-800', text: 'Trung bình' },
      low: { color: 'bg-gray-100 text-gray-800', text: 'Thấp' },
    };

    const config = priorityConfig[priority];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getTypeLabel = (type) => {
    const typeLabels = {
      harassment: 'Quấy rối',
      fraud: 'Lừa đảo',
      inappropriate_content: 'Nội dung không phù hợp',
      payment_issue: 'Vấn đề thanh toán',
      spam: 'Spam',
      other: 'Khác',
    };
    return typeLabels[type] || type;
  };

  const handleUpdateStatus = (reportId, newStatus) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  const handleViewDetails = (report) => {
    console.log('View report details:', report);
  };

  const pendingCount = reports.filter(r => r.status === 'pending').length;
  const investigatingCount = reports.filter(r => r.status === 'investigating').length;
  const resolvedCount = reports.filter(r => r.status === 'resolved').length;
  const highPriorityCount = reports.filter(r => r.priority === 'high').length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <div className="ml-64 w-[calc(100%-16rem)]">
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Khiếu nại</h1>
              <p className="text-sm text-gray-600">Xử lý báo cáo và khiếu nại từ người dùng</p>
            </div>
            <span className="text-gray-700 font-medium">Xin chào, Admin</span>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Chờ xử lý</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Đang điều tra</p>
                  <p className="text-2xl font-bold text-blue-600">{investigatingCount}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Đã giải quyết</p>
                  <p className="text-2xl font-bold text-green-600">{resolvedCount}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ưu tiên cao</p>
                  <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <Flag className="w-6 h-6 text-red-600" />
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
                    placeholder="Tìm kiếm theo tiêu đề, người báo cáo..."
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
                  <option value="pending">Chờ xử lý</option>
                  <option value="investigating">Đang điều tra</option>
                  <option value="resolved">Đã giải quyết</option>
                  <option value="rejected">Từ chối</option>
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tất cả loại</option>
                  <option value="harassment">Quấy rối</option>
                  <option value="fraud">Lừa đảo</option>
                  <option value="inappropriate_content">Nội dung không phù hợp</option>
                  <option value="payment_issue">Vấn đề thanh toán</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Danh sách báo cáo ({filteredReports.length})
              </h3>
              
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                          <Flag className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{report.title}</h4>
                          <p className="text-sm text-gray-600">{getTypeLabel(report.type)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(report.status)}
                        {getPriorityBadge(report.priority)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-600">Người báo cáo:</span>
                          <span className="text-gray-900">{report.reporter.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Flag className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-600">Bị báo cáo:</span>
                          <span className="text-gray-900">{report.reported.name}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-600">Ngày báo cáo:</span>
                          <span className="text-gray-900">{new Date(report.submittedDate).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-gray-600">Phụ trách:</span>
                          <span className="text-gray-900">{report.assignedTo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Mô tả:</span> {report.description}
                      </p>
                    </div>

                    {report.evidence && report.evidence.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-600 mb-1">Bằng chứng:</p>
                        <div className="flex flex-wrap gap-2">
                          {report.evidence.map((evidence, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {evidence}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {report.resolution && (
                      <div className="mb-3 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <span className="font-medium">Giải pháp:</span> {report.resolution}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(report)}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Xem chi tiết
                        </button>
                        
                        <button
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Liên hệ
                        </button>
                      </div>
                      
                      {report.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateStatus(report.id, 'investigating')}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Điều tra
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(report.id, 'resolved')}
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Giải quyết
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredReports.length === 0 && (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Không tìm thấy báo cáo nào</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsComplaintsPage;
