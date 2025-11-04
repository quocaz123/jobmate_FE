import React, { useState, useEffect, useRef } from "react";
import { Send, Paperclip, Smile, User, Search } from "lucide-react";

export default function Chat() {
  const [conversations, setConversations] = useState([
    { id: 1, name: "Công ty ABC", lastMessage: "Hẹn phỏng vấn 10h sáng mai", time: "10:21 AM" },
    { id: 2, name: "Cửa hàng Tiện Lợi 24h", lastMessage: "Cảm ơn bạn đã ứng tuyển", time: "Hôm qua" },
    { id: 3, name: "Nhà hàng SushiGo", lastMessage: "Vui lòng gửi CV chi tiết", time: "Thứ 2" },
  ]);
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [messages, setMessages] = useState([
    { from: "employer", text: "Xin chào, bạn có thể phỏng vấn sáng mai chứ?", time: "10:20 AM" },
    { from: "user", text: "Dạ được ạ, em cảm ơn!", time: "10:21 AM" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { from: "user", text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages([...messages, newMsg]);
    setInput("");
    // mô phỏng phản hồi từ employer
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "employer", text: "Cảm ơn bạn, hẹn gặp nhé!", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 border-r bg-white flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tin nhắn</h2>
          <User className="w-5 h-5 text-gray-500" />
        </div>

        <div className="p-2">
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-transparent outline-none px-2 py-1 w-full text-sm"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedChat(c)}
              className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                selectedChat?.id === c.id ? "bg-teal-50" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-sm">{c.name}</h3>
                <span className="text-xs text-gray-400">{c.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{c.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-white px-5 py-3">
          <div>
            <h3 className="font-semibold text-gray-800">{selectedChat?.name}</h3>
            <p className="text-sm text-gray-500">Đang hoạt động</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-sm shadow-sm ${
                  msg.from === "user"
                    ? "bg-teal-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-75">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Smile className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border rounded-full px-4 py-2 outline-none text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full flex items-center gap-1"
          >
            <Send className="w-4 h-4" /> Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
