import React, { useState } from 'react'
import { Phone, Video, MoreVertical, Paperclip, Smile, Send } from 'lucide-react'

const ChatWindow = ({ conversation }) => {
  const [newMessage, setNewMessage] = useState('')

  const messages = [
    {
      id: 1,
      sender: 'company',
      content: 'Xin chào! Chúng tôi đã xem hồ sơ của bạn và rất ấn tượng với kinh nghiệm làm việc.',
      timestamp: '10:30',
      avatar: 'A'
    },
    {
      id: 2,
      sender: 'user',
      content: 'Cảm ơn anh/chị! Em rất quan tâm đến vị trí này.',
      timestamp: '10:32'
    },
    {
      id: 3,
      sender: 'company',
      content: 'Bạn có thể cho tôi biết thêm về lịch học của bạn không? Chúng tôi cần người làm việc vào cuối tuần.',
      timestamp: '10:35',
      avatar: 'A'
    },
    {
      id: 4,
      sender: 'user',
      content: 'Dạ được ạ! Em học từ thứ 2 đến thứ 6, cuối tuần em hoàn toàn rảnh. Em có thể làm cả ngày thứ 7 và chủ nhật.',
      timestamp: '10:36'
    },
    {
      id: 5,
      sender: 'company',
      content: 'Tuyệt vời! Vậy bạn có thể đến phỏng vấn vào thứ 7 tuần này được không?',
      timestamp: '10:38',
      avatar: 'A'
    }
  ]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Handle send message logic here
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
              {conversation.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-black">{conversation.name}</h3>
              <p className="text-sm text-green-600">Đang hoạt động</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-xs lg:max-w-md ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}>
              {/* Avatar for company messages */}
              {message.sender === 'company' && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {message.avatar}
                </div>
              )}
              
              {/* Message Bubble */}
              <div className={`px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-black text-white rounded-br-md'
                  : 'bg-white text-black rounded-bl-md shadow-sm'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatWindow
