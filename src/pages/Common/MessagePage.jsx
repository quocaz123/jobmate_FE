import React, { useEffect, useRef, useState } from 'react'
import { Search, MoreVertical, Smile, Send } from 'lucide-react'
import { io } from 'socket.io-client'
import { getMyConversations, getMessagesOfConversation, createMessage } from '../../services/chatService'
import { getToken } from '../../services/localStorageService'

// ================= Conversation List =================
const ConversationList = ({ conversations, onSelectConversation, selectedConversation }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Tin nhắn</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm cuộc trò chuyện..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => {
              console.log("🖱 Clicked conversation:", conversation)
              onSelectConversation(conversation)
            }}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
              }`}
          >
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  {conversation.avatar || 'U'}
                </div>
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800 truncate">{conversation.name}</h3>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conversation.timestamp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <span className="ml-2 flex-shrink-0 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                      {conversation.unread}
                    </span>
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

// ================= Chat Window =================
const ChatWindow = ({ conversation = { name: 'Tin nhắn', avatar: 'M' }, socket }) => {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])

  const bottomRef = useRef(null)

  useEffect(() => {
    if (!conversation?.id) return

    const fetchMessages = async () => {
      try {
        console.log("📡 Fetching messages for conversation:", conversation.id)
        const res = await getMessagesOfConversation(conversation.id)
        console.log("✅ Messages response:", res.data)
        const raw = res.data.data || []
        const normalized = raw.map(m => ({
          ...m,
          createdDate: m.createdDate || m.createDate || new Date().toISOString(),
        }))
        // Sort ASC so tin nhắn mới nằm dưới
        normalized.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate))
        setMessages(normalized)
      } catch (error) {
        console.error("❌ Error fetching messages:", error)
      }
    }
    fetchMessages()

    console.log("🚪 Joining socket room:", conversation.id)
    socket?.emit('joinRoom', conversation.id)

    socket?.on('message', (message) => {
      console.log("📩 Received socket message:", message)
      if (message.conversationId === conversation.id) {
        const normalized = {
          ...message,
          createdDate: message.createdDate || message.createDate || new Date().toISOString(),
        }
        setMessages((prev) => {
          // Deduplicate by id to tránh hiển thị 2 lần (API append + socket broadcast)
          if (prev.some((m) => m.id === normalized.id)) return prev
          return [...prev, normalized]
        })
      }
    })

    return () => {
      console.log("🧹 Leaving room and cleaning listener for:", conversation.id)
      if (socket) {
        try { socket.emit('leaveRoom', conversation.id) } catch { /* ignore */ }
      }
      socket?.off('message')
    }
  }, [conversation, socket])

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    console.log("✉️ Sending message:", newMessage)

    const tempId = `temp-${Date.now()}`
    const tempMessage = {
      id: tempId,
      message: newMessage,
      me: true,
      createdDate: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, tempMessage])
    setNewMessage('')

    try {
      const res = await createMessage({
        conversationId: conversation.id,
        message: newMessage,
      })
      console.log("✅ Message sent (API response):", res.data)
      const apiMsg = res?.data?.data || res?.data
      if (apiMsg) {
        const normalized = {
          ...apiMsg,
          createdDate: apiMsg.createdDate || apiMsg.createDate || new Date().toISOString(),
          me: true,
        }
        // Replace temp by server message and ensure only ONE instance by id
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== tempId && m.id !== normalized.id)
          return filtered.concat(normalized)
        })
      }
    } catch (err) {
      console.error("❌ Lỗi gửi tin nhắn:", err)
    }
  }

  return (
    <div className="h-full flex flex-col">
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
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.me ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-2 max-w-xs lg:max-w-md ${msg.me ? 'flex-row-reverse' : 'flex-row'}`}>
              {!msg.me && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {msg.avatar || 'A'}
                </div>
              )}
              <div className={`px-4 py-2 rounded-2xl border border-gray-200 shadow-sm ${msg.me ? 'bg-blue-100 text-black rounded-br-md' : 'bg-white text-black rounded-bl-md'}`}>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs mt-1 text-gray-500">
                  {new Date(msg.createdDate || msg.createDate || Date.now()).toLocaleTimeString('vi-VN')}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
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

// ================= Main Page =================
const MessagesPage = () => {
  const [socket, setSocket] = useState(null)
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)

  useEffect(() => {
    console.log("🧠 Initializing socket connection...")
    const newSocket = io('http://localhost:8099', {
      transports: ['websocket'],
      query: { token: getToken() }
    })

    newSocket.on("connect", () => {
      console.log("🔌 Connected to socket server:", newSocket.id)
    })

    newSocket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server")
    })

    newSocket.on("message", (message) => {
      console.log("📨 Global socket message received:", message)
    })

    setSocket(newSocket)

    return () => {
      console.log("🧹 Cleaning up socket connection...")
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        console.log("📡 Fetching conversations...");
        const res = await getMyConversations();
        console.log("✅ Conversations response:", res.data);

        // 🧩 Chuẩn hóa dữ liệu để render được UI
        const normalized = (res.data.data || []).map((c) => ({
          id: c.id,
          name: c.conversationName || "Chưa đặt tên",
          avatar: c.conversationAvatar || "U",
          lastMessage: c.lastMessage || "Chưa có tin nhắn",
          timestamp: new Date(c.modifiedDate).toLocaleString("vi-VN"),
          unread: 0,
        }));

        console.table(normalized); // 👀 để bạn xem nhanh bảng trong console
        setConversations(normalized);
      } catch (error) {
        console.error("❌ Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);
  return (
    <div className="flex h-full bg-gray-50">
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <ConversationList
          conversations={conversations}
          onSelectConversation={setSelectedConversation}
          selectedConversation={selectedConversation}
        />
      </div>

      <div className="flex-1 bg-white">
        {selectedConversation ? (
          <ChatWindow conversation={selectedConversation} socket={socket} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <p className="text-lg font-medium">Chọn một cuộc trò chuyện</p>
              <p className="text-sm">Để bắt đầu nhắn tin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessagesPage
