import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import UserFilters from './components/users/UserFilters';
import UserList from './components/users/UserList';

const UserManagementPage = () => {
  const [activeMenu, setActiveMenu] = useState('users'); // Set active menu to users
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for users
  const [users] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      type: 'student',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-10-25',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      type: 'employer',
      status: 'active',
      joinDate: '2024-02-20',
      lastActive: '2024-10-24',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      type: 'student',
      status: 'pending',
      joinDate: '2024-10-20',
      lastActive: '2024-10-20',
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      type: 'employer',
      status: 'banned',
      joinDate: '2024-03-10',
      lastActive: '2024-10-15',
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      type: 'student',
      status: 'inactive',
      joinDate: '2024-01-05',
      lastActive: '2024-09-30',
    },
    {
      id: 6,
      name: 'Võ Thị F',
      email: 'vothif@email.com',
      type: 'employer',
      status: 'active',
      joinDate: '2024-04-12',
      lastActive: '2024-10-26',
    },
    {
      id: 7,
      name: 'Đặng Văn G',
      email: 'dangvang@email.com',
      type: 'student',
      status: 'active',
      joinDate: '2024-05-18',
      lastActive: '2024-10-25',
    },
    {
      id: 8,
      name: 'Bùi Thị H',
      email: 'buithih@email.com',
      type: 'student',
      status: 'pending',
      joinDate: '2024-10-22',
      lastActive: '2024-10-22',
    },
  ]);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || user.type === filterType;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // User action handlers
  const handleViewUser = (user) => {
    console.log('View user:', user);
    // Implement view user logic
  };

  const handleEditUser = (user) => {
    console.log('Edit user:', user);
    // Implement edit user logic
  };

  const handleBanUser = (user) => {
    console.log('Ban user:', user);
    // Implement ban user logic
  };

  const handleUnbanUser = (user) => {
    console.log('Unban user:', user);
    // Implement unban user logic
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      {/* Main Content (with offset for sidebar) */}
      <div className="ml-64 w-[calc(100%-16rem)]">
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
              <p className="text-sm text-gray-600">Quản lý thông tin và trạng thái người dùng</p>
            </div>
            <span className="text-gray-700 font-medium">Xin chào, Admin</span>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tổng người dùng</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Sinh viên</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.type === 'student').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nhà tuyển dụng</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.type === 'employer').length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Chờ xác thực</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.status === 'pending').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <UserFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          {/* User List */}
          <UserList
            users={filteredUsers}
            onViewUser={handleViewUser}
            onEditUser={handleEditUser}
            onBanUser={handleBanUser}
            onUnbanUser={handleUnbanUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
