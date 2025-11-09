import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { Search, Send, Paperclip, MoreVertical, User, Clock } from 'lucide-react';

const AdminMessagesPage = () => {
  const [activeMenu, setActiveMenu] = useState('messages');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for conversations
  const [conversations] = useState([
    {
      id: 1,
      user: {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        type: 'student',
        avatar: 'https://via.placeholder.com/40'
      },
      lastMessage: 'Em có thắc mắc về việc xác minh CCCD',
      lastMessageTime: '2024-10-26T14:30:00',
      unreadCount: 2,
      status: 'active'
    },
    {
      id: 2,
      user: {
        name: 'Trần Thị B',
        email: 'tranthib@email.com',
        type: 'employer',
        avatar: 'https://via.placeholder.com/40'
      },
      lastMessage: 'Cảm ơn admin đã hỗ trợ',
      lastMessageTime: '2024-10-26T10:15:00',
      unreadCount: 0,
      status: 'resolved'
    },
    {
      id: 3,
      user: {
        name: 'Lê Văn C',
        email: 'levanc@email.com',
        type: 'student',
        avatar: 'https://via.placeholder.com/40'
      },
      lastMessage: 'Tài khoản của em bị khóa, admin có thể kiểm tra giúp không?',
      lastMessageTime: '2024-10-25T16:45:00',
      unreadCount: 1,
      status: 'pending'
    },
  ]);

  // Mock data for messages
  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        sender: 'user',
        content: 'Xin chào admin, em có thắc mắc về việc xác minh CCCD',
        timestamp: '2024-10-26T14:25:00',
        type: 'text'
      },
      {
        id: 2,
        sender: 'admin',
        content: 'Chào bạn! Admin có thể hỗ trợ bạn. Bạn gặp vấn đề gì với việc xác minh CCCD?',
        timestamp: '2024-10-26T14:26:00',
        type: 'text'
      },
      {
        id: 3,
        sender: 'user',
        content: 'Em đã upload ảnh CCCD từ 3 ngày trước nhưng vẫn chưa được duyệt ạ',
        timestamp: '2024-10-26T14:30:00',
        type: 'text'
      }
    ],
    2: [
      {
        id: 1,
        sender: 'user',
        content: 'Admin ơi, tin đăng tuyển dụng của công ty tôi bị từ chối',
        timestamp: '2024-10-26T09:30:00',
        type: 'text'
      },
      {
        id: 2,
        sender: 'admin',
        content: 'Tin đăng của bạn bị từ chối vì thiếu thông tin về mức lương cụ thể. Vui lòng cập nhật và đăng lại.',
        timestamp: '2024-10-26T09:45:00',
        type: 'text'
      },
      {
        id: 3,
        sender: 'user',
        content: 'Cảm ơn admin đã hỗ trợ. Tôi sẽ cập nhật lại thông tin.',
        timestamp: '2024-10-26T10:15:00',
        type: 'text'
      }
    ],
    3: [
      {
        id: 1,
        sender: 'user',
        content: 'Tài khoản của em bị khóa, admin có thể kiểm tra giúp không?',
        timestamp: '2024-10-25T16:45:00',
        type: 'text'
      }
    ]
  });

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage = {
      id: Date.now(),
      sender: 'admin',
      content: messageText,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage]
    }));

    setMessageText('');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hôm nay';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hôm qua';
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-blue-100 text-blue-800', text: 'Đang xử lý' },
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Chờ phản hồi' },
      resolved: { color: 'bg-green-100 text-green-800', text: 'Đã giải quyết' },
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <div className="ml-64 w-[calc(100%-16rem)]">
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tin nhắn</h1>
              <p className="text-sm text-gray-600">Hỗ trợ và trao đổi với người dùng</p>
            </div>
            <span className="text-gray-700 font-medium">Xin chào, Admin</span>
          </div>

          <div className="flex h-[calc(100vh-200px)] bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm cuộc trò chuyện..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{conversation.user.name}</h4>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            conversation.user.type === 'student' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {conversation.user.type === 'student' ? 'SV' : 'NTD'}
                          </span>
                          {getStatusBadge(conversation.status)}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{selectedConversation.user.name}</h4>
                          <p className="text-sm text-gray-600">{selectedConversation.user.email}</p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {(messages[selectedConversation.id] || []).map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'admin'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Paperclip className="w-5 h-5 text-gray-600" />
                      </button>
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Chọn cuộc trò chuyện</h3>
                    <p className="text-sm text-gray-600">Chọn một cuộc trò chuyện để bắt đầu hỗ trợ người dùng</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessagesPage;
