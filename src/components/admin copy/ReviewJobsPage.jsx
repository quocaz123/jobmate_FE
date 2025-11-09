import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { Search, Eye, CheckCircle, XCircle, Clock, Briefcase, MapPin, DollarSign, Calendar } from 'lucide-react';

const ReviewJobsPage = () => {
  const [activeMenu, setActiveMenu] = useState('review-jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock data for jobs pending review
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Nhân viên phục vụ bàn - Ca tối',
      company: 'Nhà hàng Italia Bella',
      salary: '150,000đ/ca',
      location: 'Quận 1, TP.HCM',
      category: 'Nhà hàng',
      workTime: 'Part-time',
      description: 'Tuyển nhân viên phục vụ bàn ca tối từ 17h-22h, thái độ thân thiện, giao tiếp tốt',
      requirements: 'Sinh viên từ năm 2 trở lên, có kinh nghiệm làm việc nhà hàng',
      postedDate: '2024-10-25',
      status: 'pending',
      reason: '',
    },
    {
      id: 2,
      title: 'Gia sư Toán lớp 10-12',
      company: 'Trung tâm gia sư Smart Education',
      salary: '200,000đ/buổi',
      location: 'Quận 3, TP.HCM',
      category: 'Gia sư',
      workTime: 'Part-time',
      description: 'Cần gia sư dạy Toán THPT, có kinh nghiệm và phương pháp giảng dạy hiệu quả',
      requirements: 'Sinh viên chuyên ngành Toán hoặc các ngành liên quan, GPA từ 7.0 trở lên',
      postedDate: '2024-10-24',
      status: 'pending',
      reason: '',
    },
    {
      id: 3,
      title: 'Nhân viên bán hàng thời trang',
      company: 'Fashion Plus Store',
      salary: '4,000,000đ/tháng',
      location: 'Quận 5, TP.HCM',
      category: 'Bán hàng',
      workTime: 'Part-time',
      description: 'Tư vấn và bán hàng thời trang, chăm sóc khách hàng, sắp xếp hàng hóa',
      requirements: 'Ngoại hình khá, giao tiếp tốt, am hiểu thời trang',
      postedDate: '2024-10-23',
      status: 'approved',
      reason: '',
    },
    {
      id: 4,
      title: 'Làm việc online - Data entry',
      company: 'Unknown Company',
      salary: '50,000đ/giờ',
      location: 'Remote',
      category: 'Văn phòng',
      workTime: 'Flexible',
      description: 'Nhập liệu online, không cần kinh nghiệm, làm việc tại nhà, thu nhập cao',
      requirements: 'Có máy tính và internet',
      postedDate: '2024-10-26',
      status: 'rejected',
      reason: 'Tin đăng có dấu hiệu lừa đảo, thông tin công ty không rõ ràng',
    },
  ]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || job.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
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

  const handleApprove = (jobId) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'approved' } : job
    ));
  };

  const handleReject = (jobId, reason = 'Không đáp ứng tiêu chuẩn') => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'rejected', reason } : job
    ));
  };

  const handleViewDetails = (job) => {
    console.log('View job details:', job);
  };

  const pendingCount = jobs.filter(j => j.status === 'pending').length;
  const approvedCount = jobs.filter(j => j.status === 'approved').length;
  const rejectedCount = jobs.filter(j => j.status === 'rejected').length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <div className="ml-64 w-[calc(100%-16rem)]">
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kiểm duyệt công việc</h1>
              <p className="text-sm text-gray-600">Xem xét và phê duyệt tin đăng tuyển dụng</p>
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
                    placeholder="Tìm kiếm theo tiêu đề, công ty..."
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

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tất cả danh mục</option>
                  <option value="Nhà hàng">Nhà hàng</option>
                  <option value="Gia sư">Gia sư</option>
                  <option value="Bán hàng">Bán hàng</option>
                  <option value="Văn phòng">Văn phòng</option>
                </select>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Danh sách công việc ({filteredJobs.length})
              </h3>
              
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-purple-100 rounded-full">
                            <Briefcase className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold text-gray-900">{job.title}</h4>
                              {getStatusBadge(job.status)}
                            </div>
                            <p className="text-sm text-gray-600">{job.company}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-14 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(job.postedDate).toLocaleDateString('vi-VN')}</span>
                          </div>
                        </div>
                        
                        <div className="ml-14 space-y-2">
                          <p className="text-sm text-gray-700"><strong>Mô tả:</strong> {job.description}</p>
                          <p className="text-sm text-gray-700"><strong>Yêu cầu:</strong> {job.requirements}</p>
                          {job.reason && (
                            <p className="text-sm text-red-600"><strong>Lý do từ chối:</strong> {job.reason}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleViewDetails(job)}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Xem
                        </button>
                        
                        {job.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(job.id)}
                              className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Duyệt
                            </button>
                            <button
                              onClick={() => handleReject(job.id)}
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

              {filteredJobs.length === 0 && (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Không tìm thấy công việc nào</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewJobsPage;
