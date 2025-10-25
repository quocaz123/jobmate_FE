import React, { useState } from 'react'
import { Search } from 'lucide-react'

const ConversationList = ({ onSelectConversation, selectedConversation }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const conversations = [
    {
      id: 1,
      name: 'Công ty ABC',
      avatar: 'A',
      lastMessage: 'Chúng tôi rất quan tâm đến hồ sơ của bạn',
      timestamp: '2 phút trước',
      unreadCount: 2,
      isOnline: false,
      isActive: true
    },
    {
      id: 2,
      name: 'Nhà hàng XYZ',
      avatar: 'X',
      lastMessage: 'Bạn có thể bắt đầu làm việc từ tuần sau không?',
      timestamp: '1 giờ trước',
      unreadCount: 0,
      isOnline: true,
      isActive: false
    },
    {
      id: 3,
      name: 'Cửa hàng DEF',
      avatar: 'D',
      lastMessage: 'Cảm ơn bạn đã ứng tuyển',
      timestamp: '3 giờ trước',
      unreadCount: 0,
      isOnline: false,
      isActive: false
    }
  ]

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-black mb-4">Tin nhắn</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm cuộc trò chuyện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedConversation?.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  conversation.isActive ? 'bg-green-500' : 'bg-gray-400'
                }`}>
                  {conversation.avatar}
                </div>
                {conversation.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              {/* Conversation Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-black truncate">{conversation.name}</h3>
                  <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  {conversation.unreadCount > 0 && (
                    <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConversationList
